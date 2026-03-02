'use client';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/redux/shopSlice';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { t } from '@/lib/i18n';
import styles from './shop.module.css';
import { X, ShoppingCart, Monitor, Cpu, Star, TrendingUp } from 'lucide-react';

interface GameDetailsModalProps {
    game: any;
    onClose: () => void;
    onOpenCart: () => void;
    getPrice: (price: string) => string;
}

export default function GameDetailsModal({ game, onClose, onOpenCart, getPrice }: GameDetailsModalProps) {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const lang = useSelector((state: RootState) => state.language.lang);
    
    if (!game) return null;

    const discountedPrice = game.discount > 0 
        ? Math.round(parseFloat(game.price) * (1 - game.discount/100)) 
        : null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={(e: React.MouseEvent) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={styles.premiumModal}
            >
                <button onClick={onClose} className={styles.modalClose}>
                    <X size={20} />
                </button>

                <div className={styles.premiumModalBody}>
                    <div className={styles.premiumModalSidebar}>
                        <img src={game.image} alt={game.name} className={styles.sidebarThumbnail} />
                        
                        <div className={styles.sidebarMeta}>
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>{t(lang, 'developer')}</span>
                                <span className={styles.metaVal}>{game.publisher}</span>
                            </div>
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>{t(lang, 'releaseDate')}</span>
                                <span className={styles.metaVal}>2024</span>
                            </div>
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>{t(lang, 'rating')}</span>
                                <div className="flex items-center gap-1 text-[#f4b400]">
                                    <Star size={12} fill="currentColor" />
                                    <span className="font-bold">{game.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sidebarActions}>
                             <div className={styles.priceSection}>
                                {game.discount > 0 && (
                                    <span className={styles.sidebarDiscount}>-{game.discount}%</span>
                                )}
                                <div className="flex flex-col">
                                    {game.discount > 0 && (
                                        <span className={styles.sidebarOldPrice}>{game.price}</span>
                                    )}
                                    <span className={styles.sidebarNewPrice}>
                                        {discountedPrice ? `${discountedPrice.toLocaleString()} DA` : game.price}
                                    </span>
                                </div>
                             </div>

                             <button
                                className={styles.sidebarBuyBtn}
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        toast.error(t(lang, 'authRequiredText'));
                                        return;
                                    }
                                    dispatch(addToCart(game));
                                    onClose();
                                    onOpenCart();
                                }}
                            >
                                <ShoppingCart size={18} />
                                {t(lang, 'addToCart')}
                            </button>
                        </div>
                    </div>

                    <div className={styles.premiumModalMain}>
                        <div className={styles.heroPreview}>
                            <img src={game.heroImage || game.image} alt="Hero" className={styles.heroImg} />
                            <div className={styles.heroGrad} />
                            <div className={styles.heroTitleBox}>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={styles.heroCatBadge}>{game.category}</span>
                                    {game.trending && <span className={styles.heroTrendBadge}><TrendingUp size={12} /> {t(lang, 'trending')}</span>}
                                </div>
                                <h2 className={styles.heroModalTitle}>{game.name}</h2>
                            </div>
                        </div>

                        <div className={styles.mainContentArea}>
                            <div className={styles.descriptionSection}>
                                <h4 className={styles.sectionHeading}>{t(lang, 'projectOverview')}</h4>
                                <p className={styles.descriptionP}>{game.details}</p>
                            </div>

                            <div className={styles.requirementsSection}>
                                <h4 className={styles.sectionHeading}>{t(lang, 'systemConfig')}</h4>
                                <div className={styles.reqGrid}>
                                    <div className={styles.reqItem}>
                                        <Monitor size={16} className="text-[#66c0f4]" />
                                        <div>
                                            <span className={styles.reqLabel}>{t(lang, 'recommendedSpecs')}</span>
                                            <p className={styles.reqVal}>{game.requirements}</p>
                                        </div>
                                    </div>
                                    <div className={styles.reqItem}>
                                        <Cpu size={16} className="text-[#66c0f4]" />
                                        <div>
                                            <span className={styles.reqLabel}>{t(lang, 'storageCapacity')}</span>
                                            <p className={styles.reqVal}>{game.size}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
