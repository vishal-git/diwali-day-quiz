# Diwali Quiz 2026 — Web App Build Brief

Companion to `diwali_quiz_2026_v7.md` (the question bank). This brief says what to build; the bank says what to show. Where they disagree, the bank's content wins and this brief's behaviour wins.

## Context
- Host runs it from a laptop plugged into a TV. One screen, one operator (the host), ~14 people watching from a couch. Everything must be legible from across a living room: big type, high contrast, few words per screen.
- Three teams (Men, Women, Kids) answer out loud. **The app never scores and never knows the answer given.** Scoring, tokens and penalties live on paper; the app only serves questions and keeps counts.
- Rules may change on the night. Nothing in the app should enforce a rule the host might want to bend.
- Local-only, no backend, no login. Must survive a browser refresh (persist state in localStorage) and have a clearly labelled "Reset game" that asks for confirmation.
- Vite + React (or plain HTML/JS if simpler) — host's choice. Single-page. No build-time dependency on the network at party time: bundle fonts and images.

## Screens and flow

### 1. Opening screen
Full-screen "Diwali 2026" / "Happy Diwali" title with a lit-diya motif and a subtle ambient animation (floating sparks, slow flicker). One button: **Begin**. Keyboard: Enter/Space also begins.

### 2. Board (the main page)
Ten tiles in a grid: the nine categories plus **Lucky Diya 🪔**. Each category tile shows:
- an icon (see icon list below) and the category name
- a compact counter of what's left: `Kids 4 · Adult 4 · Hard 🔥🔥` — the hard flames show as lit (available) or greyed (used), one each for Hard·Kids and Hard·Adult
- Diwali tile is visually distinct (centre of grid, 1.5× badge) and lists its own counts
- A tile with nothing left dims and becomes unclickable

Small, unobtrusive footer: Reset game.

### 3. Pick filters (after clicking a category)
A modal or sub-screen with large buttons:
- Mode: **Kids** / **Adult** / **Hard**
- If Kids or Adult: Region: **US** / **India**
- If Hard: **Hard·Kids** / **Hard·Adult** (no region)
Buttons for cells with zero remaining are disabled with the count shown. Back button returns to the board.

### 4. Question screen (the host's click sequence)
The whole screen advances on **one click anywhere / Space / →**; **Backspace / ←** steps back one stage; **Esc** returns to board without consuming the question (host changed their mind).

Stages:
1. **Question** — large text, category chip top-left, mode/region chip top-right (e.g. "Adult · India"). For image questions show the image under the text. For the emoji questions show the emojis huge. For the chart question render the chart. For the Baby Shark clip show an embedded YouTube iframe with a play button (autoplay off; host presses play).
2. **Options / Hint** — four options as large cards (A–D). Movies: options rendered as posters. Celebrity: options rendered as current-day face photos with the name underneath. Riddles: a single hint card instead of options.
3. **Answer** — correct option highlighted; any "Reveal" figures or notes from the bank shown under it (e.g. all four population numbers, the four border lengths).
4. **Story page (only for questions that have one)** — a full-screen, magazine-style page: one image, a short title, one or two lines of explanation. Then one more click returns to the board.
5. Back to board with that cell's counter decremented.

On the question screen, two small host-only buttons (bottom corner, muted styling):
- **Swap** — marks this question as burned and draws a *spare* from the same cell, if one exists. If no spare, button is disabled with "no spares".
- **Pass** — returns to the board and marks the question as used without showing the answer. (Host may prefer to show the answer anyway; that's their call — the answer stage still works before pressing Pass.)

### 5. Lucky Diya
Clicking the Lucky tile plays a short animation — a diya spinning / a flame roulette cycling through the nine category icons for ~2 seconds, slowing to a stop — then lands on a random **unplayed live** question from any category, any mode (Hard included), any region. Reveal the category with the question (a "🪔 Lucky Diya — Sports · Hard·Adult" chip). It then follows the normal question flow and decrements that cell. Spares are never drawn by Lucky. The Lucky tile itself has no counter; the host tracks "one per team" on paper.

## Data model
Convert the bank into `questions.json`. One record per question:

```json
{
  "id": "3.10",
  "category": "local",
  "mode": "hard-adult",          // kids | adult | hard-kids | hard-adult
  "region": "us",                // us | india | null (for hard)
  "live": true,                  // false = spare (only reachable via Swap)
  "type": "text",                // text | emoji | image | riddle | chart | video
  "question": "…",
  "media": { "src": "img/…", "alt": "…" },        // optional
  "options": ["…","…","…","…"],   // omitted for riddles
  "optionMedia": ["img/…", …],   // posters / faces, optional
  "hint": "…",                   // riddles only
  "answer": 1,                   // index into options; riddles: answer text
  "answerText": "…",             // the bold answer as written in the bank
  "reveal": "…",                 // host note / figures shown on the answer stage, optional
  "story": {                     // optional — triggers the story page
    "title": "…",
    "image": "img/…",
    "lines": ["…", "…"]
  },
  "mustPlay": false              // ⭐ in the bank; render a small star on the tile until played
}
```

Game state (persisted): `used: Set<id>`, `burned: Set<id>`, plus nothing else. Counts are derived.

### Questions that get a story page
- 3.3 Statue of Unity → height comparison graphic (Unity 182 m · Spring Temple Buddha 128 m · Liberty 93 m with pedestal · Christ the Redeemer 38 m)
- 4.9 USPS Diwali stamp → the stamp image, one line on the 2016 issue
- 7.10 Rasgulla → the Puri vs Kolkata story, two GI tags (text is in the bank's reveal)
- 8.10 Run-scorers chart → the chart with names revealed
- 1.S1 / any map question → the state filled in on the India map
- 8.5 Super Bowl LX → one line, Seahawks 29–13, Walker MVP (optional)
Anything else with a long "Reveal" note stays on the answer stage; no story page.

## Category icons (emoji is fine; SVG if you want polish)
Geography 🌍 · Movies & TV 🎬 · Local 🏛️ · Diwali 🪔 · Celebrity ⭐ · Riddles 🧩 · Food 🍛 · Sports 🏏 · Growing Up 📼 · Lucky Diya 🎲 (or a second 🪔 with a sparkle)

## Visual direction
- Palette: deep indigo/night (#1a1035-ish) background, marigold (#f4a300) and warm gold accents, a touch of magenta/pink for Diwali, cream text. Avoid white backgrounds; this is projected in a dim room.
- Typography: a display serif or rounded display face for titles (bundle it), a clean sans for body. Minimum body size on the question screen: 40px at 1080p.
- Motion: subtle and few — diya flicker on the opening screen, a soft glow pulse on the Diwali tile, the Lucky spin, a gentle fade between stages. No motion that distracts from reading.
- Tiles: generous padding, rounded, soft inner glow on hover/focus; used-up tiles desaturate rather than disappear.
- Answer highlight: gold outline + glow on the correct card; wrong cards dim.

## Assets to gather (checklist, see bank's Media checklist for question numbers)
- Movie posters for every Movies option (fair-use thumbnail size)
- Current-day face photos for every Celebrity option; "then" photos for the question itself
- Food photos: mithai plate with kaju katli circled, vada pav, jalebi
- Gujarat outline (unlabelled) + filled map for reveal
- USPS 2016 Diwali stamp
- Statue comparison graphic (can be drawn in CSS/SVG from the four heights)
- Run-scorers bar chart (render in code from a small data table; names hidden until reveal)
- Baby Shark YouTube ID with start timestamp
Put everything under `public/img/` with the question id in the filename (e.g. `5.4-kohli-then.jpg`, `5.4-opt-rohit.jpg`).

## Nice-to-haves, only if cheap
- A tiny "questions played: 23" count in the footer
- Fullscreen toggle (F)
- A hidden host cheat-sheet route `/answers` listing every question with its answer, for the paper scorer

## Out of scope
Scores, timers, team names, token tracking, sound effects beyond the Baby Shark embed.
