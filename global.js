/* ================================================
   FLACKOINSIGHT — global.js
   Particles | Hamburger | Scroll | Counter
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- HEADER SCROLL ----
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // mobile sub-toggle
    mobileNav.querySelectorAll('.mobile-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        if (sub) sub.classList.toggle('is-open');
        btn.classList.toggle('is-open');
      });
    });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // ---- COUNTER ANIMATION ----
  function animateCount(el) {
    const target = el.dataset.target;
    const isPlus = target.startsWith('+');
    const isX = target.startsWith('x');
    const isPercent = target.endsWith('%');
    let num = parseFloat(target.replace(/[^0-9.]/g, ''));
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (num - start) * ease;
      let display = '';
      if (isX) display = 'x' + (Number.isInteger(num) ? Math.round(current) : current.toFixed(1));
      else if (isPercent) display = (isPlus ? '+' : '') + Math.round(current) + '%';
      else display = (isPlus ? '+' : '') + Math.round(current);
      el.textContent = display;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io2.observe(c));
  }

  // ---- PARTICLES ----
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 1.5 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.35 + 0.1;
      this.fadeIn = true;
      // color: 70% blue, 30% emerald
      this.color = Math.random() > 0.3
        ? `rgba(59,130,246,${this.maxAlpha})`
        : `rgba(16,185,129,${this.maxAlpha})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.fadeIn) {
        this.alpha = Math.min(this.alpha + 0.005, this.maxAlpha);
        if (this.alpha >= this.maxAlpha) this.fadeIn = false;
      }
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace(/[\d.]+\)$/, this.alpha + ')');
      ctx.fill();
    }
  }

  function initParticles() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  let animId;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  initParticles();
  loop();

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => { if (p.x > W) p.x = Math.random() * W; });
  });
});
