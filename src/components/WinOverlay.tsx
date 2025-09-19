export default function WinOverlay({ onReplay }: { onReplay: () => void }) {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      backdropFilter: 'blur(4px)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        borderRadius: '16px', 
        backgroundColor: '#ffffff', 
        padding: '24px', 
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        textAlign: 'center' 
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>You solved it!</h2>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>The hero escaped the exit.</p>
        <button
          onClick={onReplay}
          style={{ 
            padding: '8px 20px', 
            borderRadius: '9999px', 
            backgroundColor: '#f59e0b', 
            color: '#ffffff', 
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Play again
        </button>
      </div>
    </div>
  );
}
