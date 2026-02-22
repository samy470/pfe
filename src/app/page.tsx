
'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/hero/hero';
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';

const StoreMap = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', width: '100%', background: '#000' }} />
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <nav className="fixed top-0 right-0 p-6 z-50 flex gap-3">
        <Link
          href="/Login"
          className="px-5 py-2 rounded-lg font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/Registration"
          className="px-5 py-2 rounded-lg font-medium bg-[#0070f3] hover:bg-[#0060df] text-white transition-colors"
        >
          Register
        </Link>
      </nav>
      <StoreMap />
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}
