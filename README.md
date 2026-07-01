# Cascade Camp

A small static launch site for `cascade.camp`.

The site is intentionally plain HTML, CSS, and JavaScript so the repo can stay
public, collaborative, and easy to edit through GitHub pull requests.

## Files

- `index.html` is the homepage.
- `styles.css` contains the full responsive design.
- `script.js` powers the interest form.
- `assets/cascade-hero-loop.mp4` is the homepage hero video.
- `assets/cascade-hero-poster.jpg` is the hero poster and social preview image.
- `CNAME` sets the custom domain for GitHub Pages.
- `MEDIA.md` describes the large-asset workflow.

## Deploy

This can be hosted by any static host.

For GitHub Pages:

1. Push the repo to GitHub.
2. Enable Pages for the main branch.
3. Keep the included `CNAME` file.
4. Point DNS for `cascade.camp` at GitHub Pages.

## DNS

`cascade.camp` is the apex domain. Configure these records at the DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `stevefan.github.io` |

If the DNS provider supports `ALIAS` or `ANAME` records at the apex, that can
replace the A/AAAA records by pointing `@` to `stevefan.github.io`.

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

The homepage currently uses a small committed hero loop. Larger videos should be
hosted outside the repo and referenced by URL.

If self-hosting a small clip, export:

- MP4/H.264 for broad compatibility.
- WebM/VP9 or AV1 as an optional modern source.
- A poster image under 300 KB.
- Multiple sizes if the video is more than a few seconds.
