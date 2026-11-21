/* michael-senger.com — Interaktionen (ohne Abhängigkeiten) */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hintergrund: Partikel-Netzwerk mit Maus-Interaktion ---------- */
  const canvas = document.getElementById("field");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, points = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      const count = Math.min(110, Math.floor((innerWidth * innerHeight) / 14000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // weiche Farbflächen
      const g1 = ctx.createRadialGradient(w * 0.85, h * 0.1, 0, w * 0.85, h * 0.1, w * 0.5);
      g1.addColorStop(0, "rgba(124,156,255,0.10)"); g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * 0.1, h * 0.9, 0, w * 0.1, h * 0.9, w * 0.45);
      g2.addColorStop(0, "rgba(79,227,193,0.07)"); g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);

      const maxD = 140 * dpr;
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, md = Math.hypot(dx, dy);
        if (md < 160 * dpr) { p.x += dx / md * 0.8; p.y += dy / md * 0.8; }
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD) {
            ctx.strokeStyle = `rgba(140,160,255,${0.14 * (1 - d / maxD)})`;
            ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(200,210,255,0.5)";
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.2 * dpr, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduced) requestAnimationFrame(draw);
    };

    addEventListener("resize", resize);
    addEventListener("pointermove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
    resize(); draw();
  }

  /* ---------- Scroll-Reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
    io.observe(el);
  });

  /* ---------- Karten: Spotlight + Tilt ---------- */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (!reduced) {
        const rx = ((y / r.height) - 0.5) * -6, ry = ((x / r.width) - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      }
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  /* ---------- Zähler ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = reduced ? 0 : 1400;
      const tick = (t) => {
        const k = dur ? Math.min((t - t0) / dur, 1) : 1;
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Terminal-Animation ---------- */
  const term = document.getElementById("term");
  if (term) {
    const lines = [
      ["p", "$ ", "agent run --task pipeline-review"],
      ["c", "", "› lade CRM-Export … 1.248 Opportunities"],
      ["c", "", "› prüfe Stage-Definitionen … 3 Inkonsistenzen"],
      ["c", "", "› Forecast-Abweichung Q-1 … −7,4 %"],
      ["", "", "✓ Report erstellt: pipeline_review.md"],
      ["p", "$ ", "agent run --task comp-plan-sim"],
      ["c", "", "› simuliere OTE 60/40, Accelerator ab 100 %"],
      ["", "", "✓ 3 Szenarien, Kostenwirkung berechnet"],
      ["p", "$ ", ""],
    ];
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let started = false;
    const run = async () => {
      let html = "";
      for (const [cls, prompt, text] of lines) {
        html += prompt ? `<span class="p">${prompt}</span>` : "";
        for (let i = 0; i <= text.length; i++) {
          const part = esc(text.slice(0, i));
          term.innerHTML = html + (cls === "c" ? `<span class="c">${part}</span>` : part) + '<span class="cursor"></span>';
          if (!reduced) await new Promise((r) => setTimeout(r, prompt ? 38 : 12));
        }
        html += (cls === "c" ? `<span class="c">${esc(text)}</span>` : esc(text)) + "\n";
        if (!reduced) await new Promise((r) => setTimeout(r, 260));
      }
    };
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting && !started) { started = true; run(); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(term);
  }

  /* ---------- Jahr im Footer ---------- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
