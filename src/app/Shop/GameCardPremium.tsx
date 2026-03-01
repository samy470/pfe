'use client';
import { motion } from 'framer-motion';
import { Star, Monitor, Smartphone, Cpu, Heart, ShoppingCart, Info, TrendingUp } from 'lucide-react';
import styles from './shop.module.css';

interface GameCardPremiumProps {
    game: any;
    onAddToCart: (game: any) => void;
    onViewDetails: (game: any) => void;
    onToggleWishlist: (game: any) => void;
    isInWishlist: boolean;
    getPrice: (price: string) => string;
}

export default function GameCardPremium({ 
    game, 
    onAddToCart, 
    onViewDetails, 
    onToggleWishlist, 
    isInWishlist,
    getPrice 
}: GameCardPremiumProps) {
    const isDiscounted = game.discount > 0;
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.premiumCard}
        >
            <div className={styles.premiumImageContainer}>
                <img src={game.image} alt={game.name} className={styles.premiumGameImg} loading="lazy" />
                
                <div className={styles.cardBadges}>
                    {isDiscounted && <span className={styles.discountBadge}>-{game.discount}%</span>}
                    {game.trending && (
                        <span className={styles.trendingMiniBadge}>
                            <TrendingUp size={10} />
                        </span>
                    )}
                </div>

                <button
                    onClick={() => onToggleWishlist(game)}
                    className={`${styles.cardWishlistBtn} ${isInWishlist ? styles.wishlistActive : ''}`}
                >
                    <Heart size={14} fill={isInWishlist ? "white" : "none"} />
                </button>

                <div className={styles.quickActions}>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onViewDetails(game); }} 
                        className={styles.quickActionBtn}
                        title="View Details"
                    >
                        <Info size={16} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart(game); }} 
                        className={styles.quickActionBtnPrimary}
                        title="Add to Cart"
                    >
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>

            <div className={styles.premiumCardInfo} onClick={() => onViewDetails(game)} style={{ cursor: 'pointer' }}>
                <div className={styles.metaHeader}>
                    <div className={styles.platformIcons}>
                        <Monitor size={12} />
                    </div>
                    <div className={styles.ratingBox}>
                        <Star size={10} fill="#f4b400" className="text-[#f4b400]" />
                        <span>{game.rating}</span>
                        <span className={styles.reviewCount}>({(game.reviews / 1000).toFixed(1)}K)</span>
                    </div>
                </div>

                <h3 className={styles.premiumGameTitle}>{game.name}</h3>
                <p className={styles.premiumPublisher}>{game.publisher}</p>

                <div className={styles.priceRow}>
                    <div className={styles.priceContainer}>
                        {isDiscounted ? (
                            <>
                                <span className={styles.oldPriceSmall}>{game.price}</span>
                                <span className={styles.newPricePremium}>
                                    {Math.round(parseFloat(game.price) * (1 - game.discount/100))} DA
                                </span>
                            </>
                        ) : (
                            <span className={styles.staticPrice}>{game.price}</span>
                        )}
                    </div>
                    
                    {game.reviews > 100000 && (
                        <span className={styles.socialProof}>Best Seller</span>
                    )}
                </div>
            </div>
            
            <div className={styles.cardHoverOverlay} style={{ pointerEvents: 'none' }}>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#66c0f4]">Click for Intelligence</span>
            </div>
        </motion.div>
    );
}
