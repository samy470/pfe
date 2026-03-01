'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Info, TrendingUp, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './shop.module.css';

interface StoreHeroProps {
    featuredGames: any[];
    onAddToCart: (game: any) => void;
    onViewDetails: (game: any) => void;
}

export default function StoreHero({ featuredGames, onAddToCart, onViewDetails }: StoreHeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [featuredGames.length]);

    if (!featuredGames.length) return null;

    const currentGame = featuredGames[currentIndex];

    return (
        <section className={styles.heroWrapper}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentGame.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={styles.heroBackground}
                    style={{ backgroundImage: `url(${currentGame.heroImage || currentGame.image})` }}
                >
                    <div className={styles.heroOverlay} />
                </motion.div>
            </AnimatePresence>

            <div className={styles.heroContent}>
                <motion.div
                    key={`content-${currentGame.id}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className={styles.heroText}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className={styles.featuredBadge}>FEATURED</span>
                        {currentGame.trending && (
                            <span className={styles.trendingBadge}>
                                <TrendingUp size={12} />
                                TRENDING NOW
                            </span>
                        )}
                    </div>

                    <h1 className={styles.heroTitle}>{currentGame.name}</h1>
                    <p className={styles.heroPublisher}>{currentGame.publisher}</p>
                    
                    <p className={styles.heroDescription}>
                        {currentGame.details.length > 180 
                            ? `${currentGame.details.substring(0, 180)}...` 
                            : currentGame.details}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mt-8">
                        <div className={styles.heroPriceDisplay}>
                            {currentGame.discount > 0 && (
                                <span className={styles.heroDiscount}>-{currentGame.discount}%</span>
                            )}
                            <div className="flex flex-col">
                                {currentGame.discount > 0 && (
                                    <span className={styles.oldPrice}>{currentGame.price}</span>
                                )}
                                <span className={styles.newPrice}>
                                    {currentGame.discount > 0 
                                        ? `${Math.round(parseFloat(currentGame.price) * (1 - currentGame.discount/100))} DA`
                                        : currentGame.price}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => onViewDetails(currentGame)}
                                className={styles.heroSecondaryBtn}
                            >
                                <Info size={18} />
                                View Details
                            </button>
                            <button 
                                onClick={() => onAddToCart(currentGame)}
                                className={styles.heroPrimaryBtn}
                            >
                                <ShoppingCart size={18} />
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className={styles.countdownBox}>
                        <Clock size={14} className="text-[#66c0f4]" />
                        <span>LIMITED TIME OFFER: 48:20:15</span>
                    </div>
                </motion.div>

                <div className={styles.heroPagination}>
                    {featuredGames.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`${styles.pageDot} ${idx === currentIndex ? styles.activeDot : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
