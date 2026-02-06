/* =====================================================
   GLOBAL STATE & DOM ELEMENTS
===================================================== */
const appData = window.APP_DATA || [];
let activeCategory = "All";
const MAX_RECENT = 10;
const RECENT_KEY = "recentApps";

const sidebar = document.querySelector(".sidebar");
const sidebarMenu = document.querySelector(".sidebar-menu");
const grid = document.querySelector(".app-grid");
const searchInput = document.querySelector(".search-box input");
const viewTitle = document.querySelector(".content-header h1");
const subtitle = document.querySelector(".subtitle");
const mobileMenuBtn = document.querySelector(".mobile-header .fa-bars");
const overlay = document.querySelector(".overlay");


const playTapSound = async () => {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio block:", e);
    }
};

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initCategories();
    renderApps(appData);
    renderRecentApps();
    renderRecommendations();
});

/* =====================================================
   3D INTERACTIVE ENGINE
===================================================== */
let wheelStates = {}; 

/**
 * Updates an individual card's position, scale, and opacity 
 * based on its current position relative to the viewer.
 */
function updateCardTransform(card, baseAngle, wheelRotation, radius) {
    // 1. Calculate the actual angle relative to the center-front (0 degrees)
    let currentAngle = (baseAngle + wheelRotation) % 360;
    
    // Normalize to -180 to 180 degrees
    if (currentAngle > 180) currentAngle -= 360;
    if (currentAngle < -180) currentAngle += 360;

    // 2. distanceFactor: 0 at the very front, 1 at the very back
    const distanceFactor = Math.abs(currentAngle) / 180; 

    // 3. Dynamic Visuals
    // Scale: 1.4x at front, 0.5x at back
    const scale = 1.4 - (distanceFactor * 0.9);   
    // Opacity: 100% at front, 20% at back
    const opacity = 1.0 - (distanceFactor * 0.8); 
    // Brightness: 100% at front, 30% at back
    const brightness = 100 - (distanceFactor * 70); 

    card.style.transform = `rotateY(${baseAngle}deg) translateZ(${radius}px) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.filter = `brightness(${brightness}%)`;
    
    // Z-Index ensures the front app overlaps everything else
    card.style.zIndex = Math.round((1 - distanceFactor) * 100);
}

function initWheel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cards = container.querySelectorAll('.app-card');
    const count = cards.length;
    if (count === 0) return;

    // Set radius based on device width for full-width feel
    const radius = Math.max(window.innerWidth / 2, 200); 
    container.dataset.radius = radius;

    cards.forEach((card, i) => {
        const baseAngle = i * (360 / count);
        card.dataset.baseAngle = baseAngle; 
        updateCardTransform(card, baseAngle, wheelStates[containerId]?.currentRot || 0, radius);
    });

    if (!wheelStates[containerId]) {
        wheelStates[containerId] = { currentRot: 0, startX: 0, isDragging: false, lastDelta: 0 };
        attachWheelEvents(containerId, radius);
    }
}



function attachWheelEvents(id, radius) {
    const el = document.getElementById(id);
    const state = wheelStates[id];

    const start = (e) => {
        state.isDragging = true;
        state.startX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        el.style.transition = "none";
    };

    const move = (e) => {
        if (!state.isDragging) return;
        const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
        const delta = (x - state.startX) * 0.8; 
        const activeRot = state.currentRot + delta;
        
        // Rotate the main axle
        el.style.transform = `translateZ(-${radius}px) rotateY(${activeRot}deg)`;
        
        // Update every card's individual scale/opacity during movement
        const cards = el.querySelectorAll('.app-card');
        cards.forEach(card => {
            const baseAngle = parseFloat(card.dataset.baseAngle);
            updateCardTransform(card, baseAngle, activeRot, radius);
        });
        
        state.lastDelta = delta;
    };

    const end = () => {
        if (!state.isDragging) return;
        state.isDragging = false;
        state.currentRot += state.lastDelta;
        state.lastDelta = 0;
        el.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
    };

    el.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);

    el.addEventListener('touchstart', start, {passive: true});
    window.addEventListener('touchmove', move, {passive: true});
    window.addEventListener('touchend', end);
}

/* =====================================================
   ICON HELPER
===================================================== */
function getAppIcon(app) {
    if (app.icon) return app.icon;
    if (!app.url.startsWith("http")) return "assets/icons/local-game.png";
    try {
        return `https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}`;
    } catch {
        return "assets/icons/default.png";
    }
}

/* =====================================================
   CATEGORY SETUP
===================================================== */
function initCategories() {
    const iconMap = {
        All: "fa-border-all", AI: "fa-robot", Dev: "fa-code",
        Design: "fa-palette", Social: "fa-share-nodes", Finance: "fa-wallet",
        Games: "fa-gamepad", Edu: "fa-graduation-cap", Utils: "fa-screwdriver-wrench",
        Science: "fa-flask", News: "fa-newspaper", Shopping: "fa-cart-shopping",
        Health: "fa-heart-pulse", Travel: "fa-plane",
    };

    const categories = ["All", ...new Set(appData.map(app => app.cat))];

    sidebarMenu.innerHTML = categories.map(cat => `
        <button class="${cat === activeCategory ? "active" : ""}"
            onclick="filterByCategory('${cat}', this)">
            <i class="fas ${iconMap[cat] || "fa-tag"}"></i>
            <span>${cat}</span>
        </button>
    `).join("");
}

function filterByCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll(".sidebar-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    viewTitle.textContent = cat === "All" ? "All Apps" : cat;
    const filtered = cat === "All" ? appData : appData.filter(app => app.cat === cat);
    renderApps(filtered);
    renderRecentApps();
    renderRecommendations();
}

/* =====================================================
   RENDER APPS (MAIN GRID)
===================================================== */
function renderApps(list) {
    subtitle.textContent = `Showing ${list.length} tools`;
    grid.innerHTML = list.length
        ? list.map(app => {
            const isLocal = !app.url.startsWith("http");
            return `
                <a class="app-card glass" href="${app.url}" ${isLocal ? "" : 'target="_blank"'}
                   onclick='handleAppClick(${JSON.stringify(app)})'>
                    <img src="${getAppIcon(app)}" alt="${app.name}">
                    <h3>${app.name}</h3>
                    <span>${app.cat}</span>
                </a>
            `;
        }).join("")
        : `<div style="grid-column:1/-1;text-align:center;opacity:.6">No apps found</div>`;
}

/* =====================================================
   RECENT APPS
===================================================== */
function renderRecentApps() {
    const recentSection = document.getElementById("recent-section");
    const recentGrid = document.getElementById("recent-apps");
    if (activeCategory !== "All" || searchInput.value.trim() !== "") { 
        recentSection.style.display = "none";
        return;
    }
    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (!recent.length) {
        recentSection.style.display = "none";
        return;
    }
    recentSection.style.display = "block";
    recentGrid.innerHTML = recent.map(app => `
        <a target="_blank" class="app-card glass" href="${app.url}" onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="${getAppIcon(app)}" alt="${app.name}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
    initWheel("recent-apps");
}

/* =====================================================
   RENDER RECOMMENDATIONS
===================================================== */
function renderRecommendations() {
    const section = document.getElementById("recommend-section");
    const container = document.getElementById("recommend-apps");
    if (activeCategory !== "All" || searchInput.value.trim() !== "") {
        section.style.display = "none";
        return;
    }
    const recommended = getTimeBasedRecommendations();
    if (!recommended.length) {
        section.style.display = "none";
        return;
    }
    section.style.display = "block";
    container.innerHTML = recommended.map(app => `
        <a target="_blank" class="app-card glass" href="${app.url}" onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="${getAppIcon(app)}" alt="${app.name}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
    initWheel("recommend-apps");
}

/* =====================================================
   TIME & LOGIC HELPERS
===================================================== */
function getTimeSlot() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 17) return "afternoon";
    if (h >= 17 && h < 21) return "evening";
    return "night";
}

function handleAppClick(app) {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    recent = recent.filter(a => a.url !== app.url);
    recent.unshift(app);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));

    const slot = getTimeSlot();
    let usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    if (!usage[slot]) usage[slot] = {};
    if (!usage[slot][app.cat]) usage[slot][app.cat] = 0;
    usage[slot][app.cat] += 1;
    localStorage.setItem("timeUsage", JSON.stringify(usage));

    renderRecentApps();
    renderRecommendations();
}

function getTimeBasedRecommendations() {
    const slot = getTimeSlot();
    const usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (!usage[slot]) return [];
    const favCategories = Object.entries(usage[slot]).sort((a, b) => b[1] - a[1]).map(([cat]) => cat);
    const usedUrls = new Set(recent.map(a => a.url));
    const result = [];
    favCategories.forEach(cat => {
        appData.filter(app => app.cat === cat && !usedUrls.has(app.url)).forEach(app => {
            if (result.length < 6) result.push(app);
        });
    });
    return result;
}

/* =====================================================
   SEARCH & VOICE
===================================================== */
searchInput.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    const results = appData.filter(app =>
        (activeCategory === "All" || app.cat === activeCategory) &&
        (app.name.toLowerCase().includes(q) || app.cat.toLowerCase().includes(q))
    );
    renderApps(results);
    renderRecentApps();
    renderRecommendations();
});

searchInput.addEventListener("keydown", e => {
    if (!["Enter", "Search", "Go"].includes(e.key)) return;
    const input = searchInput.value.trim();
    if (!input) return;
    const isURL = /^(https?:\/\/)/i.test(input) || /^www\./i.test(input) || /^[\w-]+\.[a-z]{2,}/i.test(input);
    window.open(isURL ? (input.startsWith("http") ? input : `https://${input}`) : `https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
});

const mic = document.querySelector(".fa-microphone");
if (mic && "webkitSpeechRecognition" in window) {
    const rec = new webkitSpeechRecognition();
    rec.lang = "en-US";
    mic.onclick = () => { rec.start(); mic.classList.add("listening"); };
    rec.onresult = e => {
        const text = e.results[0][0].transcript;
        searchInput.value = text;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, "_blank");
    };
    rec.onend = () => mic.classList.remove("listening");
}

/* =====================================================
   MOBILE MENU
===================================================== */
mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
});


// This listens for any click on the entire document
document.addEventListener('click', (event) => {
    // Check if the clicked element (or its parents) is an app-card or a sidebar button
    const isAppCard = event.target.closest('.app-card');
    const isMenuBtn = event.target.closest('.sidebar-menu button');

    if (isAppCard || isMenuBtn) {
        playTapSound();
    }
}, { capture: true }); // 'capture' ensures it triggers before the link opens
