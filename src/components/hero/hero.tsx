'use client';
import { motion } from 'framer-motion';
import { Gamepad2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './hero.module.css';

const GAME_COVERS = [
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg',
];

const ScrollingColumn = ({ items, speed = 40, reverse = false }: { items: string[], speed?: number, reverse?: boolean }) => {
  return (
    <div className={styles.columnWrapper}>
      <motion.div
        className={styles.column}
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((src, idx) => (
          <div key={idx} className={styles.gameCard}>
            <img src={src} alt="Game Cover" className={styles.gameImage} />
            <div className={styles.imageOverlay} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const col1 = [...GAME_COVERS];
  const col2 = [...GAME_COVERS].reverse();
  const col3 = [...GAME_COVERS].slice(2).concat(GAME_COVERS.slice(0, 2));
  const col4 = [...GAME_COVERS].slice(4).concat(GAME_COVERS.slice(0, 4));
  const col5 = [...GAME_COVERS].slice(6).concat(GAME_COVERS.slice(0, 6));
  const col6 = [...GAME_COVERS].slice(1).concat(GAME_COVERS.slice(0, 1));

  return (
    <section className={styles.heroContainer}>
      <div className={styles.carouselSection}>
        <div className={styles.carouselGrid}>
          <ScrollingColumn items={col1} speed={30} />
          <ScrollingColumn items={col2} speed={40} reverse />
          <ScrollingColumn items={col3} speed={35} />
          <ScrollingColumn items={col4} speed={45} reverse />
          <ScrollingColumn items={col5} speed={38} />
          <ScrollingColumn items={col6} speed={32} reverse />
        </div>
        <div className={styles.vignette} />
        <div className={styles.bottomFade} />
      </div>

      <div className={styles.contentOverlay}>
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl flex flex-col items-center"
          >
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter italic leading-none text-white">
              Platform<span className="text-[#6366f1]">Name</span>
            </h1>

            <p className="text-gray-400 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              initiative text
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/Shop" className="group relative">
                <div className="absolute inset-0 bg-[#6366f1] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <button className="relative bg-[#6366f1] text-white px-10 py-5 rounded-[1.5rem] font-black flex items-center gap-3 transition-all active:scale-95">
                  <Gamepad2 className="w-6 h-6" />
                  EXPLORE STORE
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;