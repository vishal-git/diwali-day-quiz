import { Glyph } from '../components/Pips';

const TEAMS = ['Kids', 'Gentlemen', 'Ladies'];

function SwapMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 13 A10 10 0 0 1 24 9" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 3 L25 10 L18 9.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 19 A10 10 0 0 1 8 23" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M8 29 L7 22 L14 22.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DoubleMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <text x="16" y="24" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="Nunito, system-ui, sans-serif" fill="currentColor">×2</text>
    </svg>
  );
}
function DiyaMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 C12.5 9, 11 12.5, 16 18 C21 12.5, 19.5 9, 16 3 Z" fill="currentColor" />
      <path d="M4 19 Q16 16 28 19 L25 26 Q16 29 7 26 Z" fill="currentColor" />
    </svg>
  );
}

const CHIPS: { kind: 'swap' | 'hard' | 'double' | 'lucky'; label: string; sub: string; count: number; mark: JSX.Element }[] = [
  { kind: 'swap', label: 'Swap', sub: 'new question, same cell', count: 3, mark: <SwapMark /> },
  { kind: 'hard', label: 'Hard', sub: 'unlock a Hard question', count: 2, mark: <Glyph kind="hard" /> },
  { kind: 'double', label: 'Double', sub: 'or nothing · call it first', count: 1, mark: <DoubleMark /> },
  { kind: 'lucky', label: 'Lucky Diya', sub: 'random draw · +10', count: 1, mark: <DiyaMark /> },
];

/** #/tokens: print, cut out the discs, tape or glue them onto poker chips. Seven per team. */
export function Tokens() {
  return (
    <section className="tokens-page">
      <h1>Token labels</h1>
      <p className="lede">
        Print this page at 100% (no "fit to page"); each disc is 38 mm, the face of a standard poker chip. Cut them out, stick one on each chip
        with a glue stick or a loop of tape. Seven chips per team: three Swap, two Hard, one Double-or-nothing, one Lucky Diya.
        Press Ctrl+P / Cmd+P; Esc goes back.
      </p>
      {TEAMS.map((team) => (
        <div className="tchip-group" key={team}>
          <h2>{team}</h2>
          <div className="chips">
            {CHIPS.flatMap((c) => Array.from({ length: c.count }, (_, i) => (
              <div className={`tchip tchip-${c.kind}`} key={`${c.kind}-${i}`}>
                <span style={{ color: 'var(--chip)' }}>{c.mark}</span>
                <span className="tchip-label">{c.label}</span>
                <span className="tchip-sub">{c.sub}</span>
                <span className="tchip-team-name">{team}</span>
              </div>
            )))}
          </div>
        </div>
      ))}
    </section>
  );
}
