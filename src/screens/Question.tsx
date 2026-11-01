import { useCallback, useRef, useState } from 'react';
import type { Question as Q } from '../data/types';
import { cellLabel } from '../data/types';
import { CATEGORY_BY_ID } from '../data/categories';
import { useStageKeys } from '../hooks/useStageKeys';
import { OptionCards } from '../components/OptionCards';
import { HintCard } from '../components/HintCard';
import { StoryPage } from '../components/StoryPage';
import { SafeImage } from '../components/SafeImage';
import { RunChart } from '../components/RunChart';
import { GujaratMap } from '../components/GujaratMap';
import { VideoEmbed } from '../components/VideoEmbed';
import { Fireworks } from '../components/Fireworks';
import { useKey } from '../hooks/useKey';

type Stage = 'question' | 'options' | 'answer' | 'story';

interface Props {
  q: Q;
  via: 'board' | 'lucky' | 'swap';
  canSwap: boolean;
  onDone: (id: string) => void;
  onPass: (id: string) => void;
  onSwap: (id: string) => void;
  onAbandon: () => void;
}

export function Question({ q, via, canSwap, onDone, onPass, onSwap, onAbandon }: Props) {
  const hasMiddle = Boolean(q.options || q.hint);
  const stages: Stage[] = [
    'question',
    ...(hasMiddle ? (['options'] as Stage[]) : []),
    'answer',
    ...(q.story ? (['story'] as Stage[]) : []),
  ];
  const [i, setI] = useState(0);
  // Furthest stage reached: once the options or hint have been seen, Swap and Pass are off the table.
  const [seen, setSeen] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [celebrate, setCelebrate] = useState(false);
  const stage = stages[i];
  const locked = seen >= 1;
  const cat = CATEGORY_BY_ID[q.category];
  // Ignore a second advance within this window: a double-click or key bounce must never skip a stage.
  const lastMove = useRef(0);
  const DEBOUNCE_MS = 350;

  const next = useCallback(() => {
    const now = Date.now();
    if (now - lastMove.current < DEBOUNCE_MS) return;
    lastMove.current = now;
    if (i + 1 >= stages.length) onDone(q.id);
    else { setI(i + 1); setSeen((m) => Math.max(m, i + 1)); }
  }, [i, stages.length, onDone, q.id]);

  // The host taps the option a team called out. Wrong: grey it and wait for the next team.
  // Right: jump to the answer stage with fireworks. Either way this click never advances by itself.
  const pickOption = useCallback((k: number) => {
    if (stage !== 'options' || !q.options || wrong.includes(k)) return;
    lastMove.current = Date.now();
    if (q.answer === k) {
      const at = stages.indexOf('answer');
      setCelebrate(true); setI(at); setSeen((m) => Math.max(m, at));
    } else {
      setWrong((w) => [...w, k]);
    }
  }, [stage, q, wrong, stages]);
  useKey((e) => {
    if (stage !== 'options' || !q.options) return;
    const k = 'abcd'.indexOf(e.key.toLowerCase());
    const n = '1234'.indexOf(e.key);
    const idx = k >= 0 ? k : n;
    if (idx >= 0 && idx < q.options.length) pickOption(idx);
  }, [stage, q, pickOption]);
  const back = useCallback(() => { lastMove.current = Date.now(); setI((v) => Math.max(0, v - 1)); }, []);
  useStageKeys({ next, back, abandon: onAbandon });

  const showAnswer = stage === 'answer' || stage === 'story';
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <section className={`question type-${q.type} stage-${stage}`} onClick={next}>
      <header className="question-header" onClick={stop}>
        <span className="chip"><span aria-hidden="true">{cat.icon}</span> {cat.name}</span>
        <span className="qcode" title="question code">{q.code}</span>
        {via === 'lucky' && <span className="chip chip-lucky">🪔 Lucky Diya — {cat.name} · {cellLabel(q.mode, q.region)}</span>}
        {via === 'swap' && <span className="chip chip-swap">🔄 Swapped</span>}
        <span className={`chip ${q.mode.startsWith('hard') ? 'chip-hard' : ''}`}>{cellLabel(q.mode, q.region)}</span>
      </header>

      {celebrate && stage === 'answer' && <Fireworks />}
      {stage === 'story' ? (
        <StoryPage q={q} />
      ) : (
        <div className="question-body fade-in" key={stage}>
          <p className={`question-text ${q.type === 'emoji' ? 'question-emoji' : ''}`}>{q.question}</p>

          {q.media && <SafeImage className="question-image" src={q.media.src} alt={q.media.alt} />}
          {q.type === 'map' && <GujaratMap filled={false} />}
          {q.type === 'chart' && q.chart && <RunChart bars={q.chart.bars} revealNames={showAnswer} unit={q.chart.unit} />}
          {q.type === 'video' && q.video && <VideoEmbed youtubeId={q.video.youtubeId} start={q.video.start} title={q.answerText} />}

          {stage !== 'question' && q.type === 'riddle' && q.hint && <HintCard hint={q.hint} />}
          {stage !== 'question' && q.options && (
            <OptionCards q={q} showAnswer={showAnswer} wrong={wrong} celebrate={celebrate} onPick={stage === 'options' ? pickOption : undefined} />
          )}

          {showAnswer && (
            <div className="answer-block">
              {(q.type === 'riddle' || q.type === 'chart') && <p className="answer-text">{q.answerText}</p>}
              {q.reveal && <p className="reveal">{q.reveal}</p>}
            </div>
          )}
        </div>
      )}

      <footer className="host-bar" onClick={stop}>
        <span className="stage-dots" aria-label={`stage ${i + 1} of ${stages.length}`}>
          {stages.map((s, k) => <i key={s} className={k <= i ? 'on' : ''} />)}
        </span>
        <span className="host-buttons">
          {locked && <span className="host-note">locked once the options show</span>}
          <button className="btn-muted" disabled={!canSwap || locked} onClick={() => onSwap(q.id)}>
            🔄 Swap{!canSwap && ' · no spares'}
          </button>
          <button className="btn-muted" disabled={locked} onClick={() => onPass(q.id)}>Pass ↩</button>
        </span>
      </footer>
    </section>
  );
}
