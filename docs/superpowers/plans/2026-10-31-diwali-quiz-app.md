# Diwali Quiz 2026 Web App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page, TV-legible quiz board that serves the 121-question Diwali 2026 bank to a host, tracks only which questions are used/burned, and deploys to Railway as a static site.

**Architecture:** Vite + React + TypeScript SPA. The question bank is a hand-converted `questions.json` bundled into the app. Game state is `{used: string[], burned: string[]}` persisted to localStorage; every count is derived by pure functions in `src/state/game.ts`, which are unit-tested with Vitest. Screens are a small state machine (`opening | board | pick | lucky | question`) held in `App.tsx`; a hash route `#/answers` renders the host cheat sheet. The production build is served by the `serve` package on Railway.

**Tech Stack:** Node 20, Vite 6, React 18, TypeScript, Vitest + @testing-library/react + jsdom, @fontsource fonts (bundled), `serve` for Railway. No backend.

**Spec:** `docs/diwali_quiz_build_brief.md` (behaviour) + `docs/diwali_quiz_2026_v7.md` (content). Bank content wins on content; brief wins on behaviour.

## Global Constraints

- One click anywhere / Space / → advances the question screen; Backspace / ← steps back one stage; Esc returns to board without consuming.
- The app never scores and never records answers given. State is only `used` and `burned` sets.
- Persist to localStorage key `diwali-quiz-2026`; "Reset game" asks for confirmation.
- Minimum body text on the question screen: 40px at 1080p. Dark indigo `#1a1035` background, marigold `#f4a300`, gold, magenta accent, cream text. No white backgrounds.
- Fonts and images bundled; no network needed at party time except the one YouTube embed (9.2).
- Spares (`live: false`) are reachable only via Swap. Lucky Diya draws only live, unplayed questions from categories 1–9.
- Hard has no region. Diwali has no spares.
- Random seed 314 for every seeded RNG (tests and the runtime Lucky spin/chart shuffle).
- Asset filenames under `public/img/` keyed by question id, e.g. `5.4-kohli-then.jpg`, `5.4-opt-rohit.jpg`.

## Review Focus

1. Corrupt or foreign JSON in localStorage → app loads with an empty game, never a white screen. (Task 3 test.)
2. Clicking Swap / Pass / Back buttons must not also advance the stage via the "click anywhere" handler. (Task 6 test.)
3. Esc or browser refresh mid-question must not consume the question; only completing the sequence or Pass marks it used. (Task 3 + Task 6 tests.)
4. Lucky Diya when every live question is played → tile disabled, no crash on empty pool. (Task 3 test.)
5. A referenced image that is missing from `public/img/` → a styled placeholder with the alt text, never a broken-image icon on the TV. (Task 5 test.)

---

### Task 1: Project scaffold, theme tokens, Railway config

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx` (placeholder), `src/styles/tokens.css`, `src/styles/global.css`, `railway.json`, `.gitignore`, `README.md`
- Test: `src/smoke.test.tsx`

**Interfaces:**
- Produces: CSS custom properties `--bg #1a1035`, `--bg-raised #261a4d`, `--marigold #f4a300`, `--gold #ffd166`, `--magenta #e0409a`, `--cream #fff4e0`, `--muted #9a8fb8`; font families `--font-display` (Fraunces) and `--font-body` (Nunito); `npm run dev|build|test|start`.

- [ ] Step 1: `npm create vite@latest . -- --template react-ts` equivalent by hand (package.json with react 18, vite 6, typescript, vitest, jsdom, @testing-library/react, @testing-library/user-event, @fontsource/fraunces, @fontsource/nunito, serve). `"start": "serve -s dist -l ${PORT:-3000}"`.
- [ ] Step 2: `railway.json` with `build.builder: NIXPACKS`, `deploy.startCommand: npm start`. `.gitignore` for node_modules, dist.
- [ ] Step 3: `tokens.css` with the palette above; `global.css` sets `body { background: var(--bg); color: var(--cream); font-family: var(--font-body); }`, `html { font-size: 20px }` so `2rem` = 40px at 1080p.
- [ ] Step 4: Write `smoke.test.tsx` asserting `render(<App/>)` shows text "Happy Diwali".
- [ ] Step 5: `npm install && npm test` → PASS; `npm run build` → dist produced.
- [ ] Step 6: Commit `chore: scaffold vite react app with theme tokens and railway config`.

### Task 2: Question bank JSON + schema validation

**Files:**
- Create: `src/data/types.ts`, `src/data/questions.json`, `src/data/categories.ts`
- Test: `src/data/questions.test.ts`

**Interfaces:**
- Produces:
  ```ts
  type Mode = 'kids' | 'adult' | 'hard-kids' | 'hard-adult';
  type Region = 'us' | 'india' | null;
  type CategoryId = 'geography'|'movies'|'local'|'diwali'|'celebrity'|'riddles'|'food'|'sports'|'growing-up';
  type QType = 'text'|'emoji'|'image'|'riddle'|'chart'|'video';
  interface Question { id; category: CategoryId; mode; region; live: boolean; type: QType;
    question: string; media?: {src: string; alt: string}; options?: string[]; optionMedia?: string[];
    hint?: string; answer: number | string; answerText: string; reveal?: string;
    story?: { title: string; image?: string; graphic?: 'statue'|'map-gujarat'|'run-chart'; lines: string[] };
    mustPlay?: boolean; video?: { youtubeId: string; start: number };
    chart?: { bars: { label: string; value: number }[] } }
  const CATEGORIES: { id: CategoryId; name: string; icon: string }[]  // order = bank order 1..9
  ```
- Encoded decisions: 3.S2 (true/false) gets `options: ["True","False"]`, answer 1. 2.2 and 2.S1 emoji questions are `type: 'emoji'` with the bank's options (2.S1 given options: 3 Idiots / Taare Zameen Par / Munna Bhai MBBS / PK). Riddles: `answer` is the answer text, `hint` set. 2.1 reveal uses domestic grosses: Spider-Man $958.8M · Toy Story 5 $480.3M · Super Mario Galaxy $429.8M · Michael $372.3M (Box Office Mojo, Oct 29 2026). 8.10 chart bars (bank's five names): Tendulkar 34,357 · Sangakkara 28,016 · Kohli 28,215 (mid-2026, still rising) · Ponting 27,483 · Kallis 25,534; bar order shuffled with seed 314. 9.2 video `{youtubeId: "XqZsoesa55w", start: 0}`. Story pages on 3.3 (graphic statue), 4.9 (image `img/4.9-usps-diwali-stamp.jpg`), 7.10 (lines), 8.10 (graphic run-chart), 1.S1 (graphic map-gujarat), 8.5 (lines). `mustPlay: true` on 3.3 only. Media/optionMedia paths follow the id-keyed naming rule even where the file is not yet present.

- [ ] Step 1: Write `questions.test.ts`: total 121; live 101; spares 20; for each of the 8 regular categories live counts are kids/us 2, kids/india 2, adult/us 2, adult/india 2, hard-kids 1, hard-adult 1; diwali live counts kids/india 4, adult/india 4, adult/us 1, hard-kids 1, hard-adult 1, spares 0; every hard question has `region === null`; every non-riddle has 2–4 options and numeric `answer` within range; every riddle has `hint` and string `answer`; ids unique; every `movies` question with options has `optionMedia` of equal length; every `celebrity` question with options has `optionMedia`.
- [ ] Step 2: Run → FAIL (file missing).
- [ ] Step 3: Author `types.ts`, `categories.ts`, and `questions.json` from the bank, one record per question including spares.
- [ ] Step 4: Run → PASS.
- [ ] Step 5: Commit `feat: add question bank json and schema tests`.

### Task 3: Game state logic + persistence

**Files:**
- Create: `src/state/game.ts`, `src/state/storage.ts`, `src/state/rng.ts`
- Test: `src/state/game.test.ts`, `src/state/storage.test.ts`

**Interfaces:**
- Produces:
  ```ts
  interface GameState { used: string[]; burned: string[] }
  const EMPTY: GameState
  function mulberry32(seed: number): () => number          // rng.ts, default seed 314
  function shuffle<T>(xs: T[], rng: () => number): T[]
  type Cell = { category: CategoryId; mode: Mode; region: Region }
  function isAvailable(q, s): boolean                      // live && !used && !burned
  function remainingIn(qs, s, cell): Question[]            // live only
  function spareFor(qs, s, cell): Question | undefined     // first !live, unused, unburned in cell
  function cellCounts(qs, s, category): { kidsUs; kidsIndia; adultUs; adultIndia; hardKids: boolean; hardAdult: boolean; total }
  function luckyPool(qs, s): Question[]                    // live, available, all categories
  function markUsed(s, id): GameState; function markBurned(s, id): GameState
  function loadState(): GameState; function saveState(s): void; function clearState(): void   // storage.ts
  ```

- [ ] Step 1: Tests: `remainingIn` for geography kids/us returns 1.1 and 1.2 on EMPTY; after `markUsed('1.1')` returns only 1.2; `spareFor` geography kids/us returns 1.S1 (kids spare, region-agnostic → spares match on category+mode only, region ignored); `spareFor` diwali anything → undefined; `cellCounts(diwali)` on EMPTY → total 11, hardKids true; `luckyPool` never contains `live:false`; `luckyPool` with all 101 live ids used → `[]`; `mulberry32(314)` yields the same first three values on two calls; `markUsed` is idempotent.
- [ ] Step 2: Storage tests: `loadState()` with `localStorage` holding `"not json"` → EMPTY; holding `{"used":"x"}` → EMPTY; round-trip save/load.
- [ ] Step 3: Run → FAIL. Implement. Run → PASS.
- [ ] Step 4: Commit `feat: game state derivation and localStorage persistence`.

### Task 4: Opening screen + Board + Pick screen

**Files:**
- Create: `src/screens/Opening.tsx`, `src/screens/Board.tsx`, `src/components/Tile.tsx`, `src/screens/Pick.tsx`, `src/components/ResetButton.tsx`, `src/state/useGame.ts`
- Modify: `src/App.tsx`
- Test: `src/screens/Board.test.tsx`, `src/screens/Pick.test.tsx`

**Interfaces:**
- `useGame(): { state, markUsed(id), markBurned(id), reset() }` wraps `useState` + `saveState` on every change.
- `App` screen union: `{kind:'opening'} | {kind:'board'} | {kind:'pick', category} | {kind:'lucky'} | {kind:'question', q: Question, via: 'board'|'lucky'|'swap'}`.
- `Tile` props: `{ category, counts, onClick, featured?: boolean, mustPlayPending: boolean }`; renders `Kids N · Adult N · Hard 🔥🔥` with used flames at opacity .3 and `aria-label` "used".
- Board grid: 3 columns × 4 rows at ≥1280px; Diwali tile `grid-column: 2; grid-row: 2` spanning 1 cell at 1.5× badge scale with glow pulse; Lucky tile last. Footer: `Reset game` + `questions played: N`.
- Pick: mode row (Kids / Adult / Hard); region row (US / India) when Kids/Adult; Hard row (Hard·Kids / Hard·Adult) when Hard. Disabled buttons show `(0 left)`. Back button.

- [ ] Step 1: Board tests: renders 10 tiles; geography tile text contains "Kids 4 · Adult 4"; with all geography ids used the tile has `aria-disabled="true"`; Reset click opens a confirm (use `window.confirm` mocked) and clears state when confirmed.
- [ ] Step 2: Pick tests: choosing Kids then US calls `onPick({category:'geography', mode:'kids', region:'us'})`; Hard shows Hard·Kids/Hard·Adult and no region; a cell with 0 remaining renders a disabled button.
- [ ] Step 3: Implement; Opening with "Happy Diwali" title, diya SVG with CSS flicker, floating sparks, Begin button; Enter/Space begins.
- [ ] Step 4: Tests PASS; `npm run dev` and eyeball board at 1920×1080.
- [ ] Step 5: Commit `feat: opening, board, and pick screens`.

### Task 5: Media components (placeholder-safe image, chart, statue, map, video)

**Files:**
- Create: `src/components/SafeImage.tsx`, `src/components/RunChart.tsx`, `src/components/StatueCompare.tsx`, `src/components/GujaratMap.tsx`, `src/components/VideoEmbed.tsx`, `public/img/README.md` (asset checklist), `public/img/india-states.svg` (if sourced)
- Test: `src/components/SafeImage.test.tsx`, `src/components/RunChart.test.tsx`

**Interfaces:**
- `SafeImage({src, alt, className})`: renders `<img>`; on `onError` swaps to a `<div class="img-placeholder">` showing `alt` and "📷 image pending".
- `RunChart({bars, revealNames: boolean})`: SVG bar chart, bars in the given order, labels `A–E` when hidden, names + totals when revealed.
- `StatueCompare()`: SVG with four proportional silhouettes/bars at 182 / 128 / 93 / 38 m, labelled.
- `GujaratMap({filled: boolean})`: India outline with Gujarat highlighted when filled. Source a public-domain India states SVG from Wikimedia at build time; fall back to a simplified hand-drawn Gujarat outline if unavailable.
- `VideoEmbed({youtubeId, start})`: iframe `https://www.youtube-nocookie.com/embed/{id}?start={start}&autoplay=0`; wrapper `stopPropagation` on click.

- [ ] Step 1: SafeImage test: fire `error` on the img → placeholder text with alt visible. RunChart test: hidden mode shows no "Tendulkar"; revealed shows "Tendulkar" and "34,357".
- [ ] Step 2: Implement; try `curl` for the Wikimedia India map; write asset checklist README with every expected filename.
- [ ] Step 3: Tests PASS. Commit `feat: media components with placeholder fallback`.

### Task 6: Question screen with stage sequence, Swap, Pass, Story

**Files:**
- Create: `src/screens/Question.tsx`, `src/components/OptionCards.tsx`, `src/components/HintCard.tsx`, `src/components/StoryPage.tsx`, `src/hooks/useStageKeys.ts`
- Modify: `src/App.tsx`
- Test: `src/screens/Question.test.tsx`

**Interfaces:**
- `Question({ q, via, luckyLabel?, canSwap: boolean, onDone(id), onPass(id), onSwap(id), onAbandon() })`.
- Stages: `['question','options','answer', ...(q.story ? ['story'] : [])]`; advancing past the last calls `onDone(q.id)`.
- Keys: Space/ArrowRight/click on root advance; Backspace/ArrowLeft back (no-op at stage 0); Escape → `onAbandon()`. Host buttons and the video wrapper call `stopPropagation`.
- Chips: category top-left; mode/region top-right (`Adult · India`, `Hard·Kids`); Lucky adds `🪔 Lucky Diya — Sports · Hard·Adult`.
- Options render: movies → poster `SafeImage` cards with title; celebrity → face `SafeImage` with name; riddles → `HintCard`; else text cards A–D. Answer stage: correct card gets class `correct`, others `dim`; `reveal` text under. Chart questions: `RunChart revealNames={stage>=answer}`. Image questions: `SafeImage` under text. Emoji: question text at 6rem.
- Text sizes: question `clamp(2rem, 3.2vw, 3.4rem)` (≥40px at 1080p); options ≥ 2rem.

- [ ] Step 1: Tests: renders question text and not options at stage 0; one click shows options; second shows the answer card with class `correct`; for a question with a story, third click shows story title, fourth calls `onDone`; for one without, third click calls `onDone`; Escape calls `onAbandon` and never `onDone`; Backspace from options returns to question; clicking the Swap button calls `onSwap` and stage stays 0; Swap disabled with text "no spares" when `canSwap=false`; Pass calls `onPass`.
- [ ] Step 2: Run → FAIL. Implement Question screen, OptionCards, HintCard, StoryPage (full-bleed image or graphic, title, lines), useStageKeys.
- [ ] Step 3: Wire in `App.tsx`: pick → `remainingIn(cell)[0]`; onDone/onPass → `markUsed`, back to board; onSwap → `markBurned(id)` then show `spareFor(cell)` with `via:'swap'`; onAbandon → board with no state change.
- [ ] Step 4: Tests PASS. Commit `feat: question screen with click sequence, swap, pass, story page`.

### Task 7: Lucky Diya spin

**Files:**
- Create: `src/screens/Lucky.tsx`
- Modify: `src/App.tsx`, `src/screens/Board.tsx`
- Test: `src/screens/Lucky.test.tsx`

**Interfaces:**
- `Lucky({ pool: Question[], rng, onLand(q), durationMs = 2200 })`: cycles the nine category icons every 90ms, slowing (ease-out) over `durationMs`, then calls `onLand(pool[floor(rng()*pool.length)])`. Board's Lucky tile disabled when `luckyPool` is empty.
- App creates `const rng = mulberry32(314)` once per load.

- [ ] Step 1: Test with fake timers: after `durationMs` `onLand` called once with a member of `pool`; with seed 314 and a fixed pool the chosen id is deterministic (assert equality with the value computed by `mulberry32(314)()`).
- [ ] Step 2: Implement; the landing question opens `Question` with `via:'lucky'` and the lucky chip.
- [ ] Step 3: Tests PASS. Commit `feat: lucky diya roulette`.

### Task 8: Host cheat sheet route, fullscreen toggle, final polish

**Files:**
- Create: `src/screens/Answers.tsx`
- Modify: `src/App.tsx`, `src/styles/global.css`
- Test: `src/screens/Answers.test.tsx`

- [ ] Step 1: Test: `Answers` renders 121 rows, each with id, question, answerText; grouped by category.
- [ ] Step 2: Implement `#/answers` hash route (read `location.hash` on load + `hashchange`); `F` key toggles `document.documentElement.requestFullscreen()`; fade transition between stages (`.fade-in` 200ms); glow pulse on Diwali tile; `prefers-reduced-motion` disables animations.
- [ ] Step 3: `npm run build`, `npm start`, open with a 1920×1080 viewport and screenshot the board and a question at each stage (Playwright via `npx playwright` or the `run` skill) to verify 40px minimum.
- [ ] Step 4: Commit `feat: answers sheet, fullscreen, polish`.

### Task 9: Push to GitHub for Railway

- [ ] Step 1: Remote `origin` = `https://github.com/vishal-git/diwali-day-quiz.git`; push `main` after every task.
- [ ] Step 2: README documents Railway: connect the GitHub repo, Nixpacks builds with `npm run build`, start command `npm start` (reads `$PORT`).
- [ ] Step 3: Verify the production build locally: `npm run build && PORT=4173 npm start` → `curl localhost:4173` returns HTML containing "Diwali".
