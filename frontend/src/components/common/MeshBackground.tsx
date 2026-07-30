'use client';

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Deep Dark Base */}
      <div className="absolute inset-0 bg-[#07090E]" />

      {/* Mesh Ambient Gradient Lights */}
      <div
        className="absolute -top-[20%] left-[15%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full opacity-30 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(79, 70, 229, 0.2) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-[35%] -right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full opacity-25 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(14, 165, 233, 0.15) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 75%)',
        }}
      />

      {/* Subtle Linear Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Expensive Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
