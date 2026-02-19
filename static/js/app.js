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
const setupBackgroundClick = () => {
  const ignoreSelector = "a, button, input, textarea, select, label, .card, .contact-form, .map-card, .dropdown, .links, .menu-toggle";
  document.addEventListener("click", (event) => {
    if (event.target.closest(ignoreSelector)) return;
    const spark = document.createElement("div");
    spark.className = "click-spark";
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1600);
  });
};

const startRain = () => {
  const rainCanvas = document.querySelector(".rain-canvas");
  if (!rainCanvas) return;
  const ctx = rainCanvas.getContext("2d");
  const drops = [];
  const dropCount = 120;

  const resize = () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
  };

  const createDrop = () => ({
    x: Math.random() * rainCanvas.width,
    y: Math.random() * rainCanvas.height,
    len: 10 + Math.random() * 20,
    speed: 2 + Math.random() * 3,
    alpha: 0.05 + Math.random() * 0.2
  });

  const init = () => {
    drops.length = 0;
    for (let i = 0; i < dropCount; i += 1) {
      drops.push(createDrop());
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    ctx.strokeStyle = "rgba(122, 162, 247, 0.6)";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    drops.forEach((drop) => {
      ctx.globalAlpha = drop.alpha;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.len);
      ctx.stroke();
      drop.y += drop.speed;
      if (drop.y > rainCanvas.height) {
        drop.y = -drop.len;
        drop.x = Math.random() * rainCanvas.width;
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  };

  resize();
  init();
  animate();
  window.addEventListener("resize", () => {
    resize();
    init();
  });
};

const initAmbient = () => {
  startRain();
  setupBackgroundClick();
  setupMobileMenu();
  requestAnimationFrame(() => {
    document.body.classList.remove("preload");
    document.body.classList.add("loaded");
  });
  setTimeout(() => {
    const overlay = document.querySelector(".storm-overlay");
    if (overlay) overlay.remove();
  }, 3600);
};

const wrapTitleLetters = () => {
  const title = document.getElementById("profileTitle");
  if (!title || title.dataset.wrapped === "true") return;
  const text = title.textContent || "";
  title.textContent = "";
  const words = text.split(" ");
  words.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "title-word";
    word.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "title-letter";
      span.textContent = char;
      const delay = (Math.random() * 1.2).toFixed(2);
      const duration = (3 + Math.random() * 2).toFixed(2);
      span.style.animationDelay = `${delay}s`;
      span.style.animationDuration = `${duration}s`;
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
  title.dataset.wrapped = "true";
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
  setupMobileMenu();
  setupContactForm();
  initAmbient();
};

const embedded = document.getElementById("profileData");
if (embedded && embedded.textContent) {
  try {
    const profile = JSON.parse(embedded.textContent);
    hydrate(profile);
  } catch (error) {
    console.error("Failed to parse embedded profile data", error);
  }
} else {
  console.error("Embedded profile data not found.");
  initAmbient();
}
