'use client';
import { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Star, Home, Search,
    ArrowRight, LogIn, Heart,
    Zap, Monitor, Smartphone, Cpu,
} from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    addToCart,
    fetchGames,
    setSearchQuery,
    setSelectedCategory,
    toggleWishlist
} from '@/redux/shopSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import styles from './shop.module.css';

import StoreHero from './StoreHero';
import GameCardPremium from './GameCardPremium';
const CartDrawer = lazy(() => import('./CartDrawer'));
const GameDetailsModal = lazy(() => import('./GameDetailsModal'));
const PaymentModal = lazy(() => import('./PaymentModal'));

import { clearCart } from '@/redux/shopSlice';

const CATEGORIES = ["All", "Action", "RPG", "Adventure", "Sports", "Strategy"];

export default function Shop() {
    const dispatch: Dispatch<any> = useDispatch();
    const games = useSelector((state: RootState) => state.cart.original);
    const cartItems = useSelector((state: RootState) => state.cart.cart);
    const wishlistItems = useSelector((state: RootState) => state.cart.wishlist);
    const searchQuery = useSelector((state: RootState) => state.cart.searchQuery);
    const selectedCategory = useSelector((state: RootState) => state.cart.selectedCategory);
    const pricingStrategy = useSelector((state: RootState) => state.cart.pricingStrategy);
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<any>(null);
    const [showAI, setShowAI] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        dispatch(clearCart());
    };

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    const getPrice = useCallback((original: string) => {
        if (!original) return '0 DA';
        const val = parseFloat(original.replace(/[^0-9]/g, ''));
        if (isNaN(val)) return original;

        let multiplier = 1;
        if (pricingStrategy === 'sale') multiplier = 0.8;
        if (pricingStrategy === 'premium') multiplier = 1.2;

        return `${Math.round(val * multiplier).toLocaleString()} DA`;
    }, [pricingStrategy]);

    const isInWishlist = (id: number) => wishlistItems.some(item => item.id === id);

    const filteredGames = useMemo(() =>
        games.filter(g =>
            (selectedCategory === "All" || g.category === selectedCategory) &&
            g.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [games, selectedCategory, searchQuery]
    );

    const featuredGames = useMemo(() => games.filter(g => g.id <= 3), [games]);
    const trendingGames = useMemo(() => games.filter(g => g.trending), [games]);
    const saleGames = useMemo(() => games.filter(g => g.discount > 40), [games]);

    const handleAction = useCallback((action: () => void) => {
        if (!isLoggedIn) {
            toast.error("Authentication required. Please sign in to continue.", {
                toastId: "auth-guard"
            });
            return;
        }
        action();
    }, [isLoggedIn]);

    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const priceStr = getPrice(item.price);
            const priceValue = parseFloat(priceStr.replace(/[^0-9]/g, ''));
            return total + (priceValue * (item.quantity || 1));
        }, 0);
    }, [cartItems, getPrice]);

    return (
        <section id="shop" className={styles.shopContainer}>
            <div className="container mx-auto px-6 relative z-10">
                <div className={styles.topBar}>
                    <nav className={styles.navHud}>
                        <Link href="/" className={styles.navItem}>
                            <Home size={14} /> <span>Home</span>
                        </Link>
                        <div className={styles.navSeparator} />
                        <span className={styles.navActive}>Marketplace</span>
                        {pricingStrategy !== 'default' && (
                            <span className={styles.strategyBadge}>{pricingStrategy} strategy active</span>
                        )}
                    </nav>

                    <div className={styles.actions}>
                        <div
                            className={styles.cartIconWrapper}
                            data-count={cartCount}
                            onClick={() => setIsCartOpen(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <ShoppingCart size={20} className="text-[#8f98a0] hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {!searchQuery && selectedCategory === "All" && (
                    <StoreHero 
                        featuredGames={featuredGames} 
                        onAddToCart={(g) => handleAction(() => dispatch(addToCart(g)))}
                        onViewDetails={setSelectedGame}
                    />
                )}

                <div className={styles.headerArea}>
                    <div className={styles.titleBox}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-8 bg-[#1a73e8] rounded-sm" />
                            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Asset Inventory</p>
                        </div>
                        <h2 className="text-4xl font-black uppercase text-white">Full Catalog</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={styles.searchWrapper}>
                            <Search className="text-[#66c0f4] ml-4" size={18} />
                            <input
                                type="text"
                                placeholder="Universal Search..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            />
                        </div>
                        <button 
                            className="bg-[#1a73e8]/10 border border-[#1a73e8]/20 p-3.5 rounded-sm hover:bg-[#1a73e8]/20 text-[#66c0f4] font-bold text-xs transition-all flex items-center gap-2"
                            onClick={() => setShowAI(true)}
                        >
                            <Cpu size={14} />
                            SYSTEM ASSISTANT
                        </button>
                    </div>
                </div>

                {showAI && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowAI(false)}
                    >
                        <div
                            className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-8 w-[420px] shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6 bg-[#66c0f4] rounded-sm" />
                                <h2 className="text-xl font-bold uppercase tracking-tight text-[#c7d5e0]">
                                    System Assistant
                                </h2>
                            </div>

                            <p className="text-[#8f98a0] mb-6 text-sm">
                                Describe your requirements and the system will suggest the most suitable match.
                            </p>

                            <input
                                type="text"
                                placeholder="Example: Fast-paced RPG with a deep story"
                                className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white placeholder-[#8f98a0]/50 focus:border-[#66c0f4]/60 outline-none transition-all"
                            />

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    onClick={() => setShowAI(false)}
                                    className="px-6 py-2.5 rounded-sm bg-[#1b2838] border border-[#2a3f55] hover:bg-[#16202d] text-[#c7d5e0] text-xs font-bold transition"
                                >
                                    BACK
                                </button>
                                <button
                                    className="px-6 py-2.5 rounded-sm bg-[#1a73e8] text-white font-bold text-xs transition shadow-lg shadow-[#1a73e8]/20"
                                >
                                    GENERATE RECS
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.categoryScroll}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => dispatch(setSelectedCategory(cat))}
                            className={`${styles.tab} ${selectedCategory === cat ? styles.activeTab : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {searchQuery || selectedCategory !== "All" ? (
                    <motion.div layout className={styles.discoveryGrid}>
                        <AnimatePresence mode='popLayout'>
                            {filteredGames.map((game) => (
                                <GameCardPremium
                                    key={game.id}
                                    game={game}
                                    onAddToCart={(g) => handleAction(() => dispatch(addToCart(g)))}
                                    onViewDetails={setSelectedGame}
                                    onToggleWishlist={(g) => handleAction(() => dispatch(toggleWishlist(g)))}
                                    isInWishlist={isInWishlist(game.id)}
                                    getPrice={getPrice}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <>
                        <section className={styles.discoverySection}>
                            <div className={styles.sectionHeader}>
                                <div>
                                    <span className={styles.sectionLabel}>Region Critical</span>
                                    <h3 className={styles.sectionTitleRedesign}>Trending in your region</h3>
                                </div>
                                <button className="text-[#66c0f4] text-xs font-bold hover:underline">VIEW ALL</button>
                            </div>
                            <div className={styles.discoveryGrid}>
                                {trendingGames.map(game => (
                                    <GameCardPremium
                                        key={game.id}
                                        game={game}
                                        onAddToCart={(g) => handleAction(() => dispatch(addToCart(g)))}
                                        onViewDetails={setSelectedGame}
                                        onToggleWishlist={(g) => handleAction(() => dispatch(toggleWishlist(g)))}
                                        isInWishlist={isInWishlist(game.id)}
                                        getPrice={getPrice}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.discoverySection}>
                            <div className={styles.sectionHeader}>
                                <div>
                                    <span className={styles.sectionLabel}>Intelligence Pick</span>
                                    <h3 className={styles.sectionTitleRedesign}>Recommended for you</h3>
                                </div>
                            </div>
                            <div className={styles.discoveryGrid}>
                                {games.slice(0, 4).map(game => (
                                    <GameCardPremium
                                        key={game.id}
                                        game={game}
                                        onAddToCart={(g) => handleAction(() => dispatch(addToCart(g)))}
                                        onViewDetails={setSelectedGame}
                                        onToggleWishlist={(g) => handleAction(() => dispatch(toggleWishlist(g)))}
                                        isInWishlist={isInWishlist(game.id)}
                                        getPrice={getPrice}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.discoverySection}>
                            <div className={styles.sectionHeader}>
                                <div>
                                    <span className={styles.sectionLabel}>Finance Alert</span>
                                    <h3 className={styles.sectionTitleRedesign}>Special Offers</h3>
                                </div>
                            </div>
                            <div className={styles.discoveryGrid}>
                                {saleGames.map(game => (
                                    <GameCardPremium
                                        key={game.id}
                                        game={game}
                                        onAddToCart={(g) => handleAction(() => dispatch(addToCart(g)))}
                                        onViewDetails={setSelectedGame}
                                        onToggleWishlist={(g) => handleAction(() => dispatch(toggleWishlist(g)))}
                                        isInWishlist={isInWishlist(game.id)}
                                        getPrice={getPrice}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                <div className={styles.footerSection}>
                    <div className="flex flex-col justify-end items-end text-right">
                        <p className="text-[#66c0f4] font-black italic text-lg mb-2">SYSTEM_CONTROL</p>
                        <p className="text-gray-600 text-[10px] font-bold tracking-widest">© 2024 CENTRAL DISTRIBUTION. ALL SYSTEMS OPERATIONAL.</p>
                    </div>
                </div>
            </div>

            <Suspense fallback={null}>
                <AnimatePresence>
                    {isCartOpen && (
                        <CartDrawer
                            isOpen={isCartOpen}
                            onClose={() => setIsCartOpen(false)}
                            onCheckout={() => handleAction(() => setIsPaymentOpen(true))}
                            cartItems={cartItems}
                            totalAmount={totalAmount}
                            getPrice={getPrice}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {selectedGame && (
                        <GameDetailsModal
                            game={selectedGame}
                            onClose={() => setSelectedGame(null)}
                            onOpenCart={() => setIsCartOpen(true)}
                            getPrice={getPrice}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isPaymentOpen && (
                        <PaymentModal
                            isOpen={isPaymentOpen}
                            onClose={() => setIsPaymentOpen(false)}
                            total={totalAmount}
                            onSuccess={handlePaymentSuccess}
                        />
                    )}
                </AnimatePresence>
            </Suspense>
        </section>
    );
}

