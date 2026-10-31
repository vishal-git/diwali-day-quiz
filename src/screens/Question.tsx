import { useCallback, useState } from 'react';
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
  const stages: Stage[] = ['question', 'options', 'answer', ...(q.story ? (['story'] as Stage[]) : [])];
  const [i, setI] = useState(0);
  const stage = stages[i];
  const cat = CATEGORY_BY_ID[q.category];

  const next = useCallback(() => {
    if (i + 1 >= stages.length) onDone(q.id);
    else setI(i + 1);
  }, [i, stages.length, onDone, q.id]);
  const back = useCallback(() => setI((v) => Math.max(0, v - 1)), []);
  useStageKeys({ next, back, abandon: onAbandon });

  const showAnswer = stage === 'answer' || stage === 'story';
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <section className={`question type-${q.type} stage-${stage}`} onClick={next}>
      <header className="question-header" onClick={stop}>
        <span className="chip"><span aria-hidden="true">{cat.icon}</span> {cat.name}</span>
        {via === 'lucky' && <span className="chip chip-lucky">🪔 Lucky Diya — {cat.name} · {cellLabel(q.mode, q.region)}</span>}
        {via === 'swap' && <span className="chip chip-swap">🔄 Swapped</span>}
        <span className={`chip ${q.mode.startsWith('hard') ? 'chip-hard' : ''}`}>{cellLabel(q.mode, q.region)}</span>
      </header>

      {stage === 'story' ? (
        <StoryPage q={q} />
      ) : (
        <div className="question-body fade-in" key={stage}>
          <p className={`question-text ${q.type === 'emoji' ? 'question-emoji' : ''}`}>{q.question}</p>

          {q.type === 'image' && q.media && <SafeImage className="question-image" src={q.media.src} alt={q.media.alt} />}
          {q.type === 'map' && <GujaratMap filled={false} />}
          {q.type === 'chart' && q.chart && <RunChart bars={q.chart.bars} revealNames={showAnswer} unit={q.chart.unit} />}
          {q.type === 'video' && q.video && <VideoEmbed youtubeId={q.video.youtubeId} start={q.video.start} title={q.answerText} />}

          {stage !== 'question' && q.type === 'riddle' && q.hint && <HintCard hint={q.hint} />}
          {stage !== 'question' && q.options && <OptionCards q={q} showAnswer={showAnswer} />}

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
          <button className="btn-muted" disabled={!canSwap} onClick={() => onSwap(q.id)}>
            🔄 Swap{!canSwap && ' · no spares'}
          </button>
          <button className="btn-muted" onClick={() => onPass(q.id)}>Pass ↩</button>
        </span>
      </footer>
    </section>
  );
}
