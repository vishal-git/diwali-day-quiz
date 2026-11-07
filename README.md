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
| Click an option card, or A–D / 1–4 | the answer a team called out. Wrong: the card greys out and its diya is snuffed; the right answer stays hidden so the next team can try. If the question carries a note for that option (35 do, e.g. "Alaska does not share a border with any other US state"), it appears under the cards. Right: fireworks, answer revealed |
| Backspace, ← | step back one stage |
| Esc | leave the question without consuming it |
| F | toggle fullscreen |
| Swap (bottom right) | burn this question, draw a spare from the same category and mode. Only while the question alone is showing |
| Pass (bottom right) | mark used and return to the board. Only while the question alone is showing; once options or a hint appear, both lock |
| `#/answers` in the address bar | host cheat sheet for the paper scorer (print-friendly) |
| `#/tokens` in the address bar | printable 38 mm token labels (3 Swap, 2 Hard, 1 Double, 1 Lucky Diya per team) to stick on poker chips; print at 100% |
| `#/rules` in the address bar (also linked from the opening screen and board footer) | house rules for the TV: the three teams, a turn, tokens, Lucky Diya and the starting-hand scoring |
| Reset game (board footer) | clears played/burned state after a confirm |

Board tiles show one glyph per question: a balloon for kids, a head-and-shoulders figure for adult, a flame for hard. A glyph goes dark when that question has been played. The Which-side step shows only the US and India flags, with the category and mode breadcrumbed in the top-left chip.

## Question codes

Every question has a host-facing code shown in the question header and on the `#/answers` sheet, derived from its cell so it never drifts from the data:

```
CATEGORY-MODE-SCOPE-N      e.g.  GEO-K-US-1   DIW-A-H-1   LOC-A-S-2
```

| Part | Values |
|---|---|
| CATEGORY | GEO geography · MOV movies & TV · LOC local · DIW diwali · CEL celebrity · RID riddles · FOO food · SPO sports · GRW growing up |
| MODE | K kids · A adult |
| SCOPE | US · IN · H (hard, no region) · S (spare, only reachable by Swap) |
| N | position within that group, in bank order |

The bank's own numbers (`1.1`, `4.S2`) are still the `id` in `src/data/questions.json` and are listed beside the code on the answers sheet. `#/q/<code>` and `#/q/<id>` both open a question directly.

State lives in the browser's localStorage under `diwali-quiz-2026`, so a refresh keeps the board.

## Assets

All but two pictures are in `public/img/` (sources and licences in `public/img/CREDITS.md`); anything missing shows a labelled "image pending" card so the game still runs. The Richmond map (3.1) is stitched from OpenStreetMap tiles with the Fan outlined; the skyline (3.5) is a Commons photo with an arrow drawn on the Federal Reserve.

## Docs

- `docs/diwali_quiz_2026_v8.md` — the question bank (source of truth for content). `v7.md` is kept unchanged; v8 ends with the nine questions retired on 7 Nov 2026
- `docs/diwali_quiz_build_brief.md` — behaviour brief
- `docs/superpowers/plans/2026-10-31-diwali-quiz-app.md` — implementation plan
- `src/data/questions.json` — the bank converted to data (110 records: 91 live, 19 spares)
