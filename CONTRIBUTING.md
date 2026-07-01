# Contributing

Cascade Camp is meant to be easy for trusted collaborators to shape.

## Editing

This site is static HTML, CSS, and JavaScript. Most changes should touch one of:

- `index.html` for content and structure.
- `styles.css` for layout and visual design.
- `script.js` for the interest form.
- `assets/` for images and small static assets.

## Pull requests

Keep pull requests small and descriptive. A good PR says:

- What changed.
- Why it changed.
- Whether you checked the page locally.

Run a local preview with:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Content tone

Use plain, warm language. Cascade Camp is a stone soup gathering: a light
container for people to bring what they care about, what they are making, and
what makes them feel alive.

Avoid over-specifying details that are not decided yet. It is fine to say that
dates, exact location, ticket price, or applications are still forming.

## Video assets

Prefer embedding hosted video rather than committing large media files. Keep the
repository fast to clone and easy to review. See `MEDIA.md` for the preferred
asset URL workflow.
