// ── DATA ──
const portfolioData = [
  {
    id: 1,
    cat: "logos",
    img: "Images/ee-luxe.png",
    title: "EE Luxe Clothe Logo",
    desc: "Modern logo for a Clothing Brand. Clean lines and bold identity.",
  },
  {
    id: 2,
    cat: "branding",
    img: "Images/logistics.png",
    title: "Mibes Logistics Brand",
    desc: "Complete brand identity for a Logistics brand — palette, type, usage.",
  },
  {
    id: 3,
    cat: "social",
    img: "Images/independent-day.png",
    title: "Happy Independent Day",
    desc: "Nigeria Independent Day Social Media Design",
  },
  {
    id: 4,
    cat: "flyers",
    img: "Images/mask.png",
    title: "The Mask Night Vibes",
    desc: "Club event flyer series with high-impact typography and neon accents.",
  },
  {
    id: 5,
    cat: "banners",
    img: "Images/sunday-service.png",
    title: "Sunday Service Banner",
    desc: "Sunday Service banner series for a Church.",
  },
  {
    id: 6,
    cat: "print",
    img: "Images/medical-certificate.png",
    title: "Craft Coffee Menu",
    desc: "Elegant café menu design with hand-drawn illustrations and serif type.",
  },
  {
    id: 7,
    cat: "logos",
    img: "Images/chi-logo.png",
    title: "Chi's Beauty",
    desc: "Beauty Brand Logo for a Lip Gloss Logo — clean, confident, credible.",
  },
  {
    id: 8,
    cat: "social",
    img: "Images/fathers-day.png",
    title: "Laneeks Instagram Design",
    desc: "Father's Day Social Media Graphics for Laneeks Brand.",
  },
  {
    id: 9,
    cat: "branding",
    img: "Images/logistics-2.png",
    title: "Mibes Logistics Brand",
    desc: "Complete brand identity for a Logistics brand — palette, type, usage.",
  },
  {
    id: 10,
    cat: "logos",
    img: "Images/enny-logo.png",
    title: "EE Luxe Clothing Brand Logo",
    desc: "Sleek Brand Logo for a Clothing brand — palette, type, usage.",
  },
  {
    id: 11,
    cat: "print",
    img: "Images/faith-favour.png",
    title: "Certificate Print Design",
    desc: "Elegant Certificate design for award giving night.",
  },
  {
    id: 12,
    cat: "flyers",
    img: "Images/favluxe.png",
    title: "Favluxe Beauty Brand",
    desc: "Lip Gloss Flyer with high-impact typography and clean layout.",
  },
  {
    id: 13,
    cat: "flyers",
    img: "Images/oge-gloss.png",
    title: "Oge's Lip Luxe",
    desc: "Lip Luxe flyer with sleek typography and neon accents.",
  },
  {
    id: 14,
    cat: "logos",
    img: "Images/anibol-logo.png",
    title: "Anibol Home Brand Logo",
    desc: "Brand Logo for a House Estate brand.",
  },
  {
    id: 15,
    cat: "social",
    img: "Images/laneeks-june.png",
    title: "Laneeks Monthly Flyer",
    desc: "June Month Social Media Design for Laneeks Brand.",
  },
  {
    id: 16,
    cat: "print",
    img: "Images/card.png",
    title: "Craft Business Card",
    desc: "Elegant Business Card design for EE Luxe Brand.",
  },
  {
    id: 17,
    cat: "logos",
    img: "Images/jenny-logo.png",
    title: "Gift & Surprises Brand Logo",
    desc: "Elegant Brand Logo For Jenny's Gleam Brand.",
  },
];

const skillsData = [
  { name: "Adobe Photoshop", pct: 95 },
  { name: "Adobe Illustrator", pct: 92 },
  { name: "Adobe InDesign", pct: 88 },
  { name: "Figma", pct: 90 },
  { name: "Canva Pro", pct: 98 },
  { name: "Branding Strategy", pct: 85 },
  { name: "Typography", pct: 93 },
  { name: "Visual Identity", pct: 91 },
];

// ── PORTFOLIO RENDER ──
function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolioGrid");
  const items =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((p) => p.cat === filter);
  grid.innerHTML = items
    .map(
      (p, i) => `
    <div class="portfolio-item" data-id="${p.id}" tabindex="0" role="button"
         aria-label="View ${p.title}" style="transition-delay:${i * 0.06}s;">
      <div class="portfolio-thumb" style="position:relative;overflow:hidden;background:var(--surface);">
        <img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" loading="lazy" />
      </div>
      <div class="portfolio-overlay">
        <div class="p-cat">${p.cat}</div>
        <div class="p-title">${p.title}</div>
        <div class="p-desc">${p.desc}</div>
      </div>
    </div>
  `,
    )
    .join("");
    
  // Attach click handlers
  grid.querySelectorAll(".portfolio-item").forEach((el) => {
    el.addEventListener("click", () => openLightbox(parseInt(el.dataset.id)));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ")
        openLightbox(parseInt(el.dataset.id));
    });
  });
}

// ── SKILLS RENDER ──
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = skillsData
    .map(
      (s, i) => `
    <div class="skill-item reveal" style="transition-delay:${i * 0.08}s;">
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-track" role="progressbar" aria-valuenow="${s.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${s.name} ${s.pct}%">
        <div class="skill-fill" data-pct="${s.pct}"></div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ── INTERSECTION OBSERVER ──
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Skill bars
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.pct + "%";
          }, 100);
        }
        // Counters
        const counter = entry.target.querySelector(".counter");
        if (counter) animateCounter(counter);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => revealObs.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// Hero counters (fire on load)
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = parseInt(el.dataset.count);
  const suffix = el.textContent.includes("%") ? "%" : "+";
  setTimeout(() => {
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + (target < 10 ? "+" : "+");
    };
    const loop = (now) => {
      update(now);
      if (performance.now() - start < duration) requestAnimationFrame(loop);
      else el.textContent = target + (target < 10 ? "+" : "+");
    };
    requestAnimationFrame(loop);
  }, 800);
});

// ── FILTER ──
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPortfolio(btn.dataset.filter);
  });
});

// ── LIGHTBOX ──
function openLightbox(id) {
  const item = portfolioData.find((p) => p.id === id);
  if (!item) return;
  document.getElementById("lbThumb").innerHTML =
    `<img src="${item.img}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;" />`;
  document.getElementById("lbCat").textContent = item.cat.toUpperCase();
  document.getElementById("lbTitle").textContent = item.title;
  document.getElementById("lbDesc").textContent = item.desc;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("lightboxClose").focus();
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target === document.getElementById("lightbox")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ── NAVBAR ──
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  },
  { passive: true },
);

// ── MOBILE MENU ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
});
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  });
});

// ── DARK MODE ──
const themeBtn = document.getElementById("themeBtn");
const stored = localStorage.getItem("dpg-theme");
if (stored === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  themeBtn.textContent = "☀️";
}
themeBtn.addEventListener("click", () => {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("dpg-theme", "dark");
    themeBtn.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("dpg-theme", "light");
    themeBtn.textContent = "☀️";
  }
});

// ── CONTACT FORM ──
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = "Sending…";
  btn.disabled = true;

  const formData = new FormData(e.target);

  try {
    const response = await fetch("https://formspree.io/f/meewbork", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      document.getElementById("formSuccess").style.display = "block";
      btn.textContent = "Message Sent ✓";
      btn.style.background = "linear-gradient(135deg,#059669,#10B981)";
      e.target.reset();
    } else {
      btn.textContent = "Failed — Try Again";
      btn.disabled = false;
    }
  } catch (err) {
    btn.textContent = "Error — Try Again";
    btn.disabled = false;
  }
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// INIT
renderPortfolio();
renderSkills();

setTimeout(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObs.observe(el);
  });
}, 100);

// Re-observe after filter clicks without duplicating
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
    // Small delay so new DOM elements exist before observing
    setTimeout(() => {
      document.querySelectorAll('#portfolioGrid .reveal').forEach(el => {
        revealObs.observe(el);
      });
    }, 50);
  });
});
