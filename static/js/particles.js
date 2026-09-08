/**
 * Interactive Particle Constellation Engine with Dynamic Click Shockwave & Bursts
 * High-performance, lightweight 60fps/120fps Canvas Backdrop
 */
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let burstSparks = [];
  let shockwaves = [];
  const mouse = { x: null, y: null, radius: 160 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 25 + 5;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.alpha = Math.random() * 0.6 + 0.25;
      const colorPalette = [
        { color: 'rgba(99, 102, 241,', glow: '#6366f1' },   // Indigo
        { color: 'rgba(6, 182, 212,', glow: '#06b6d4' },    // Cyan
        { color: 'rgba(168, 85, 247,', glow: '#a855f7' },   // Violet
        { color: 'rgba(56, 189, 248,', glow: '#38bdf8' }    // Sky Blue
      ];
      const picked = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      this.color = picked.color;
      this.glow = picked.glow;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.glow;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Friction recovery if accelerated by shockwaves
      this.vx *= 0.99;
      this.vy *= 0.99;
      if (Math.abs(this.vx) < 0.25) this.vx += (Math.random() - 0.5) * 0.08;
      if (Math.abs(this.vy) < 0.25) this.vy += (Math.random() - 0.5) * 0.08;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * (this.density / 3.5);
          const directionY = forceDirectionY * force * (this.density / 3.5);

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
      const speed = Math.random() * 6.5 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2.8 + 1.2;
      this.alpha = 1;
      this.decay = Math.random() * 0.024 + 0.018;
      this.friction = 0.95;
      const palette = [
        { color: 'rgba(6, 182, 212,', glow: '#06b6d4' },
        { color: 'rgba(168, 85, 247,', glow: '#a855f7' },
        { color: 'rgba(99, 102, 241,', glow: '#6366f1' },
        { color: 'rgba(244, 63, 94,', glow: '#f43f5e' },
        { color: 'rgba(56, 189, 248,', glow: '#38bdf8' },
        { color: 'rgba(52, 211, 153,", glow: '#34d399' }
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
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.glow;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  class ShockwaveRing {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 6;
      this.maxRadius = 180;
      this.speed = 6.5;
      this.alpha = 0.85;
    }

    update(particlesList) {
      this.radius += this.speed;
      this.alpha = Math.max(0, 0.85 * (1 - this.radius / this.maxRadius));

      if (particlesList) {
        for (let i = 0; i < particlesList.length; i++) {
          const p = particlesList[i];
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - this.radius) < 26 && dist > 0) {
            const force = ((26 - Math.abs(dist - this.radius)) / 26) * 3.8;
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
      ctx.lineWidth = 2 * this.alpha;
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#06b6d4';
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  function triggerBurst(x, y) {
    shockwaves.push(new ShockwaveRing(x, y));
    const count = 28;
    for (let i = 0; i < count; i++) {
      burstSparks.push(new BurstSpark(x, y));
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 5500), 200);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDistance = 110;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.25;
          ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
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

    requestAnimationFrame(animate);
  }

  // Event Listeners for interactivity
  window.addEventListener('resize', resizeCanvas);
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('click', (e) => {
    triggerBurst(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      triggerBurst(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    mouse.x = null;
    mouse.y = null;
  });

  resizeCanvas();
  animate();
})();
