import type { Question } from '../data/types';
import { SafeImage } from './SafeImage';
import { Diya } from './Diya';

const LETTERS = 'ABCD';

interface Props {
  q: Question;
  showAnswer: boolean;
  /** Indices a team has already picked wrongly: greyed, with the diya snuffed. */
  wrong?: number[];
  /** Host taps the option a team called out. Omitted on the answer stage. */
  onPick?: (i: number) => void;
  /** True when a team just got it right: the correct card pops along with the fireworks. */
  celebrate?: boolean;
}

export function OptionCards({ q, showAnswer, wrong = [], onPick, celebrate = false }: Props) {
  const opts = q.options ?? [];
  const visual = q.optionMedia && (q.category === 'movies' || q.category === 'celebrity');
  return (
    <ul className={`options ${visual ? 'options-visual' : ''} options-${opts.length}`}>
      {opts.map((text, i) => {
        const correct = showAnswer && q.answer === i;
        const isWrong = wrong.includes(i);
        const dim = showAnswer && q.answer !== i;
        const pickable = Boolean(onPick) && !isWrong;
        return (
          <li
            key={i}
            className={`option ${correct ? 'correct' : ''} ${correct && celebrate ? 'celebrate' : ''} ${dim ? 'dim' : ''} ${isWrong ? 'wrong' : ''} ${pickable ? 'pickable' : ''}`}
            role={onPick ? 'button' : undefined}
            aria-disabled={onPick ? isWrong : undefined}
            onClick={(e) => { if (onPick) { e.stopPropagation(); if (!isWrong) onPick(i); } }}
          >
            <span className="option-letter">{LETTERS[i]}</span>
            {visual && <SafeImage className={q.category === 'movies' ? 'poster' : 'face'} src={q.optionMedia![i]} alt={text} />}
            <span className="option-text">{text}</span>
            {isWrong && (
              <span className="snuff" aria-hidden="true">
                <Diya size={90} />
                <i className="smoke s1" /><i className="smoke s2" /><i className="smoke s3" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
