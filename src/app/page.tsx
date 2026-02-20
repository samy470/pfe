import Hero from '@/components/hero/hero';
import Link from 'next/link';

export default function Home() {
  return (
    <>
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
      <Hero />
    </>
  );
}