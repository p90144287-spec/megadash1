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
        Science: "fa-flask",
    Shopping: "fa-cart-shopping",
    Health: "fa-heart-pulse",
    Travel: "fa-plane",
    News: "fa-newspaper"
        Shopping: "fa-cart-shopping"
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
   RENDER APPS
===================================================== */
function renderApps(list) {
    subtitle.textContent = `Showing ${list.length} tools`;

    grid.innerHTML = list.length
        ? list.map(app => `
            <a class="app-card glass" href="${app.url}" target="_blank"
               onclick='handleAppClick(${JSON.stringify(app)})'>
                <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
                <h3>${app.name}</h3>
                <span>${app.cat}</span>
            </a>
        `).join("")
        : `<div style="grid-column:1/-1;text-align:center;opacity:.6">
            No apps found
          </div>`;
}

/* =====================================================
   RECENT & RECOMMENDED
===================================================== */
function renderRecentApps() {
    const section = document.getElementById("recent-section");
    const container = document.getElementById("recent-apps");

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
        <a class="app-card glass" href="${app.url}" target="_blank"
           onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
}

function renderRecommendations() {
    const section = document.getElementById("recommend-section");
    const container = document.getElementById("recommend-apps");

    if (activeCategory !== "All") {
        section.style.display = "none";
        return;
    }

    const recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (!recent.length) {
        section.style.display = "none";
        return;
    }

    const usedCats = new Set(recent.map(a => a.cat));
    const usedUrls = new Set(recent.map(a => a.url));

    const recommended = appData
        .filter(app => usedCats.has(app.cat) && !usedUrls.has(app.url))
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

    if (!recommended.length) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    container.innerHTML = recommended.map(app => `
        <a class="app-card glass" href="${app.url}" target="_blank"
           onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
}

/* =====================================================
   TIME BASED INTELLIGENCE
===================================================== */
function getTimeSlot() {
    const h = new Date().getHours();
    if (h < 12) return "morning";
    if (h < 17) return "afternoon";
    if (h < 21) return "evening";
    return "night";
}

function handleAppClick(app) {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    recent = recent.filter(a => a.url !== app.url);
    recent.unshift(app);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));

    const usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    const slot = getTimeSlot();
    usage[slot] = usage[slot] || {};
    usage[slot][app.name] = (usage[slot][app.name] || 0) + 1;
    localStorage.setItem("timeUsage", JSON.stringify(usage));
}

function renderTimeBasedApps() {
    const usage = JSON.parse(localStorage.getItem("timeUsage")) || {};
    const slot = getTimeSlot();
    if (!usage[slot]) return;

    const section = document.getElementById("recommend-section");
    const container = document.getElementById("recommend-apps");

    const sorted = Object.entries(usage[slot])
        .sort((a, b) => b[1] - a[1])
        .map(([name]) => appData.find(a => a.name === name))
        .filter(Boolean)
        .slice(0, 6);

    if (!sorted.length) return;

    section.querySelector(".recent-title").textContent =
        `Good ${slot}! Apps you use often`;

    container.innerHTML = sorted.map(app => `
        <a class="app-card glass" href="${app.url}" target="_blank"
           onclick='handleAppClick(${JSON.stringify(app)})'>
            <img src="https://www.google.com/s2/favicons?sz=128&domain=${new URL(app.url).hostname}">
            <h3>${app.name}</h3>
        </a>
    `).join("");
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

    document.getElementById("recent-section").style.display = q ? "none" : "block";
    document.getElementById("recommend-section").style.display = q ? "none" : "block";
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
   MOBILE MENU
===================================================== */
mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("active");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
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