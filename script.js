// ===== PARTICLE SYSTEM =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -100, y: -100 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
    }
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(249, 115, 22, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.06 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX - 4 + 'px';
    cursorDot.style.top = e.clientY - 4 + 'px';
    cursorRing.style.left = e.clientX - 18 + 'px';
    cursorRing.style.top = e.clientY - 18 + 'px';
  });
  document.querySelectorAll('a, button, .btn-primary, .btn-outline').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'scale(1.5)';
      cursorRing.style.borderColor = '#06b6d4';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'scale(1)';
      cursorRing.style.borderColor = '#f97316';
    });
  });
}

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1500);
});

// ===== ENTRY PAGE =====
const entryPage = document.getElementById('entry-page');
const enterBtn = document.getElementById('enter-btn');
const entryCanvas = document.getElementById('entry-canvas');

// Entry page particle animation
if (entryCanvas) {
  const eCtx = entryCanvas.getContext('2d');
  function resizeEntry() {
    entryCanvas.width = window.innerWidth;
    entryCanvas.height = window.innerHeight;
  }
  resizeEntry();
  window.addEventListener('resize', resizeEntry);

  const eParticles = [];
  for (let i = 0; i < 60; i++) {
    eParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.05
    });
  }

  let entryAnimating = true;
  function animateEntry() {
    if (!entryAnimating) return;
    eCtx.clearRect(0, 0, entryCanvas.width, entryCanvas.height);
    eParticles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > entryCanvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > entryCanvas.height) p.speedY *= -1;
      eCtx.beginPath();
      eCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      eCtx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
      eCtx.fill();
    });
    // Connect nearby particles
    for (let i = 0; i < eParticles.length; i++) {
      for (let j = i + 1; j < eParticles.length; j++) {
        const dx = eParticles[i].x - eParticles[j].x;
        const dy = eParticles[i].y - eParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          eCtx.beginPath();
          eCtx.strokeStyle = `rgba(6, 182, 212, ${0.04 * (1 - dist / 120)})`;
          eCtx.lineWidth = 0.5;
          eCtx.moveTo(eParticles[i].x, eParticles[i].y);
          eCtx.lineTo(eParticles[j].x, eParticles[j].y);
          eCtx.stroke();
        }
      }
    }
    requestAnimationFrame(animateEntry);
  }
  animateEntry();

  function enterPortfolio() {
    entryPage.classList.add('exit');
    entryAnimating = false;
    document.body.style.overflow = 'auto';
    // Trigger typing effect after entering
    setTimeout(() => {
      const typingEl = document.querySelector('.typing-text');
      if (typingEl) {
        const text = typingEl.dataset.text;
        let idx = 0;
        typingEl.textContent = '';
        function typeChar() {
          if (idx < text.length) {
            typingEl.textContent += text[idx];
            idx++;
            setTimeout(typeChar, 50);
          }
        }
        typeChar();
      }
    }, 600);
  }

  if (enterBtn) enterBtn.addEventListener('click', enterPortfolio);
  document.addEventListener('keydown', (e) => {
    if (!entryPage.classList.contains('exit')) enterPortfolio();
  });
}

// ===== NAVBAR SCROLL =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  navbar.classList.toggle('hidden', curr > lastScroll && curr > 80);
  lastScroll = curr;

  // Active link highlight
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 120;
    const h = sec.offsetHeight;
    if (curr >= top && curr < top + h) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = target / 60;
    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    update();
  });
}

const heroObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    heroObserver.disconnect();
  }
}, { threshold: 0.3 });
const heroEl = document.querySelector('.hero');
if (heroEl) heroObserver.observe(heroEl);

// ===== BLUEPRINT CANVAS (in About section) =====
const bpCanvas = document.getElementById('blueprint-canvas');
if (bpCanvas) {
  const bCtx = bpCanvas.getContext('2d');
  bpCanvas.width = 360;
  bpCanvas.height = 360;

  let angle = 0;
  function drawBlueprint() {
    bCtx.clearRect(0, 0, 360, 360);
    const cx = 180, cy = 180;

    // Outer gear
    bCtx.save();
    bCtx.translate(cx, cy);
    bCtx.rotate(angle);
    drawGearPath(bCtx, 0, 0, 120, 14, 18);
    bCtx.strokeStyle = 'rgba(6,182,212,0.5)';
    bCtx.lineWidth = 1.5;
    bCtx.stroke();
    bCtx.restore();

    // Inner gear
    bCtx.save();
    bCtx.translate(cx, cy);
    bCtx.rotate(-angle * 1.4);
    drawGearPath(bCtx, 0, 0, 60, 10, 12);
    bCtx.strokeStyle = 'rgba(249,115,22,0.5)';
    bCtx.lineWidth = 1.5;
    bCtx.stroke();
    bCtx.restore();

    // Center crosshair
    bCtx.strokeStyle = 'rgba(249,115,22,0.3)';
    bCtx.lineWidth = 0.5;
    bCtx.beginPath();
    bCtx.moveTo(cx - 140, cy); bCtx.lineTo(cx + 140, cy);
    bCtx.moveTo(cx, cy - 140); bCtx.lineTo(cx, cy + 140);
    bCtx.stroke();

    // Dimension lines
    bCtx.strokeStyle = 'rgba(6,182,212,0.2)';
    bCtx.setLineDash([4, 4]);
    bCtx.beginPath();
    bCtx.arc(cx, cy, 100, 0, Math.PI * 2);
    bCtx.stroke();
    bCtx.setLineDash([]);

    // Labels
    bCtx.font = '10px JetBrains Mono, monospace';
    bCtx.fillStyle = 'rgba(6,182,212,0.5)';
    bCtx.fillText('R=120mm', cx + 85, cy - 85);
    bCtx.fillStyle = 'rgba(249,115,22,0.5)';
    bCtx.fillText('R=60mm', cx + 40, cy + 20);

    angle += 0.005;
    requestAnimationFrame(drawBlueprint);
  }

  function drawGearPath(ctx, x, y, r, teeth, toothH) {
    ctx.beginPath();
    const step = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) {
      const a1 = step * i;
      const a2 = a1 + step * 0.3;
      const a3 = a1 + step * 0.5;
      const a4 = a1 + step * 0.8;
      ctx.lineTo(x + (r) * Math.cos(a1), y + (r) * Math.sin(a1));
      ctx.lineTo(x + (r + toothH) * Math.cos(a2), y + (r + toothH) * Math.sin(a2));
      ctx.lineTo(x + (r + toothH) * Math.cos(a3), y + (r + toothH) * Math.sin(a3));
      ctx.lineTo(x + (r) * Math.cos(a4), y + (r) * Math.sin(a4));
    }
    ctx.closePath();
  }

  drawBlueprint();
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


