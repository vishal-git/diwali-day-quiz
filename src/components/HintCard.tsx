export function HintCard({ hint }: { hint: string }) {
  return (
    <div className="hint-card">
      <span className="hint-label">Hint</span>
      <p className="hint-text">{hint}</p>
    </div>
  );
}
