'use client';
import { motion } from 'framer-motion';
import { Gamepad2, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { t } from '@/lib/i18n';
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
  'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg',
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900_2x.jpg',
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
            <img src={src} alt="Game Cover" className={styles.gameImage} loading="lazy" />
            <div className={styles.imageOverlay} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const lang = useSelector((state: RootState) => state.language.lang);

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
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#66c0f4] rounded-sm" />
                <p className="text-[#8f98a0] font-bold uppercase tracking-[0.5em] text-xs">{t(lang, "officialDistribution")}</p>
                <div className="w-12 h-1 bg-[#66c0f4] rounded-sm" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6 uppercase tracking-tighter">
             {t(lang, "discover")} <span className="text-[#66c0f4]">{t(lang, "download")}</span> <br />
             {t(lang, "dominate")}
            </h1>
            <p className="text-[#8f98a0] text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             {t(lang, "heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link href="/Shop">
                <button className="group relative flex items-center gap-4 bg-[#66c0f4] text-[#0e141b] px-10 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-[#1999ff] hover:text-white transition-all shadow-xl">
                  <span>{t(lang, "exploreStore")}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
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
