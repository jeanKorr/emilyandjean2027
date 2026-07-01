# Wedding on the Rock

A single-page wedding website — Newfoundland-inspired, mobile-friendly, ready for a custom domain.

## Quick start

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## Customize

1. **Finish Notion drafts** — Schedule times, rehearsal party, hotel block, and donation registry link are marked "coming soon" on your Notion page; update `index.html` when ready.
2. **Notion forms** — Song Request form is embedded. For new forms (e.g. RSVP), Share → Copy link → append `/embed` and add an iframe like the song request section.
3. **Photos** — Replace placeholder divs with `<img>` tags or set `background-image` in CSS. Add files to `images/`.
4. **Map** — Add a Google Maps embed iframe in the Details section.
5. **Registry** — Update the registry link `href`.

## Deploy

Static hosting works anywhere:

- **GitHub Pages** — push repo, enable Pages from `main` branch root
- **Netlify / Cloudflare Pages** — connect repo, no build step
- **Custom domain** — add DNS records in your host's dashboard

## Structure

```
index.html      # Single page, anchor navigation
css/styles.css  # Newfoundland palette & layout
js/main.js      # Load animation, mobile nav, scroll reveals
images/         # Your photos (add when ready)
```
