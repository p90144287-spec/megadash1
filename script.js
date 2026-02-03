/* =====================================================
   GLOBAL STATE & DOM ELEMENTS
===================================================== */
const appData = window.APP_DATA || [];
let activeCategory = "All";
const MAX_RECENT = 20;
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
});

/* =====================================================
   ICON HELPER
===================================================== */
function getAppIcon(app) {
    // 1️⃣ Use icon defined in apps-data.js (e.g., "./app1.png")
    if (app.icon) return app.icon;

    // 2️⃣ Local HTML files fallback
    if (!app.url.startsWith("http")) {
        return "assets/icons/local-game.png";
    }

    // 3️⃣ Website favicon fallback
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
        All: "fa-border-all",
        AI: "fa-robot",
        Dev: "fa-code",
        Design: "fa-palette",
        Social: "fa-share-nodes",
        Finance: "fa-wallet",
        Games: "fa-gamepad",
        Edu: "fa-graduation-cap",
        Utils: "fa-screwdriver-wrench",
        Science: "fa-flask",
        News: "fa-newspaper",
        Shopping: "fa-cart-shopping",
        Health: "fa-heart-pulse",
        Travel: "fa-plane",
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
    document.querySelectorAll(".sidebar-menu button")
        .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    viewTitle.textContent = cat === "All" ? "All Apps" : cat;

    const filtered = cat === "All"
        ? appData
        : appData.filter(app => app.cat === cat);

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
                <a class="app-card glass"
                   href="${app.url}"
                   ${isLocal ? "" : 'target="_blank"'}
                   onclick='handleAppClick(${JSON.stringify(app)})'>

                    <img src="${getAppIcon(app)}" alt="${app.name}">

                    <h3>${app.name}</h3>
                    <span>${app.cat}</span>
                </a>
            `;
        }).join("")
        : `<div style="grid-column:1/-1;text-align:center;opacity:.6">
            No apps found
          </div>`;
}


/* =====================================================
   RECENT APPS
===================================================== */
function renderRecentApps() {
    const recentSection = document.getElementById("recent-section");
    const recentGrid = document.getElementById("recent-apps");
    
    // Hide recent when not in "All" view or when searching
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

    recentGrid.innerHTML = recent.map(app => {
        const isLocal = !app.url.startsWith("http");

        return `
            <a class="app-card glass"
               href="${app.url}"
               ${isLocal ? "" : 'target="_blank"'}
               onclick='handleAppClick(${JSON.stringify(app)})'>

                <img src="${getAppIcon(app)}" alt="${app.name}">
                <h3>${app.name}</h3>
            </a>
        `;
    }).join("");
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

    container.innerHTML = recommended.map(app => {
        const isLocal = !app.url.startsWith("http");

        return `
            <a class="app-card glass"
               href="${app.url}"
               ${isLocal ? "" : 'target="_blank"'}
               onclick='handleAppClick(${JSON.stringify(app)})'>

                <img src="${getAppIcon(app)}" alt="${app.name}">
                <h3>${app.name}</h3>
            </a>
        `;
    }).join("");
}

/* =====================================================
   TIME SLOT DETECTION
===================================================== */
function getTimeSlot() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 17) return "afternoon";
    if (h >= 17 && h < 21) return "evening";
    return "night";
}

/* =====================================================
   APP CLICK HANDLER
===================================================== */
function handleAppClick(app) {
    // Update Recent Apps
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    recent = recent.filter(a => a.url !== app.url);
    recent.unshift(app);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));

    // Time + Category Learning
    const slot = getTimeSlot();
    let usage = JSON.parse(localStorage.getItem("timeUsage")) || {};

    if (!usage[slot]) usage[slot] = {};
    if (!usage[slot][app.cat]) usage[slot][app.cat] = 0;

    usage[slot][app.cat] += 1;
    localStorage.setItem("timeUsage", JSON.stringify(usage));

    // Update UI instantly
    renderRecentApps();
    renderRecommendations();
}


/* =====================================================
   SMART TIME-BASED RECOMMENDATIONS
===================================================== */
function getTimeBasedRecommendations() {
    const slot = getTimeSlot();
    const usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

    if (!usage[slot]) return [];

    const favCategories = Object.entries(usage[slot])
        .sort((a, b) => b[1] - a[1])
        .map(([cat]) => cat);

    const usedUrls = new Set(recent.map(a => a.url));
    const result = [];

    favCategories.forEach(cat => {
        appData
            .filter(app => app.cat === cat && !usedUrls.has(app.url))
            .forEach(app => {
                if (result.length < 6) result.push(app);
            });
    });

    return result;
}

/* =====================================================
   SEARCH (LIVE + ENTER)
===================================================== */
searchInput.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    const results = appData.filter(app =>
        (activeCategory === "All" || app.cat === activeCategory) &&
        (app.name.toLowerCase().includes(q) ||
         app.cat.toLowerCase().includes(q))
    );
    renderApps(results);
    renderRecentApps();
    renderRecommendations();
});

searchInput.addEventListener("keydown", e => {
    if (!["Enter", "Search", "Go"].includes(e.key)) return;

    const input = searchInput.value.trim();
    if (!input) return;

    const isURL =
        /^(https?:\/\/)/i.test(input) ||
        /^www\./i.test(input) ||
        /^[\w-]+\.[a-z]{2,}/i.test(input);

    if (isURL) {
        window.open(input.startsWith("http") ? input : `https://${input}`, "_blank");
    } else {
        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(input)}`,
            "_blank"
        );
    }
});

/* =====================================================
   MOBILE MENU & OVERLAY
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

/* =====================================================
   VOICE SEARCH
===================================================== */
const mic = document.querySelector(".fa-microphone");
if (mic && "webkitSpeechRecognition" in window) {
    const rec = new webkitSpeechRecognition();
    rec.lang = "en-US";

    mic.onclick = () => {
        rec.start();
        mic.classList.add("listening");
    };

    rec.onresult = e => {
        const text = e.results[0][0].transcript;
        searchInput.value = text;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, "_blank");
    };

    rec.onend = () => mic.classList.remove("listening");
}
