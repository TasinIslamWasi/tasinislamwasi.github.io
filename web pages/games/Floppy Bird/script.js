(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("best");
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");

  const W = canvas.width;
  const H = canvas.height;
  const GROUND_H = 88;

  const cfg = {
    gravity: 0.48,
    flap: -8.6,
    pipeSpeed: 2.8,
    pipeGap: 152,
    pipeWidth: 68,
    pipeInterval: 1500,
    birdSize: 30
  };

  let bird;
  let pipes;
  let score;
  let best = Number(localStorage.getItem("floppy_best") || 0);
  let state = "ready";
  let lastPipeAt = 0;
  let lastFrame = 0;

  function reset() {
    bird = {
      x: 110,
      y: H * 0.42,
      vy: 0,
      size: cfg.birdSize,
      angle: 0
    };
    pipes = [];
    score = 0;
    scoreEl.textContent = "0";
    bestEl.textContent = String(best);
    state = "ready";
    overlay.classList.remove("hidden");
    overlayTitle.textContent = "Press Space to Start";
    lastPipeAt = 0;
    draw(0);
  }

  function start() {
    if (state === "ready") {
      state = "running";
      overlay.classList.add("hidden");
      flap();
    }
  }

  function flap() {
    if (state === "ready") {
      start();
      return;
    }
    if (state !== "running") return;
    bird.vy = cfg.flap;
  }

  function spawnPipe(now) {
    const top = 70 + Math.random() * (H - GROUND_H - cfg.pipeGap - 160);
    pipes.push({
      x: W + 20,
      top,
      passed: false
    });
    lastPipeAt = now;
  }

  function collide(pipe) {
    const birdLeft = bird.x - bird.size / 2;
    const birdRight = bird.x + bird.size / 2;
    const birdTop = bird.y - bird.size / 2;
    const birdBottom = bird.y + bird.size / 2;

    const inX = birdRight > pipe.x && birdLeft < pipe.x + cfg.pipeWidth;
    if (!inX) return false;

    const hitsTop = birdTop < pipe.top;
    const hitsBottom = birdBottom > pipe.top + cfg.pipeGap;
    return hitsTop || hitsBottom;
  }

  function gameOver() {
    state = "dead";
    if (score > best) {
      best = score;
      localStorage.setItem("floppy_best", String(best));
      bestEl.textContent = String(best);
    }
    overlay.classList.remove("hidden");
    overlayTitle.textContent = "Game Over - Press Space to Restart";
  }

  function update(now, dt) {
    if (state !== "running") return;

    bird.vy += cfg.gravity;
    bird.y += bird.vy;
    bird.angle = Math.max(-0.45, Math.min(1.2, bird.vy * 0.06));

    if (now - lastPipeAt > cfg.pipeInterval) spawnPipe(now);

    for (let i = pipes.length - 1; i >= 0; i--) {
      const p = pipes[i];
      p.x -= cfg.pipeSpeed * dt * 60;

      if (!p.passed && p.x + cfg.pipeWidth < bird.x) {
        p.passed = true;
        score += 1;
        scoreEl.textContent = String(score);
      }

      if (collide(p)) {
        gameOver();
      }

      if (p.x + cfg.pipeWidth < -10) pipes.splice(i, 1);
    }

    if (bird.y + bird.size / 2 >= H - GROUND_H || bird.y - bird.size / 2 <= 0) {
      gameOver();
    }
  }

  function drawClouds(t) {
    const drift = (t * 0.02) % (W + 100);
    ctx.fillStyle = "#ffffffcc";

    const clouds = [
      { x: 80 - drift, y: 90, w: 68, h: 25 },
      { x: 240 - drift * 0.7, y: 140, w: 82, h: 30 },
      { x: 390 - drift * 1.1, y: 70, w: 60, h: 22 }
    ];

    for (const c of clouds) {
      const cx = (c.x + W + 120) % (W + 120) - 60;
      ctx.beginPath();
      ctx.ellipse(cx, c.y, c.w * 0.45, c.h * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 18, c.y - 8, c.w * 0.3, c.h * 0.45, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 16, c.y - 6, c.w * 0.28, c.h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawBird() {
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.angle);

    ctx.fillStyle = "#ffd24a";
    ctx.beginPath();
    ctx.arc(0, 0, bird.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff9f1a";
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(25, -4);
    ctx.lineTo(25, 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(6, -5, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f3b332";
    ctx.beginPath();
    ctx.ellipse(-4, 5, 9, 6, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawPipe(x, top) {
    const bottomY = top + cfg.pipeGap;

    ctx.fillStyle = cfg.pipe;
    ctx.fillRect(x, 0, cfg.pipeWidth, top);
    ctx.fillRect(x, bottomY, cfg.pipeWidth, H - GROUND_H - bottomY);

    ctx.fillStyle = cfg.pipeDark;
    ctx.fillRect(x + cfg.pipeWidth - 8, 0, 8, top);
    ctx.fillRect(x + cfg.pipeWidth - 8, bottomY, 8, H - GROUND_H - bottomY);

    ctx.fillStyle = "#4fc85f";
    ctx.fillRect(x - 4, top - 20, cfg.pipeWidth + 8, 20);
    ctx.fillRect(x - 4, bottomY, cfg.pipeWidth + 8, 20);
  }

  function drawGround(t) {
    const stripeX = (t * 0.25) % 34;
    ctx.fillStyle = "#d8b571";
    ctx.fillRect(0, H - GROUND_H, W, GROUND_H);

    ctx.fillStyle = "#caa660";
    for (let x = -34; x < W + 34; x += 34) {
      ctx.fillRect(x - stripeX, H - 24, 18, 8);
    }

    ctx.fillStyle = "#a98644";
    ctx.fillRect(0, H - GROUND_H, W, 6);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#66d9ff");
    sky.addColorStop(1, "#b6f7ff");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    drawClouds(t);

    for (const p of pipes) {
      drawPipe(p.x, p.top);
    }

    drawGround(t);
    drawBird();
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;

    update(now, dt);
    draw(now);

    requestAnimationFrame(loop);
  }

  function pressAction(e) {
    if (e) e.preventDefault();

    if (state === "dead") {
      reset();
      start();
      return;
    }

    if (state === "ready") {
      start();
      return;
    }

    flap();
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      pressAction(e);
    }
  });

  canvas.addEventListener("pointerdown", pressAction);

  reset();
  requestAnimationFrame(loop);
})();
