import { useKey } from './useKey';

interface Handlers { next: () => void; back: () => void; abandon: () => void }

/** Space / → advance, Backspace / ← step back, Esc abandons. */
export function useStageKeys({ next, back, abandon }: Handlers) {
  useKey((e) => {
    if (e.target instanceof HTMLElement && e.target.tagName === 'IFRAME') return;
    switch (e.key) {
      case ' ': case 'ArrowRight': case 'Enter': e.preventDefault(); next(); break;
      case 'Backspace': case 'ArrowLeft': e.preventDefault(); back(); break;
      case 'Escape': abandon(); break;
    }
  }, [next, back, abandon]);
}
