/* FILE: js/main.js
   Shared behaviour for every Events Hub page (Practical IV - JavaScript).
   Loaded just before </body> on all five HTML files.
*/

"use strict";

console.log("main.js is running");

// data (array of objects)
const events = [
  {
    id: 1, title: "Tech Week Hackathon", date: "2026-09-10",
    venue: "IT Lab", seats: 40, image: "media/hackathon.jpg",
    icon: "fa-laptop-code", blurb: "24-hour coding challenge.",
  },
  {
    id: 2, title: "Losar Festival Night", date: "2026-09-18",
    venue: "Main Hall", seats: 0, image: "media/losar.jpg",
    icon: "fa-music", blurb: "Bhutanese new year celebration.",
  },
  {
    id: 3, title: "Inter-College Football", date: "2026-09-25",
    venue: "Sports Ground", seats: 0, image: "media/football.jpg",
    icon: "fa-futbol", blurb: "Cheer for the JNEC team.",
  },
  {
    id: 4, title: "Robotics Workshop", date: "2026-10-02",
    venue: "Robotics Lab", seats: 25, image: "media/robotics.jpg",
    icon: "fa-robot", blurb: "Build and program a robot.",
  },
];

// ---------- helpers ----------
function seatsMessage(seats) {
  if (seats === 0) return "Sold out";
  if (seats < 10) return "Filling fast";
  return "Plenty of seats";
}

function findEventById(id) {
  for (const ev of events) {
    if (String(ev.id) === String(id)) return ev;
  }
  return null;
}

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function eventCardHtml(ev) {
  const sold = ev.seats === 0;
  const badge = sold
    ? `<span class="badge bg-secondary">Sold out</span>`
    : `<span class="badge bg-success">${ev.seats} seats</span>`;
  const btn = sold
    ? `<span class="text-muted">No seats left</span>`
    : `<a href="register.html?event=${ev.id}" class="btn btn-primary">Register</a>`;
  const extraClass = sold ? " sold-out-card" : "";

  return `
  <div class="col-md-4">
    <article class="card event-card h-100${extraClass}">
      <img src="${escapeHtml(ev.image)}" class="card-img-top" alt="${escapeHtml(ev.title)}">
      <div class="card-body">
        <h5 class="card-title">
          <i class="fa-solid ${escapeHtml(ev.icon)}"></i>
          ${escapeHtml(ev.title)}
        </h5>
        <p class="card-text">${escapeHtml(ev.blurb)}</p>
        <p class="small text-muted">${escapeHtml(ev.date)}</p>
        <p>${escapeHtml(ev.venue)}</p>
        <p>${badge} · ${seatsMessage(ev.seats)}</p>
        ${btn}
      </div>
    </article>
  </div>`;
}

function renderEvents(list) {
  const host = document.getElementById("eventList");
  if (!host) return;
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const ev = list[i];
    html += eventCardHtml(ev);
  }
  host.innerHTML = html || `<p class="text-muted">No matching events.</p>`;
}

function filteredEvents() {
  const searchEl = document.getElementById("search");
  const seatEl = document.getElementById("seat-filter");
  const q = (searchEl?.value || "").toLowerCase();
  const seatFilter = seatEl?.value || "all";
  let list = [];

  for (const ev of events) {
    if (q && !ev.title.toLowerCase().includes(q)) {
      continue;
    }
    if (seatFilter === "open" && ev.seats <= 0) continue;
    if (seatFilter === "full" && ev.seats > 0) continue;
    list.push(ev);
  }
  return list;
}

function renderHomePreview() {
  const host = document.getElementById("home-events");
  if (!host) return;
  const slice = events.slice(0, 3);
  host.innerHTML = slice.map(eventCardHtml).join("");
}

function fillEventSelect() {
  const sel = document.getElementById("event_id");
  if (!sel) return;
  const params = new URLSearchParams(window.location.search);
  const pre = params.get("event");

  let html = `<option value="">-- choose an event --</option>`;
  for (const ev of events) {
    const disabled = ev.seats <= 0 ? "disabled" : "";
    const selected =
      String(ev.id) === String(pre) && ev.seats > 0 ? "selected" : "";
    const label =
      ev.seats > 0
        ? `${ev.title} (${ev.seats} seats)`
        : `${ev.title} (sold out)`;
    html += `<option value="${ev.id}" ${disabled} ${selected}>${escapeHtml(label)}</option>`;
  }
  sel.innerHTML = html;
  updateSeatsHint();
}

function updateSeatsHint() {
  const hint = document.getElementById("seatsHint");
  const sel = document.getElementById("event_id");
  if (!hint || !sel) return;
  const ev = findEventById(sel.value);
  if (!ev) {
    hint.textContent = "Choose an event to see remaining seats.";
    return;
  }
  hint.textContent = `${ev.title}: ${seatsMessage(ev.seats)} (${ev.seats} left).`;
}

function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function greetHome() {
  const welcome = document.getElementById("welcomeMsg");
  if (!welcome) return;
  welcome.innerHTML = "Welcome to <strong>JNEC Events Hub</strong>!";
  // Optional greeting - comment out if the prompt gets annoying while you test:
  // const nickname = prompt("What should we call you?");
  // if (nickname) {
  //   welcome.innerHTML = "Hi " + nickname + " - welcome to the Hub!";
  // }
}

function bindDarkMode() {
  const btn = document.getElementById("darkToggle");
  if (!btn) return;
  const saved = localStorage.getItem("hub-theme");
  if (saved === "dark") document.body.classList.add("dark");
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "hub-theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

function markNavItems() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function (a) {
    a.classList.add("nav-item");
  });
}

function bindEventsPageFilters() {
  const search = document.getElementById("search");
  const seatFilter = document.getElementById("seat-filter");
  if (search) {
    search.addEventListener("input", function () {
      renderEvents(filteredEvents());
    });
  }
  if (seatFilter) {
    seatFilter.addEventListener("change", function () {
      renderEvents(filteredEvents());
    });
  }
}

function bindRegisterExtras() {
  const sel = document.getElementById("event_id");
  if (sel) {
    sel.addEventListener("change", updateSeatsHint);
  }

  const resetBtn = document.querySelector("#regForm button[type='reset']");
  if (resetBtn) {
    resetBtn.addEventListener("click", function (e) {
      if (!confirm("Clear the whole form?")) {
        e.preventDefault();
      }
    });
  }

  const remarks = document.getElementById("remarks");
  const charCount = document.getElementById("charCount");
  if (remarks && charCount) {
    remarks.addEventListener("input", function () {
      charCount.textContent = remarks.value.length + "/200";
    });
  }
}

// ---------------- bootstrap ----------------
document.addEventListener("DOMContentLoaded", function () {
  setFooterYear();
  markNavItems();
  bindDarkMode();
  greetHome();
  renderHomePreview();
  renderEvents(filteredEvents());
  fillEventSelect();
  bindEventsPageFilters();
  bindRegisterExtras();
  console.log("Debug: main.js finished");
});