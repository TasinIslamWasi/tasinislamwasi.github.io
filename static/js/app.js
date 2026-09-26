const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
};

const renderList = (containerId, items, formatter) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const node = document.createElement("span");
    node.textContent = formatter ? formatter(item) : item;
    container.appendChild(node);
  });
};

const renderChips = (containerId, items) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    container.appendChild(chip);
  });
};

const renderHeroMeta = (profile) => {
  const heroMeta = document.getElementById("heroMeta");
  if (!heroMeta) return;
  heroMeta.innerHTML = "";
  const items = [
    { label: "Location", value: profile.location },
    { label: "Email", value: profile.email },
    { label: "Website", value: profile.website }
  ];
  items.forEach((item) => {
    const wrap = document.createElement("div");
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = item.label;
    const value = document.createElement("span");
    value.className = "value";
    value.textContent = item.value || "";
    wrap.appendChild(label);
    wrap.appendChild(value);
    heroMeta.appendChild(wrap);
  });
};

const renderSocialLinks = (links) => {
  const container = document.getElementById("socialLinks");
  if (!container) return;
  container.innerHTML = "";
  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = link.label;
    container.appendChild(a);
  });
};

const renderProjects = (projects) => {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card project";
    const search = `${project.name} ${project.description} ${project.type}`;
    card.dataset.search = search;

    const top = document.createElement("div");
    top.className = "card-top";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = project.type;

    top.appendChild(title);
    top.appendChild(tag);

    const desc = document.createElement("p");
    desc.textContent = project.description;

    const bottom = document.createElement("div");
    bottom.className = "card-bottom";

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = project.dates;

    bottom.appendChild(meta);

    if (project.link) {
      const link = document.createElement("a");
      link.className = "link";
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Project Link";
      bottom.appendChild(link);
    }

    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(bottom);
    grid.appendChild(card);
  });
};

const renderExperience = (items) => {
  const timeline = document.getElementById("experienceTimeline");
  if (!timeline) return;
  timeline.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("a");
    card.className = "card timeline-card";
    if (item.url) {
      card.href = item.url;
      card.target = "_blank";
      card.rel = "noopener";
    } else {
      card.href = "#experience";
    }

    const wrapper = document.createElement("div");
    wrapper.className = "timeline-item";

    const title = document.createElement("h3");
    title.textContent = item.role;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${item.company} | ${item.location} | ${item.start} to ${item.end}`;

    const list = document.createElement("div");
    list.className = "list";
    item.details.forEach((detail) => {
      const line = document.createElement("span");
      line.textContent = `• ${detail}`;
      list.appendChild(line);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(meta);
    wrapper.appendChild(list);

    card.appendChild(wrapper);
    timeline.appendChild(card);
  });
};

const renderEducation = (items) => {
  const grid = document.getElementById("educationGrid");
  if (!grid) return;
  grid.innerHTML = "";
  items.forEach((edu) => {
    const card = document.createElement("a");
    card.className = "card edu-card";
    if (edu.url) {
      card.href = edu.url;
      card.target = "_blank";
      card.rel = "noopener";
    } else {
      card.href = "#education";
    }

    const title = document.createElement("h3");
    title.textContent = edu.degree;

    const school = document.createElement("p");
    school.textContent = `${edu.school} | ${edu.location}`;

    const dates = document.createElement("div");
    dates.className = "meta";
    dates.textContent = `${edu.start} to ${edu.end}`;

    const grade = document.createElement("div");
    grade.className = "meta";
    if (edu.grade) {
      grade.textContent = `Grade: ${edu.grade}`;
    }

    card.appendChild(title);
    card.appendChild(school);
    card.appendChild(dates);
    if (edu.grade) {
      card.appendChild(grade);
    }
    grid.appendChild(card);
  });
};

const renderTraining = (items) => {
  const grid = document.getElementById("trainingGrid");
  if (!grid) return;
  grid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card training-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "Professional Training";

    top.appendChild(title);
    top.appendChild(tag);

    const inst = document.createElement("p");
    inst.className = "training-inst";
    inst.textContent = `${item.institution} | ${item.location}`;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${item.start} to ${item.end}`;

    const list = document.createElement("div");
    list.className = "training-topics";
    if (item.details && item.details.length) {
      item.details.forEach((topic) => {
        const itemSpan = document.createElement("span");
        itemSpan.className = "topic-pill";
        itemSpan.textContent = topic;
        list.appendChild(itemSpan);
      });
    }

    card.appendChild(top);
    card.appendChild(inst);
    card.appendChild(meta);
    card.appendChild(list);

    if (item.url) {
      const bottom = document.createElement("div");
      bottom.className = "card-bottom";
      const link = document.createElement("a");
      link.className = "link";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Institute Website →";
      bottom.appendChild(link);
      card.appendChild(bottom);
    }

    grid.appendChild(card);
  });
};

const renderActivities = (items) => {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;
  grid.innerHTML = "";
  items.forEach((act) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = act.name;

    const details = document.createElement("p");
    details.textContent = act.details;

    const date = document.createElement("div");
    date.className = "meta";
    date.textContent = act.date;

    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(date);
    grid.appendChild(card);
  });
};

const renderExtracurricular = (items) => {
  const grid = document.getElementById("extracurricularGrid");
  if (!grid) return;
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener";

    const img = document.createElement("img");
    img.src = item.thumb;
    img.alt = item.title;
    img.className = "extra-thumb";
    link.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = item.title;

    card.appendChild(link);
    card.appendChild(title);
    grid.appendChild(card);
  });
};

const setupSearch = () => {
  const searchInput = document.getElementById("projectSearch");
  if (!searchInput) return;
  const projectCards = Array.from(document.querySelectorAll(".project"));

  const filterProjects = () => {
    const query = searchInput.value.toLowerCase().trim();
    projectCards.forEach((card) => {
      const haystack = card.dataset.search.toLowerCase();
      const match = haystack.includes(query);
      card.style.display = match ? "flex" : "none";
    });
  };

  searchInput.addEventListener("input", filterProjects);
};

const setupSmoothScroll = () => {
  const anchors = document.querySelectorAll("a[href^='#']");
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

const setupDropdowns = () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.classList.toggle("open");
    });
  });

  const subDropdowns = document.querySelectorAll(".dropdown-sub");
  subDropdowns.forEach((sub) => {
    const button = sub.querySelector(".subbtn");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      sub.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
    document.querySelectorAll(".dropdown-sub.open").forEach((d) => d.classList.remove("open"));
  });
};

const setupMobileMenu = () => {
  const toggle = document.getElementById("menuToggle");
  const links = document.querySelector(".links");
  if (!toggle || !links) return;
  if (toggle.dataset.menuBound === "true") return;
  toggle.dataset.menuBound = "true";
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = links.classList.toggle("mobile-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  links.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  document.addEventListener("click", () => {
    links.classList.remove("mobile-open");
    toggle.setAttribute("aria-expanded", "false");
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("mobile-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

const setupContactForm = () => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    fetch("https://formspree.io/f/mqaldjbk", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then((response) => {
        if (response.ok) {
          const flyX = Math.random() > 0.5 ? 220 : -220;
          const flyY = Math.random() > 0.5 ? -180 : 140;
          form.style.setProperty("--fly-x", `${flyX}px`);
          form.style.setProperty("--fly-y", `${flyY}px`);
          form.classList.add("form-sent");
          setTimeout(() => {
            form.classList.add("flying");
          }, 100);

          const toast = document.createElement("div");
          toast.className = "toast";
          toast.textContent = "Message sent. Launching transmission.";
          document.body.appendChild(toast);

          setTimeout(() => {
            form.reset();
            form.classList.remove("form-sent", "flying");
            toast.remove();
          }, 3200);
        } else {
          return response.json().then((payload) => {
            const message = payload?.errors?.map((e) => e.message).join(", ") || "Submission failed.";
            throw new Error(message);
          });
        }
      })
      .catch((error) => {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = error.message || "Oops! There was a problem submitting your form.";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
      });
  });
};

const setupFightStickmen = () => {};
const setupBackgroundClick = () => {};

const initParticleConstellation = () => {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];
  let burstSparks = [];
  let shockwaves = [];
  const mouse = { x: null, y: null, radius: 140 };
  let isMobile = window.innerWidth <= 768;
  let animId = null;

  function checkMobile() {
    isMobile = window.innerWidth <= 768;
  }

  function resizeCanvas() {
    checkMobile();
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const widthChanged = Math.abs(newWidth - width) > 20;

    width = canvas.width = newWidth;
    height = canvas.height = newHeight;

    // Only re-populate particles if width changed or first run
    // This stops the canvas from blinking/rebuilding every time mobile address bar shows/hides!
    if (widthChanged || particles.length === 0) {
      initParticles();
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = Math.random() * (height || window.innerHeight);
      this.size = Math.random() * 2.0 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 5;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.55 + 0.25;
      const colorPalette = [
        { color: "rgba(2, 132, 199,", glow: "rgba(2, 132, 199, 0.4)" },
        { color: "rgba(79, 70, 229,", glow: "rgba(79, 70, 229, 0.4)" },
        { color: "rgba(147, 51, 234,", glow: "rgba(147, 51, 234, 0.4)" },
        { color: "rgba(219, 39, 119,", glow: "rgba(219, 39, 119, 0.4)" },
        { color: "rgba(16, 185, 129,", glow: "rgba(16, 185, 129, 0.4)" }
      ];
      const picked = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      this.color = picked.color;
      this.glow = picked.glow;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      if (!isMobile) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.glow;
      }
      ctx.fill();
      if (!isMobile) {
        ctx.shadowBlur = 0;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.99;
      this.vy *= 0.99;
      if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.06;
      if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.06;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null && !isMobile) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * (this.density / 4);
          const directionY = forceDirectionY * force * (this.density / 4);

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }
  }

  class BurstSpark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2.2 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.028 + 0.02;
      this.friction = 0.94;
      const palette = [
        { color: "rgba(6, 182, 212,", glow: "#06b6d4" },
        { color: "rgba(168, 85, 247,", glow: "#a855f7" },
        { color: "rgba(99, 102, 241,", glow: "#6366f1" },
        { color: "rgba(244, 63, 94,", glow: "#f43f5e" },
        { color: "rgba(56, 189, 248,", glow: "#38bdf8" },
        { color: "rgba(52, 211, 153,", glow: "#34d399" }
      ];
      const picked = palette[Math.floor(Math.random() * palette.length)];
      this.color = picked.color;
      this.glow = picked.glow;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * Math.max(this.alpha, 0.1), 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      if (!isMobile) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.glow;
      }
      ctx.fill();
      if (!isMobile) {
        ctx.shadowBlur = 0;
      }
    }
  }

  class ShockwaveRing {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 6;
      this.maxRadius = isMobile ? 120 : 180;
      this.speed = isMobile ? 5 : 6.5;
      this.alpha = 0.8;
    }

    update(particlesList) {
      this.radius += this.speed;
      this.alpha = Math.max(0, 0.8 * (1 - this.radius / this.maxRadius));

      if (particlesList && !isMobile) {
        for (let i = 0; i < particlesList.length; i++) {
          const p = particlesList[i];
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - this.radius) < 24 && dist > 0) {
            const force = ((24 - Math.abs(dist - this.radius)) / 24) * 3;
            p.vx += (dx / dist) * (force * 0.4);
            p.vy += (dy / dist) * (force * 0.4);
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }
      }
    }

    draw() {
      if (this.alpha <= 0 || this.radius >= this.maxRadius) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(6, 182, 212, ${this.alpha * 0.75})`;
      ctx.lineWidth = 1.8 * this.alpha;
      if (!isMobile) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#06b6d4";
      }
      ctx.stroke();
      if (!isMobile) {
        ctx.shadowBlur = 0;
      }
    }
  }

  function triggerBurst(x, y) {
    shockwaves.push(new ShockwaveRing(x, y));
    const count = isMobile ? 12 : 26;
    for (let i = 0; i < count; i++) {
      burstSparks.push(new BurstSpark(x, y));
    }
  }

  function initParticles() {
    particles = [];
    checkMobile();
    const count = isMobile
      ? Math.min(Math.floor((width * height) / 22000), 24)
      : Math.min(Math.floor((width * height) / 6000), 160);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDistance = isMobile ? 75 : 110;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * (isMobile ? 0.12 : 0.22);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (document.hidden) {
      animId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      shockwaves[i].update(particles);
      shockwaves[i].draw();
      if (shockwaves[i].radius >= shockwaves[i].maxRadius || shockwaves[i].alpha <= 0) {
        shockwaves.splice(i, 1);
      }
    }

    // Constellation Particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();

    // Burst sparks
    for (let i = burstSparks.length - 1; i >= 0; i--) {
      burstSparks[i].update();
      burstSparks[i].draw();
      if (burstSparks[i].alpha <= 0) {
        burstSparks.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch listener without high-frequency particle thrashing on mobile scroll
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      triggerBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  resizeCanvas();
  animate();
};

const setupLiquidCardSheen = () => {
  const elements = document.querySelectorAll(".card, .panel, .stat, .avatar-frame, .contact-card, .map-card");
  elements.forEach((el) => {
    if (el.dataset.sheenBound === "true") return;
    el.dataset.sheenBound = "true";

    let ticking = false;
    let bounds = null;

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect();
      el.style.transition = "transform 0.08s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out";
      el.style.willChange = "transform";
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Update liquid sheen spotlight reflection position
      el.style.setProperty("--mouse-x", `${mouseX}px`);
      el.style.setProperty("--mouse-y", `${mouseY}px`);

      if (!ticking) {
        requestAnimationFrame(() => {
          if (!bounds) return;
          const xPct = Math.max(-1, Math.min(1, ((mouseX / bounds.width) - 0.5) * 2));
          const yPct = Math.max(-1, Math.min(1, ((mouseY / bounds.height) - 0.5) * 2));

          // Apple Liquid Glass dynamic repulsion & 3D tilt:
          // Whichever spot the cursor is placed on pushes away into depth (-Z) and tilts away
          const isLarge = el.classList.contains("panel") || el.classList.contains("contact-card");
          const maxTilt = isLarge ? 5.5 : (el.classList.contains("stat") ? 7.5 : (el.classList.contains("avatar-frame") ? 9 : 11));
          const maxPush = isLarge ? 3 : 5.5;

          const rotX = (-yPct * maxTilt).toFixed(2);
          const rotY = (xPct * maxTilt).toFixed(2);
          const pushX = (-xPct * maxPush).toFixed(2);
          const pushY = (-yPct * maxPush).toFixed(2);

          el.style.transform = `perspective(1000px) translate3d(${pushX}px, ${pushY}px, -4px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(0.992, 0.992, 0.992)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onMouseLeave = () => {
      bounds = null;
      ticking = false;
      el.style.transition = "transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.2), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease";
      el.style.transform = "perspective(1000px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
  });
};

const initLiquidGlassCursor = () => {
  if (window.__liquidCursorInitialized) return;
  // Disable only if strictly touch screen with no hover capability
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(hover: hover)").matches) {
    return;
  }
  window.__liquidCursorInitialized = true;

  // Clean up any legacy canvas or outer rings
  const oldCanvas = document.getElementById("binary-cursor-canvas");
  if (oldCanvas) oldCanvas.remove();
  const oldRing = document.getElementById("glass-cursor-ring");
  if (oldRing) oldRing.remove();

  let dot = document.getElementById("glass-cursor-dot");
  if (!dot) {
    dot = document.createElement("div");
    dot.id = "glass-cursor-dot";
    dot.className = "glass-cursor-dot glass-cursor-hidden";
    document.body.appendChild(dot);
  }

  let isVisible = false;

  const onPointerMove = (e) => {
    if (!isVisible) {
      isVisible = true;
      dot.classList.remove("glass-cursor-hidden");
    }
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });

  document.addEventListener("mouseleave", () => {
    isVisible = false;
    dot.classList.add("glass-cursor-hidden");
  });

  document.addEventListener("mouseenter", () => {
    isVisible = true;
    dot.classList.remove("glass-cursor-hidden");
  });

  // Track hover on interactive elements
  const interactiveSelectors = 'a, button, input, textarea, select, .btn, .card, [role="button"], .chip, .subbtn, .dropbtn, .project-card, .menu-toggle, .contact-line, .social-links a, .link';
  document.addEventListener("pointerover", (e) => {
    if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
      dot.classList.add("is-hover");
    }
  });

  document.addEventListener("pointerout", (e) => {
    if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
      dot.classList.remove("is-hover");
    }
  });

  // Click feedback
  document.addEventListener("mousedown", () => {
    dot.classList.add("is-active");
  });

  document.addEventListener("mouseup", () => {
    dot.classList.remove("is-active");
  });
};

const setupScrollReveals = () => {
  if (!("IntersectionObserver" in window)) return;
  const revealElements = document.querySelectorAll(".section-title, .card, .timeline-card, .edu-card, .training-card, .contact-card, .map-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
};

const initAmbient = () => {
  initParticleConstellation();
  initLiquidGlassCursor();
  setupBackgroundClick();
  setupMobileMenu();
  setupLiquidCardSheen();
  setupScrollReveals();
  requestAnimationFrame(() => {
    document.body.classList.remove("preload");
    document.body.classList.add("loaded");
  });
};

const wrapTitleLetters = () => {
  const title = document.getElementById("profileTitle");
  if (!title) return;
  title.dataset.wrapped = "true";
  const text = title.textContent || "";
  title.textContent = "";
  const words = text.split(" ");
  const anims = ["floatA", "floatB", "floatC", "floatD", "floatE"];
  words.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "title-word";
    word.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "title-letter";
      span.textContent = char;

      // Assign one of 5 distinct float trajectory keyframes
      const anim = anims[Math.floor(Math.random() * anims.length)];
      // Random duration from 2.2s to 3.8s
      const dur = (Math.random() * 1.6 + 2.2).toFixed(2);
      // Random negative delay so each character starts in a completely different float phase
      const delay = (-(Math.random() * 4)).toFixed(2);

      span.style.animation = `${anim} ${dur}s ease-in-out infinite`;
      span.style.animationDelay = `${delay}s`;

      wordSpan.appendChild(span);
    });
    title.appendChild(wordSpan);
    if (index < words.length - 1) {
      const space = document.createElement("span");
      space.className = "title-letter space";
      space.textContent = " ";
      title.appendChild(space);
    }
  });
};

const setupStickman = () => {};


const hydrate = (profile) => {
  document.title = `${profile.name} | IoT Web Portfolio`;

  setText("profileName", profile.name);
  setText("profileTitle", profile.title);
  wrapTitleLetters();
  setText("profileSummary", profile.summary);

  renderHeroMeta(profile);
  if (profile.socials && profile.socials.length) {
    renderSocialLinks(profile.socials);
  }

  const cvPath = `static/files/${profile.cv_file}`;
  const cvLink = document.getElementById("cvLink");
  const cvLinkFooter = document.getElementById("cvLinkFooter");
  if (cvLink) cvLink.href = cvPath;
  if (cvLinkFooter) cvLinkFooter.href = cvPath;

  setText("statProjects", profile.projects.length);
  setText("statExperience", profile.experience.length);
  setText("statSkills", profile.skills.core.length + profile.skills.software.length);

  renderChips("skillsCore", profile.skills.core);
  renderChips("skillsSoftware", profile.skills.software);
  renderChips("skillsFocus", profile.skills.focus);

  renderProjects(profile.projects);
  renderExperience(profile.experience);
  renderEducation(profile.education);
  if (profile.training && profile.training.length) {
    renderTraining(profile.training);
  }
  renderActivities(profile.activities);
  if (profile.extracurricular && profile.extracurricular.length) {
    renderExtracurricular(profile.extracurricular);
  }

  renderList("languagesList", profile.languages, (lang) => `• ${lang.name} - ${lang.level}`);
  renderList("hobbiesList", profile.hobbies, (hobby) => `• ${hobby}`);

  setText("contactEmail", profile.email);
  setText("contactPhone", profile.phone);
  setText("contactWebsite", profile.website);

  const emailLink = document.getElementById("emailLink");
  if (emailLink) emailLink.href = `mailto:${profile.email}`;

  const emailLine = document.getElementById("contactEmailLink");
  if (emailLine) emailLine.href = `mailto:${profile.email}`;

  const phoneLine = document.getElementById("contactPhoneLink");
  if (phoneLine) phoneLine.href = `tel:${profile.phone.replace(/\s+/g, "")}`;

  const webLine = document.getElementById("contactWebsiteLink");
  if (webLine) {
    const url = profile.website.startsWith("http") ? profile.website : `https://${profile.website}`;
    webLine.href = url;
  }

  setupSearch();
  setupSmoothScroll();
  setupDropdowns();
  setupContactForm();
  initAmbient();
  setupLiquidCardSheen();
};

const embedded = document.getElementById("profileData");
if (embedded && embedded.textContent) {
  try {
    const profile = JSON.parse(embedded.textContent);
    hydrate(profile);
  } catch (error) {
    console.error("Failed to parse embedded profile data", error);
    initAmbient();
  }
} else {
  initAmbient();
}
