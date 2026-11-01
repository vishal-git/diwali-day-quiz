# Diwali Quiz 2026

A TV-legible quiz board for a living-room Diwali party. One host clicks through; the app serves questions and remembers only which ones have been played. No scores, no backend, no login.

## Run locally

```bash
npm install
npm run dev                  # http://localhost:5173
npm test                     # vitest
npm run build && npm start   # production build served on $PORT (default 3000)
```

## Deploy on Railway

Connect the GitHub repo `vishal-git/diwali-day-quiz` to a Railway service. `railway.json` tells Nixpacks to build with `npm run build` and start with `npm start`, which serves `dist/` on Railway's `$PORT` (Railway injects 8080). No environment variables are needed.

When generating the public domain, set its **target port to 8080**. Railway guesses 5173 (Vite's dev port) otherwise and the domain returns 502. To fix an existing domain: `railway domain update <domain> --port 8080`.

Live: https://diwali-day-quiz-production.up.railway.app

## Host controls

| Key / click | Does |
|---|---|
| Click anywhere, Space, →, Enter | advance: question → options → answer → story (if any) → board |
| Click an option card, or A–D / 1–4 | the answer a team called out. Wrong: the card greys out and its diya is snuffed; the right answer stays hidden so the next team can try. Right: fireworks, answer revealed |
| Backspace, ← | step back one stage |
| Esc | leave the question without consuming it |
| F | toggle fullscreen |
| Swap (bottom right) | burn this question, draw a spare from the same category and mode. Only while the question alone is showing |
| Pass (bottom right) | mark used and return to the board. Only while the question alone is showing; once options or a hint appear, both lock |
| `#/answers` in the address bar | host cheat sheet for the paper scorer (print-friendly) |
| Reset game (board footer) | clears played/burned state after a confirm |

Board tiles show one icon per question (🧒 kids, 🧑 adult, 🔥 hard); an icon dims when that question has been played. The Which-side step shows the US and India flags, with the category and mode breadcrumbed in the top-left chip.

State lives in the browser's localStorage under `diwali-quiz-2026`, so a refresh keeps the board.

## Assets

Posters, celebrity photos and food photos are not in the repo. Drop them into `public/img/` using the filenames listed in `public/img/README.md`; anything missing shows a labelled "image pending" card so the game still runs.

## Docs

- `docs/diwali_quiz_2026_v7.md` — the question bank (source of truth for content)
- `docs/diwali_quiz_build_brief.md` — behaviour brief
- `docs/superpowers/plans/2026-10-31-diwali-quiz-app.md` — implementation plan
- `src/data/questions.json` — the bank converted to data (110 records: 91 live, 19 spares)
