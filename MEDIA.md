# Media Workflow

Cascade Camp should stay a static, hard-coded site. GitHub keeps the visible
history and review process; large media should live behind stable URLs.

## Default Rule

- Commit small assets to `assets/` when they are part of the site and easy to
  review.
- Host large images, video, audio, PDFs, and archives outside Git.
- Add those external URLs to `index.html` through a pull request.

As a rough rule, commit optimized images under 500 KB. Avoid committing anything
over 5 MB unless there is a strong reason.

## Recommended Setup

Use an object-storage bucket on a custom media domain:

```text
https://media.cascade.camp/
```

Recommended first choice:

- Cloudflare R2 bucket
- Public access only through a custom domain, not the `r2.dev` development URL
- Cloudflare cache enabled for the custom domain
- Long cache headers for versioned filenames

This gives simple public URLs, fast edge delivery, and no database.

## Naming

Treat media URLs as immutable once linked from the site. Do not replace files at
the same URL.

Use dated, descriptive, versioned names:

```text
images/2026-landing-table-v1.webp
photos/2026-site-walkthrough-v1.jpg
video/2026-invitation-v1/poster.webp
video/2026-invitation-v1/manifest.m3u8
audio/2026-field-note-v1.mp3
```

If a file changes, upload a new filename:

```text
images/2026-landing-table-v2.webp
```

Then update the hard-coded link in a pull request. This keeps old pages,
reviews, and cached copies predictable.

## Upload Permissions

Do not give broad production overwrite/delete access to everyone.

Good trust model:

- Maintainers can upload to the production media bucket.
- Trusted contributors can upload to a staging bucket.
- An `incoming/` prefix is useful as a naming convention, but do not treat it as
  a hard permission boundary unless uploads go through a Worker or other small
  broker that enforces the prefix.
- Pull requests link proposed media URLs.
- A maintainer reviews the asset and either links it directly or copies it to a
  final immutable production path.

If using API tokens, create limited tokens for upload-only workflows. Avoid
tokens that can delete objects or edit account settings.

## Collaborator Path

This is the normal path for a trusted contributor:

1. Prepare the asset locally.
2. Name it with a dated, versioned filename.
3. Upload it to the media bucket through the Cloudflare dashboard or an
   S3-compatible tool.
4. Copy the public URL from the media domain.
5. Edit `index.html` or another static file to reference that URL.
6. Open a GitHub pull request.
7. A maintainer reviews the page change and the media URL before merging.

Cloudflare access options:

- Dashboard upload: add the collaborator as a Cloudflare account member with the
  Cloudflare R2 Admin role scoped as narrowly as your account plan allows.
- Tool/CLI upload: create an R2 API token with Object Read and Write access
  scoped to the specific bucket.
- Safer staging: give contributors access only to a staging bucket, then have a
  maintainer copy approved files to the production `media.cascade.camp` bucket.

The production public URL should only point at final approved files. Uploading a
file should not automatically publish it on the website; merging the GitHub PR
is the publishing step.

## Permissionless Uploads

For a future no-database upload flow, use provider-generated one-time upload
URLs rather than shared credentials.

Good patterns:

- Cloudflare Images Direct Creator Uploads for user-submitted images.
- Cloudflare Stream Direct Creator Uploads for user-submitted videos.
- Mux Direct Uploads for user-submitted videos.

These flows still need a tiny trusted endpoint or maintainer action to generate
the one-time upload URL, but contributors do not need the account API token.
Uploads should land in a draft, staging, or unlinked state. The site should only
reference the final media URL after a pull request review.

## Video

For video playback, prefer a video service over raw files:

- Cloudflare Stream for simple hosting, encoding, and embeds.
- Mux for polished playback, adaptive streaming, and analytics.
- YouTube or Vimeo for the lowest-maintenance public embed.

Use raw MP4/WebM from object storage only for short clips where you control the
exports. In that case, provide:

- A poster image.
- MP4/H.264 for broad compatibility.
- WebM/VP9 or AV1 when useful.
- Multiple sizes for anything longer than a small decorative clip.

## Review Checklist

Before linking externally hosted media:

- The contributor has permission to publish it.
- The URL is stable and not tied to a personal account that may disappear.
- The filename is versioned and should not be overwritten.
- The file is reasonably compressed.
- The PR shows where the URL is used.
