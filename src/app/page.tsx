'use client';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/hero/hero'), {
  loading: () => <div style={{ height: '100vh', background: '#000' }} />,
});

const StoreMap = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <div style={{ height: '600px', background: '#050508' }} />,
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative z-10">
        <Hero />
      </div>
      <StoreMap />
    </div>
  );
}
