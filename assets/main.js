/* michael-senger.com
   Einziges bewegtes Element: die Uhr. Sie zeigt die Ortszeit in Augsburg
   (Europe/Berlin), unabhängig davon, wo die Seite aufgerufen wird. */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- Zifferblatt: Minuterie und Stundenindizes ---------- */
  const ticks = document.getElementById("ticks");
  if (ticks) {
    for (let i = 0; i < 60; i++) {
      const hour = i % 5 === 0;
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", "100");
      line.setAttribute("x2", "100");
      line.setAttribute("y1", hour ? "9" : "8");
      line.setAttribute("y2", hour ? (i === 0 ? "26" : "22") : "12.5");
      line.setAttribute("class", hour ? "tick-hour" : "tick");
      line.setAttribute("transform", `rotate(${i * 6} 100 100)`);
      ticks.appendChild(line);
    }
  }

  /* ---------- Zeit in Augsburg ---------- */
  const fmt = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  let offset = 0;        // Differenz zwischen Augsburger Wandzeit und UTC in ms
  let offsetCheckedAt = 0;
  const syncOffset = (now) => {
    const p = Object.fromEntries(fmt.formatToParts(new Date(now)).map((x) => [x.type, x.value]));
    const wall = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    offset = wall - (now - (now % 1000));
    offsetCheckedAt = now;
  };
  const augsburgTime = () => {
    const now = Date.now();
    if (now - offsetCheckedAt > 60000) syncOffset(now); // Sommer-/Winterzeit
    const d = new Date(now + offset);
    const s = d.getUTCSeconds() + d.getUTCMilliseconds() / 1000;
    const m = d.getUTCMinutes() + s / 60;
    const h = (d.getUTCHours() % 12) + m / 60;
    return { h, m, s, hh: d.getUTCHours(), mm: d.getUTCMinutes() };
  };

  /* ---------- Zeiger ---------- */
  const hourHand = document.getElementById("hand-hour");
  const minuteHand = document.getElementById("hand-minute");
  const secondHand = document.getElementById("hand-second");
  const caption = document.getElementById("clock-time");
  if (!hourHand) return;

  const set = (el, deg) => el.setAttribute("transform", `rotate(${deg} 100 100)`);
  const angles = (t) => ({ h: t.h * 30, m: t.m * 6, s: t.s * 6 });
  let lastCaption = "";
  const updateCaption = (t) => {
    const text = `${String(t.hh).padStart(2, "0")}:${String(t.mm).padStart(2, "0")} Uhr`;
    if (text !== lastCaption) { caption.textContent = text; lastCaption = text; }
  };

  if (reduced) {
    // Keine Dauerbewegung: Sekundenzeiger ausblenden, Stand alle 15 s aktualisieren.
    secondHand.style.display = "none";
    const tick = () => { const t = augsburgTime(); const a = angles(t); set(hourHand, a.h); set(minuteHand, a.m); updateCaption(t); };
    tick();
    setInterval(tick, 15000);
    return;
  }

  // Einmaliger Moment beim Laden: Die Zeiger stellen sich von 12 Uhr auf die aktuelle Zeit.
  const intro = 1800;
  const start = performance.now();
  const ease = (k) => 1 - Math.pow(1 - k, 3);
  const frame = (now) => {
    const t = augsburgTime();
    const a = angles(t);
    const k = Math.min((now - start) / intro, 1);
    const e = ease(k);
    set(hourHand, a.h * e);
    set(minuteHand, a.m * e);
    set(secondHand, a.s * e);
    updateCaption(t);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();

/* ---------- Jahr in der Fußzeile ---------- */
(() => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
