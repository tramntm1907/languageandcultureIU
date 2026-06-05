# Language and Culture Learning Ecosystem

A polished static course portal for GitHub Pages.

## What is included

- Beautiful landing page with background design
- Four course modules
- Video areas
- Reading materials
- Quiz with validation
- Progress tracking using localStorage
- Certificate generation after 70% quiz score
- Print / Save certificate as PDF

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this package.
3. Open repository **Settings**.
4. Go to **Pages**.
5. Choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
6. Save.
7. Wait 1–2 minutes. GitHub will generate your website link.

## Important: Fixing video links

YouTube normal links do not work directly inside iframe.

Use this format:

```html
https://www.youtube.com/embed/VIDEO_ID
```

Example:

Normal YouTube link:

```html
https://www.youtube.com/watch?v=abc123
```

Embed link:

```html
https://www.youtube.com/embed/abc123
```

Replace the `src` inside `index.html`.

## How to edit quiz answers

In `script.js`, edit:

```javascript
const answers = {
  q1: "b",
  q2: "a",
  q3: "b",
  q4: "b",
  q5: "b"
};
```

Make sure each question in `index.html` has the same name: q1, q2, q3, etc.

## Limitation

This is a static website. It does not save student data to a teacher database.

For real student accounts, teacher dashboard, verified certificates, and saved scores, upgrade to Firebase or Supabase.
