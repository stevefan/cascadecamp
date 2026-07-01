# Cascade Camp

A small static launch site for `cascade.camp`.

The site is intentionally plain HTML, CSS, and JavaScript so the repo can stay
public, collaborative, and easy to edit through GitHub pull requests.

## Files

- `index.html` is the homepage.
- `styles.css` contains the full responsive design.
- `script.js` powers the interest form.
- `assets/cascade-camp-hero.webp` is the optimized hero image.
- `assets/cascade-camp-hero.png` is the generated fallback and social preview image.
- `CNAME` sets the custom domain for GitHub Pages.
- `MEDIA.md` describes the large-asset workflow.

## Deploy

This can be hosted by any static host.

For GitHub Pages:

1. Push the repo to GitHub.
2. Enable Pages for the main branch.
3. Keep the included `CNAME` file.
4. Point DNS for `cascade.camp` at GitHub Pages.

For Cloudflare Pages, Netlify, or Vercel:

1. Use this folder as the project root.
2. Leave the build command empty.
3. Use `/` as the publish directory.
4. Add `cascade.camp` as the custom domain in the host dashboard.

## Collaboration

Use the public repository as the shared editing surface.

1. Create a branch or fork.
2. Edit the static files directly.
3. Open a pull request with a short note about what changed.
4. Preview locally with `python3 -m http.server 4173`.
5. Visit `http://localhost:4173`.

Trusted collaborators can use GitHub's web editor, Codespaces, local editors, or
coding agents. Keep changes small enough to review quickly.

## Video

Do not commit finished video files to the repository unless they are tiny.
GitHub Pages is excellent for the site shell, but video should usually be hosted
elsewhere and embedded.

For the broader media workflow, see `MEDIA.md`.

Good options:

- YouTube or Vimeo for the fastest no-maintenance path.
- Cloudflare Stream for a simple paid video pipeline with embeds.
- Mux for developer-friendly video hosting, encoding, delivery, and analytics.
- Cloudflare R2 or another object store plus a CDN for hand-optimized MP4/WebM.

The homepage currently has a video placeholder in `#video`. Replace the
placeholder markup in `index.html` with the embed code from the chosen provider
when a real video is ready.

If self-hosting a small clip, export:

- MP4/H.264 for broad compatibility.
- WebM/VP9 or AV1 as an optional modern source.
- A poster image under 300 KB.
- Multiple sizes if the video is more than a few seconds.

## Waitlist

The form currently falls back to a `mailto:hello@cascade.camp` draft.
To connect a real form backend, set `WAITLIST_ENDPOINT` in `script.js` to an endpoint that accepts JSON:

```json
{
  "email": "you@example.com",
  "note": "Optional note"
}
```
