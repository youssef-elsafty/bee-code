'use client';

interface AuroraBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function AuroraBackground({ className = '', intensity = 'high' }: AuroraBackgroundProps) {
  const opacityMap = { low: 0.3, medium: 0.45, high: 0.6 };
  const baseOpacity = opacityMap[intensity];

  return (
    <div className={`aurora-container ${className}`} aria-hidden="true">
      {/* Base dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, #0d1f42 0%, #071120 60%, #060e1a 100%)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Lightweight hardware-accelerated CSS Aurora blobs */}
      <div
        className="aurora-blob aurora-blob-1 animate-aurora-1"
        style={{ opacity: baseOpacity }}
      />
      <div
        className="aurora-blob aurora-blob-2 animate-aurora-2"
        style={{ opacity: baseOpacity * 0.8 }}
      />
      <div
        className="aurora-blob aurora-blob-3 animate-aurora-3"
        style={{ opacity: baseOpacity * 0.6 }}
      />
    </div>
  );
}
