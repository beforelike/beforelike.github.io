/*
 * Landing page starfield and audio control
 * Lightweight canvas-based effect with parallax and meteor streaks
 */
(function () {
  const $landing = document.getElementById('landing');
  if (!$landing) return;

  const canvas = document.getElementById('landing-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  // 星轨模式与旋转中心（右上角）
  const STAR_TRAIL = true; // 如需受配置控制可改为：config.meteor
  const CENTER = { x: window.innerWidth, y: 0 };

  const config = {
    audioEnable: $landing.dataset.audioEnable === 'true',
    audioSrc: $landing.dataset.audioSrc || '',
    audioVolume: parseFloat($landing.dataset.audioVolume || '0.4'),
    meteor: $landing.dataset.meteor === 'true',
    parallax: $landing.dataset.parallax === 'true',
    density: parseFloat($landing.dataset.density || '0.9'),
  };

  // Resize canvas
  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 旋转中心：右上角
    CENTER.x = canvas.width;
    CENTER.y = 0;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Stars
  const stars = [];
  const STAR_COUNT = Math.floor(220 * Math.max(0.0, Math.min(1.5, config.density)));

  // 星轨模式（改造原“流星”效果为星空演示摄影旋转效果）
  

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function spawnStar() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const z = rand(0.2, 1.0);
    const r = rand(0.3, 1.6);
    const tw = rand(0, Math.PI * 2);
    const dx = x - CENTER.x;
    const dy = y - CENTER.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const speed = rand(0.003, 0.01) * (0.5 + z * 0.5); // 角速度，随深度加权
    return { x, y, z, r, tw, radius, angle, speed };
  }

  if (canvas && ctx) {
    for (let i = 0; i < STAR_COUNT; i++) stars.push(spawnStar());
  }

  let mouseX = (canvas && canvas.width) ? canvas.width / 2 : window.innerWidth / 2;
  let mouseY = (canvas && canvas.height) ? canvas.height / 2 : window.innerHeight / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // 关闭原 Meteors，改为星轨旋转效果
  const meteors = [];

  function draw() {
    if (!(canvas && ctx)) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background subtle gradient
    const g = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.3, 0, canvas.width * 0.5, canvas.height * 0.3, canvas.width);
    g.addColorStop(0, 'rgba(120,140,200,0.05)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars: 星轨旋转（中心在右上角）
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      // 极坐标旋转
      s.angle += s.speed;
      const sx = CENTER.x + Math.cos(s.angle) * s.radius;
      const sy = CENTER.y + Math.sin(s.angle) * s.radius;

      // 轻微闪烁
      s.tw += 0.02;
      const pulse = 0.5 + Math.sin(s.tw) * 0.5;

      // 可选视差（弱化，避免破坏旋转中心感）
      const offsetX = config.parallax ? (mouseX - canvas.width / 2) * 0.0003 * s.z : 0;
      const offsetY = config.parallax ? (mouseY - canvas.height / 2) * 0.0003 * s.z : 0;

      // 星点
      ctx.globalAlpha = 0.5 + pulse * 0.4;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(sx + offsetX, sy + offsetY, s.r * s.z, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // 星轨（短线段，模拟长曝光轨迹）
      const trailLen = s.speed * 18; // 根据角速度动态调整轨迹长度
      const px = CENTER.x + Math.cos(s.angle - trailLen) * s.radius;
      const py = CENTER.y + Math.sin(s.angle - trailLen) * s.radius;
      const grad = ctx.createLinearGradient(px + offsetX, py + offsetY, sx + offsetX, sy + offsetY);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, 'rgba(255,255,255,0.75)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = Math.max(1, s.r * s.z * 0.8);
      ctx.beginPath();
      ctx.moveTo(px + offsetX, py + offsetY);
      ctx.lineTo(sx + offsetX, sy + offsetY);
      ctx.stroke();
    }

    // 移除流星绘制，保留占位（如需回退可在此恢复）

    requestAnimationFrame(draw);
  }
  if (canvas && ctx) requestAnimationFrame(draw);

  // Audio controls
  const audioEl = document.getElementById('landing-audio');
  const toggleBtn = document.getElementById('audio-toggle');
  if (audioEl) {
    audioEl.volume = isNaN(config.audioVolume) ? 0.4 : Math.max(0, Math.min(1, config.audioVolume));
  }

  function tryPlay() {
    if (!audioEl) return;
    audioEl.play().catch(() => {/* ignore autoplay block */});
  }

  if (toggleBtn && audioEl) {
    toggleBtn.addEventListener('click', () => {
      if (audioEl.paused) {
        audioEl.play().catch(() => {});
        toggleBtn.classList.add('playing');
      } else {
        audioEl.pause();
        toggleBtn.classList.remove('playing');
      }
    });
  }

  // First interaction auto-play
  const ctaBtn = document.querySelector('.cta-button');
  if (ctaBtn && audioEl) {
    ctaBtn.addEventListener('click', tryPlay, { once: true });
  }
})();