/* =====================================================
   GLOBAL STATE & DOM ELEMENTS
===================================================== */
const appData = window.APP_DATA || [];
let activeCategory = "All";
const MAX_RECENT = 6;
const RECENT_KEY = "recentApps";

const sidebar = document.querySelector(".sidebar");
const sidebarMenu = document.querySelector(".sidebar-menu");
const grid = document.querySelector(".app-grid");
const searchInput = document.querySelector(".search-box input");
const viewTitle = document.querySelector(".content-header h1");
const subtitle = document.querySelector(".subtitle");
const mobileMenuBtn = document.querySelector(".mobile-header .fa-bars");
const overlay = document.querySelector(".overlay");

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initCategories();
    renderApps(appData);
    renderRecentApps();
    renderRecommendations();
    renderTimeBasedApps(); 
});

/* =====================================================
   CATEGORY SETUP & FILTERING
===================================================== */
function initCategories() {
    if (!sidebarMenu) return;
    const iconMap = { "All": "fa-border-all", "AI": "fa-robot", "Dev": "fa-code", "Design": "fa-palette", "Social": "fa-share-nodes", "Finance": "fa-wallet", "Games": "fa-gamepad", "Edu": "fa-graduation-cap", "Utils": "fa-screwdriver-wrench", "News": "fa-newspaper", "Shopping": "fa-cart-shopping", "Science": "fa-flask" };
    const categories = ["All", ...new Set(appData.map(app => app.cat))];

    sidebarMenu.innerHTML = categories.map(cat => {
        const icon = iconMap[cat] || "fa-tag";
        return `<button class="${cat === activeCategory ? "active" : ""}" onclick="filterByCategory('${cat}', this)"><i class="fas ${icon}"></i><span>${cat}</span></button>`;
    }).join("");
}

function filterByCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll(".sidebar-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (viewTitle) viewTitle.textContent = cat === "All" ? "All Apps" : cat;

    const filtered = cat === "All" ? appData : appData.filter(app => app.cat === cat);
    renderApps(filtered);
    
    // Updates visibility for Recent/Recommended
    renderRecentApps();
    renderRecommendations();
}

/* =====================================================
   RECOMMENDATIONS (NO RECENT DUPLICATES – FINAL)
===================================================== */
function renderRecommendations() {
    const section = document.getElementById("recommend-section");
    const container = document.getElementById("recommend-apps");
    if (!section || !container) return;

    // Show only on All Apps
    if (activeCategory !== "All") {
        section.style.display = "none";
        return;
    }

    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (!recent.length) {
        section.style.display = "none";
        return;
    }

    // 🔒 STRICT BLOCK: names + URLs
    const recentNames = new Set(recent.map(a => a.name));
    const recentUrls  = new Set(recent.map(a => a.url));

    // Categories user actually uses
    const usedCategories = new Set(recent.map(a => a.cat));

    // Filter apps
    let recommended = appData.filter(app =>
        usedCategories.has(app.cat) &&
        !recentNames.has(app.name) &&
        !recentUrls.has(app.url)
    );

    if (!recommended.length) {
        section.style.display = "none";
        return;
    }

    // Light shuffle (keeps things fresh)
    recommended = recommended
        .map(app => ({ app, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(x => x.app)
        .slice(0, 6);

    section.style.display = "block";
    container.innerHTML = recommended.map(app => `
        <a class="app-card glass"
           href="${app.url}"
           target="_blank"
           onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
}

/* =====================================================
   RECENT APPS
==================================================== */
function renderRecentApps() {
    const section = document.querySelector("#recent-section");
    const container = document.querySelector("#recent-apps");
    if (!section || !container) return;

    if (activeCategory !== "All") {
        section.style.display = "none";
        return;
    }

    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (!recent.length) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    container.innerHTML = recent.map(app => `
        <a class="app-card glass" href="${app.url}" target="_blank" onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
}

/* =====================================================
   CORE UTILITIES
===================================================== */
function renderApps(list) {
    if (!grid) return;
    if (subtitle) subtitle.textContent = `Showing ${list.length} tools`;
    grid.innerHTML = list.length ? list.map(app => `
        <a class="app-card glass" href="${app.url}" target="_blank" onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/5968/5968705.png'">
            <h3>${app.name}</h3>
            <span>${app.cat}</span>
        </a>
    `).join("") : `<div style="grid-column:1/-1;opacity:.6;text-align:center">No apps found</div>`;
}

// time based 
function getTimeSlot() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}

function handleAppClick(app) {
    const timeSlot = getTimeSlot();

    // -------- RECENT APPS --------
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    recent = recent.filter(a => a.url !== app.url);
    recent.unshift(app);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));

    // -------- TIME USAGE TRACK --------
    const usageKey = "timeUsage";
    const usage = JSON.parse(localStorage.getItem(usageKey)) || {};

    if (!usage[timeSlot]) usage[timeSlot] = {};
    usage[timeSlot][app.name] = (usage[timeSlot][app.name] || 0) + 1;

    localStorage.setItem(usageKey, JSON.stringify(usage));

    setTimeout(() => {
        renderRecentApps();
        renderRecommendations();
        renderTimeBasedApps();
    }, 100);
}


/* =====================================================
   TIME BASED APPS ⏰
===================================================== */
function renderTimeBasedApps() {
    const usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    const timeSlot = getTimeSlot();

    const section = document.getElementById("recommend-section");
    const container = document.getElementById("recommend-apps");

    if (!section || !container) return;

    const slotData = usage[timeSlot];
    if (!slotData) return;

    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    const recentNames = new Set(recent.map(a => a.name));

    const sortedApps = Object.entries(slotData)
        .sort((a, b) => b[1] - a[1]) // most used first
        .map(([name]) => appData.find(app => app.name === name))
        .filter(app => app && !recentNames.has(app.name))
        .slice(0, 6);

    if (!sortedApps.length) return;

    section.querySelector(".recent-title").textContent =
        `Good ${timeSlot}! Apps you usually use`;

    container.innerHTML = sortedApps.map(app => `
        <a class="app-card glass"
           href="${app.url}"
           target="_blank"
           onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
}



// SEARCH BEHAVIOR
if (searchInput) {
    searchInput.addEventListener("input", e => {
        const query = e.target.value.toLowerCase().trim();
        const results = appData.filter(app =>
            (activeCategory === "All" || app.cat === activeCategory) &&
            (app.name.toLowerCase().includes(query) || app.cat.toLowerCase().includes(query))
        );
        renderApps(results);
        
        // Hide specific sections while searching
        const isSearching = query.length > 0;
        document.querySelector("#recent-section").style.display = isSearching ? "none" : (activeCategory === "All" ? "block" : "none");
        document.querySelector("#recommend-section").style.display = isSearching ? "none" : (activeCategory === "All" ? "block" : "none");
    });
}

// MOBILE SIDEBAR
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sidebar.classList.add("open");
        overlay.classList.add("active");
        document.body.classList.add("menu-open"); // 👈 KEY
    });
}

if (overlay) {
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open"); // 👈 KEY
    });
}



/* =====================================================
   VOICE SEARCH (MIC ICON)
===================================================== */
const micIcon = document.querySelector(".fa-microphone");

if (micIcon && "webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    micIcon.addEventListener("click", () => {
        recognition.start();
        micIcon.classList.add("listening");
    });

    recognition.onresult = (event) => {
        const speechText = event.results[0][0].transcript.toLowerCase();

        // Put text in search box
        searchInput.value = speechText;

        // Trigger search
        const results = appData.filter(app =>
            (activeCategory === "All" || app.cat === activeCategory) &&
            (
                app.name.toLowerCase().includes(speechText) ||
                app.cat.toLowerCase().includes(speechText) ||
                (app.keywords || []).some(k => speechText.includes(k))
            )
        );

        renderApps(results);

        // Hide recent & recommended while searching
        document.getElementById("recent-section").style.display = "none";
        document.getElementById("recommend-section").style.display = "none";
    };

    recognition.onend = () => {
        micIcon.classList.remove("listening");
    };

    recognition.onerror = () => {
        micIcon.classList.remove("listening");
        alert("🎤 Mic permission denied or not available");
    };
}
