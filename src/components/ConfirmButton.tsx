import { useState } from 'react';

interface Props {
  label: string;
  question: string;
  yes?: string;
  onConfirm: () => void;
  className?: string;
}

/** Two-step button: the first click asks, the second confirms. "No" or Esc backs out. */
export function ConfirmButton({ label, question, yes = 'Yes, reset', onConfirm, className = 'btn-muted' }: Props) {
  const [asking, setAsking] = useState(false);
  if (!asking) return <button className={className} onClick={() => setAsking(true)}>{label}</button>;
  return (
    <span className="confirm" role="alertdialog" aria-label={question}>
      <span className="confirm-q">{question}</span>
      <button className="btn-danger" onClick={() => { setAsking(false); onConfirm(); }}>{yes}</button>
      <button className="btn-muted" onClick={() => setAsking(false)} autoFocus>No</button>
    </span>
  );
}
