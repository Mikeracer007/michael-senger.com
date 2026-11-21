# AGENTS.md: Anleitung für KI-Agenten (Claude, Codex, Cursor, etc.)

Diese Datei ist der Einstiegspunkt für jedes Modell bzw. jeden Agenten, der an dieser Website arbeitet.
`CLAUDE.md` verweist hierher.

## Projekt

Persönliche Website von **Michael Senger** (Augsburg/München).
Positionierung: Sales Operations, Revenue Operations, Compensation Design (OTE, Quota, Incentives),
Steuerung und Forecasting, KI- und Workflow-Automatisierung.

## Regeln

1. **Kein Build-Schritt.** Reines HTML/CSS/JS. Kein Framework, kein npm, keine Bundler, außer Michael wünscht das ausdrücklich.
2. **DSGVO first.** Keine externen Ressourcen (kein Google Fonts, kein CDN, keine Analytics, keine Embeds), keine Cookies.
   Wenn doch etwas Externes nötig wird, `datenschutz.html` entsprechend ergänzen.
3. **Sprache:** Deutsch, du-Form auf Rechtsseiten, kein Gendern (keine Sternchen o. Ä.).
4. **Keine erfundenen Fakten.** Zahlen, Arbeitgeber, Projekte oder Referenzen nur einsetzen, wenn Michael sie bestätigt hat.
   Platzhalter sind im Code mit `TODO` oder sichtbar mit `<small>Platzhalter</small>` markiert.
5. **Keine privaten Daten** (Familie, Gesundheit, laufende Verfahren, Gehalt) auf die Website.
6. **Barrierearm und performant:** semantisches HTML, `prefers-reduced-motion` respektieren, Lighthouse > 90 anstreben.
7. **Deployment = Push auf `main`.** Vor dem Push lokal prüfen (`python3 -m http.server`).
8. `CNAME` nicht löschen oder ändern (sonst fällt die Custom Domain weg).

## Design-System

- Dunkles Theme, Tokens in `assets/style.css` unter `:root`
- Akzentverlauf: Mint `#4fe3c1` → Blau `#7c9cff` → Violett `#b38bff`
- Typografie: System-Sans für Text und Headlines, kursive Serif (`.serif`) als Akzent, Mono für Kicker/Labels
- Effekte: Partikel-Canvas, Scroll-Reveal (`.reveal`), Spotlight und Tilt auf Karten (`data-tilt`), animierte Zähler (`data-count`)

## Offene TODOs

- [ ] Impressum: ladungsfähige Anschrift und E-Mail eintragen (**Pflicht vor Go-live**)
- [ ] Datenschutz: Anschrift ergänzen, Text prüfen
- [ ] Echte Kontakt-E-Mail und LinkedIn-URL in `index.html` (Sektion `#contact`)
- [ ] Stats-Sektion: echte Zahlen einsetzen oder Sektion entfernen
- [ ] Lab-Sektion: Beschreibungen der Projekte prüfen bzw. freigeben
- [ ] Optional: Portrait-Foto, Englisch-Version (`/en/`), OG-Bild (`assets/og.png`, 1200×630)
- [ ] `.eu`-Domain per 301 auf `.com` weiterleiten (United Domains)

## Änderungsprotokoll

- 2026-11-21: v0.1 angelegt (Claude). Startseite, Rechtsseiten (Platzhalter), GitHub-Pages-Setup.
