import type { Question } from '../data/types';
import { SafeImage } from './SafeImage';

const LETTERS = 'ABCD';

interface Props { q: Question; showAnswer: boolean }

export function OptionCards({ q, showAnswer }: Props) {
  const opts = q.options ?? [];
  const visual = q.optionMedia && (q.category === 'movies' || q.category === 'celebrity');
  return (
    <ul className={`options ${visual ? 'options-visual' : ''} options-${opts.length}`}>
      {opts.map((text, i) => {
        const correct = showAnswer && q.answer === i;
        const dim = showAnswer && q.answer !== i;
        return (
          <li key={i} className={`option ${correct ? 'correct' : ''} ${dim ? 'dim' : ''}`}>
            <span className="option-letter">{LETTERS[i]}</span>
            {visual && <SafeImage className={q.category === 'movies' ? 'poster' : 'face'} src={q.optionMedia![i]} alt={text} />}
            <span className="option-text">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}
