# AGENTS.md: Anleitung für KI-Agenten (Claude, Codex, Cursor usw.)

Diese Datei ist der Einstiegspunkt für jedes Modell und jeden Agenten, der an dieser Website arbeitet.
`CLAUDE.md` verweist hierher.

## Projekt

Persönliche Website von **Michael Senger** (Raum Augsburg).
Die Seite stellt ihn **als Mensch** vor: wer er ist, was ihn interessiert, wie er arbeitet.
Beruflicher Fokus: **Operations und General Management** (Prozesse, Steuerung, PMO, Chief of Staff).
Ausdrücklich **keine Vertriebs-Positionierung**.

## Regeln

1. **Kein Build-Schritt.** Reines HTML/CSS/JS. Kein Framework, kein npm, keine Bundler, außer Michael wünscht das ausdrücklich.
2. **DSGVO first.** Keine externen Ressourcen (kein Google Fonts, kein CDN, keine Analytics, keine Embeds), keine Cookies.
   Schriften werden selbst gehostet (`assets/fonts/`). Wenn doch etwas Externes nötig wird, `datenschutz.html` ergänzen.
3. **Sprache:** Deutsch, Ich-Perspektive, kein Gendern. Ton: ruhig, zurückhaltend, konkret, ohne Marketing-Sprech.
4. **Keine erfundenen Fakten.** Arbeitgeber, Stationen, Zahlen oder Referenzen nur einsetzen, wenn Michael sie bestätigt hat
   (Quelle: sein Masterprofil/CV). Stellen zum Prüfen sind im HTML mit `<!-- PRÜFEN -->` bzw. `<!-- TODO -->` markiert.
5. **Keine privaten Details:** keine Namen von Familienmitgliedern, keine Gesundheits-, Rechts- oder Gehaltsthemen.
6. **Barrierearm und schnell:** semantisches HTML, sichtbarer Fokus, `prefers-reduced-motion` respektieren.
7. **Deployment = Push auf `main`** (GitHub Pages). Vorher lokal prüfen: `python3 -m http.server`.
8. `CNAME` nicht löschen oder ändern, sonst fällt die Custom Domain weg.

## Design-System

Leitidee: ruhig und hell, Aufbau wie eine gute Präsentation. Jede Sektion beginnt mit einem **ganzen Satz als Überschrift**
(Action Title), darunter wenig, klarer Text. Viel Weißraum, keine Karten, keine Verläufe, keine Icons.

| Token | Wert | Verwendung |
|---|---|---|
| `--paper` | `#ffffff` | Hintergrund (bewusst weiß, nicht beige) |
| `--ink` | `#1b2433` | Text, Uhrzeiger (Tintenblau) |
| `--ink-soft` | `#4a5466` | Fließtext zweiter Ordnung |
| `--ink-faint` | `#848c9a` | Bildunterschriften, Minuterie |
| `--rule` | `#e3e6eb` | Haarlinien (nur Kopf- und Fußzeile) |
| `--accent` | `#2e6b57` | einziger Akzent: Sekundenzeiger, Links, Fokus |

- **Schrift:** nur *Literata* (variabel, mit optischen Größen), selbst gehostet. Skala: 14 / 18 / 21 / 24 / 36 / 72 px.
- **Uhr:** das einzige bewegte Element. Sie zeigt die Ortszeit Augsburg (Europe/Berlin). Beim Laden stellen sich
  die Zeiger einmal von 12 Uhr auf die aktuelle Zeit. Bei `prefers-reduced-motion` gibt es keinen Sekundenzeiger und keine Animation.
  Zifferblatt bewusst generisch halten (kein Nachbau eines Markenzifferblatts).
- Keine Eyebrow-Labels, keine Versalien-Labels, keine Nummerierung (die Sektionen sind keine Abfolge), keine Pfeile an Links.

## Offene TODOs

- [ ] Impressum: ladungsfähige Anschrift und E-Mail eintragen (**Pflicht vor Go-live**)
- [ ] Datenschutz: Anschrift ergänzen, Text prüfen
- [ ] Echte Kontakt-E-Mail und LinkedIn-URL eintragen (`index.html`, Sektionen `#beruf` und `#kontakt`)
- [ ] Texte „Über mich“, „Interessen“ und „Beruf“ von Michael freigeben lassen
- [ ] Beruf: mit Masterprofil/CV abgleichen, ggf. kurze Stationen ergänzen
- [ ] Optional: Portrait-Foto, OG-Bild (`assets/og.png`, 1200×630), Englisch-Version (`/en/`)
- [ ] `.eu`-Domain per 301 auf `.com` weiterleiten (United Domains)

## Änderungsprotokoll

- 2026-11-21: v0.2, helles, ruhiges Redesign. Person statt Vertrieb, Fokus Operations und General Management,
  Schrift Literata selbst gehostet, Uhr mit Ortszeit Augsburg (Claude).
- 2026-11-21: v0.1, erster dunkler Entwurf (verworfen) (Claude).
