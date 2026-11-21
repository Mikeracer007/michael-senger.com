# michael-senger.com

Persönliche Website von Michael Senger: Sales Operations, Revenue Operations, Prozessoptimierung, KI-Automatisierung.

- **Live:** https://michael-senger.com (Weiterleitung von `www.` und `michael-senger.eu`)
- **Stack:** reines HTML, CSS und JavaScript. Kein Build-Schritt, keine Abhängigkeiten.
- **Hosting:** GitHub Pages (Branch `main`, Ordner `/`)
- **Domains/DNS:** United Domains

## Struktur

```
index.html          Startseite (alle Sektionen)
impressum.html      Impressum (§ 5 DDG) – Platzhalter ausfüllen!
datenschutz.html    Datenschutzerklärung – Platzhalter ausfüllen!
assets/style.css    Design-Tokens und Styles
assets/main.js      Animationen (Partikel-Hintergrund, Reveal, Tilt, Zähler, Terminal)
assets/favicon.svg  Favicon
CNAME               Custom Domain für GitHub Pages
.nojekyll           Verhindert Jekyll-Verarbeitung
```

## Lokal ansehen

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment

Jeder Push auf `main` geht automatisch live (GitHub Pages, ca. 1 Minute).

## DNS bei United Domains

Für **michael-senger.com** (DNS-Einstellungen → eigene Records):

| Typ   | Name/Host | Wert                       |
|-------|-----------|----------------------------|
| A     | @         | 185.199.108.153            |
| A     | @         | 185.199.109.153            |
| A     | @         | 185.199.110.153            |
| A     | @         | 185.199.111.153            |
| AAAA  | @         | 2606:50c0:8000::153        |
| AAAA  | @         | 2606:50c0:8001::153        |
| AAAA  | @         | 2606:50c0:8002::153        |
| AAAA  | @         | 2606:50c0:8003::153        |
| CNAME | www       | `<github-user>.github.io.` |

Bestehende A-/AAAA-Records auf `@` (z. B. die Parking-Seite von United Domains) vorher entfernen. Mail-Records (MX, TXT/SPF) nicht anfassen.

Für **michael-senger.eu**: im United-Domains-Portal eine **HTTP-Weiterleitung (301)** auf `https://michael-senger.com` einrichten. GitHub Pages unterstützt nur eine Custom Domain pro Repo.

Danach in GitHub unter *Settings → Pages* die Custom Domain prüfen und **Enforce HTTPS** aktivieren (sobald das Zertifikat ausgestellt ist, ggf. bis 24 h).

## Offene Punkte

Siehe [`AGENTS.md`](AGENTS.md) → „Offene TODOs".
