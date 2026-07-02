# Agent Notes

This is a static public site for Cascade Camp.

## Goals

- Keep the site deployable on GitHub Pages with no build step.
- Preserve the collaborative, stone soup tone.
- Prefer simple, reviewable edits.
- Keep media light; embed hosted video instead of committing large video files.

## Local preview

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Files

- `index.html`: page content and semantic structure.
- `styles.css`: responsive layout and visual system.
- `script.js`: footer year helper.
- `assets/`: images, favicon, and small static assets.
- `MEDIA.md`: rules for externally hosted media URLs.

## Before finishing

- Check that the page still works without a build step.
- Check for horizontal overflow on mobile.
- Run `node --check script.js` after editing JavaScript.
- Do not add large media files to Git; link to reviewed external media URLs.
