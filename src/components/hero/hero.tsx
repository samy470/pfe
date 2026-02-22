'use client'
import { useState } from 'react';
import styles from '@/components/hero/hero.module.css';

const GAME_COVERS_TOP = [
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900_2x.jpg', 
];

const GAME_COVERS_BOTTOM = [
  'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900_2x.jpg', 
  'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900_2x.jpg', 
];

const GAME_NAMES_TOP = ['God of War', 'Elden Ring', 'Red Dead Redemption 2', 'The Last of Us Part I', 'Cyberpunk 2077'];
const GAME_NAMES_BOTTOM = ['Grand Theft Auto V', 'The Witcher 3', 'Marvel\'s Spider-Man', 'Horizon Zero Dawn', 'Dark Souls III'];

export default function Hero() {
  const [selected, setSelected] = useState<{
    type: 'top' | 'bottom';
    index: number;
    originX: number;
    originY: number;
  } | null>(null);

  const handleTriangleClick = (type: 'top' | 'bottom', index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    setSelected((prev) =>
      prev?.type === type && prev?.index === index
        ? null
        : { type, index, originX, originY }
    );
  };

  const selectedData = selected
    ? {
        name: selected.type === 'top' ? GAME_NAMES_TOP[selected.index] : GAME_NAMES_BOTTOM[selected.index],
        image: selected.type === 'top' ? GAME_COVERS_TOP[selected.index] : GAME_COVERS_BOTTOM[selected.index],
        originX: selected.originX,
        originY: selected.originY,
      }
    : null;

  return (
    <main className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Platform name</h1>
      </div>
      <div className={styles.container}>
        {GAME_COVERS_TOP.map((topSrc, i) => (
          <div key={i} className={styles.column}>
            <div
              className={`${styles.gamePartTop} ${selected?.type === 'top' && selected?.index === i ? styles.selected : ''}`}
              style={{
                backgroundImage: `linear-gradient(135deg, transparent calc(50% - 1px), rgba(255,255,255,0.3) calc(50% - 1px), rgba(255,255,255,0.3) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.5)), url(${topSrc})`,
              }}
              onClick={(e) => handleTriangleClick('top', i, e)}
            />
            <div
              className={`${styles.gamePartBottom} ${selected?.type === 'bottom' && selected?.index === i ? styles.selected : ''}`}
              style={{
                backgroundImage: `linear-gradient(-45deg, transparent calc(50% - 1px), rgba(255,255,255,0.3) calc(50% - 1px), rgba(255,255,255,0.3) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.5)), url(${GAME_COVERS_BOTTOM[i]})`,
              }}
              onClick={(e) => handleTriangleClick('bottom', i, e)}
            />
          </div>
        ))}
      </div>
      {selectedData && (
        <div className={styles.cardPopup} onClick={() => setSelected(null)}>
          <div
            className={styles.card}
            onClick={(e) => e.stopPropagation()}
            style={{
              ['--origin-x' as string]: `${selectedData.originX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)}px`,
              ['--origin-y' as string]: `${selectedData.originY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)}px`,
            }}
          >
            <img src={selectedData.image} alt={selectedData.name} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{selectedData.name}</h3>
            <p className={styles.cardDesc}>Click the triangle again to close</p>
          </div>
        </div>
      )}
  
    </main>
       
  );
}
