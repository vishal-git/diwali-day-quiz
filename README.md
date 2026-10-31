# Diwali Quiz 2026

A TV-legible quiz board for a living-room Diwali party. One host clicks through; the app serves questions and tracks only which ones have been played. No scores, no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test
npm run build && npm start   # production build served on $PORT (default 3000)
```

## Deploy on Railway

Connect this GitHub repo to a Railway service. Nixpacks detects Node and uses `railway.json`:
build `npm ci && npm run build`, start `npm start` (serves `dist/` on `$PORT`). No environment variables needed.

## Docs

- `docs/diwali_quiz_2026_v7.md` — the question bank
- `docs/diwali_quiz_build_brief.md` — behaviour brief
- `public/img/README.md` — asset checklist (posters, faces, photos)
