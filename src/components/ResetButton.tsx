export function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      className="btn-muted"
      onClick={() => { if (window.confirm('Reset the game? Every played question comes back.')) onReset(); }}
    >
      Reset game
    </button>
  );
}
