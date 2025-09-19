export default function HUD({ moves, onRestart }: { moves: number; onRestart: () => void }) {
  return (
    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
      <div style={{ 
        padding: '6px 12px', 
        borderRadius: '9999px', 
        backgroundColor: '#e5e7eb', 
        fontSize: '14px', 
        fontWeight: '500' 
      }}>
        Moves: {moves}
      </div>
      <button
        onClick={onRestart}
        style={{ 
          padding: '6px 16px', 
          borderRadius: '9999px', 
          backgroundColor: '#000000', 
          color: '#ffffff', 
          fontSize: '14px', 
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Restart
      </button>
    </div>
  );
}
