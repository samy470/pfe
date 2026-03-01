'use client';

export default function SilkBlueBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050a12]">
      <div 
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] opacity-30 blur-[120px] animate-silk-wave-1"
        style={{
          background: 'radial-gradient(circle at 30% 40%, #1a73e8 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[130%] h-[130%] opacity-20 blur-[140px] animate-silk-wave-2"
        style={{
          background: 'radial-gradient(circle at 70% 60%, #0d47a1 0%, transparent 50%)',
        }}
      />

      <div className="absolute inset-0 bg-[#050a12]/20" />
    </div>
  );
}
