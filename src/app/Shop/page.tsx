'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Star, ChevronRight, Home, Search,
    ArrowRight, UserPlus, LogIn, Trash2, Plus,
    Minus, X, Monitor, Cpu, Smartphone, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchGames,
    setSearchQuery,
    setSelectedCategory
} from '@/redux/shopSlice';
import { Dispatch } from '@reduxjs/toolkit';
import styles from './shop.module.css';

const CATEGORIES = ["All", "Action", "RPG", "Adventure", "Sports", "Strategy"];

export default function Shop() {
    const dispatch: Dispatch<any> = useDispatch();
    const games = useSelector((state: RootState) => state.cart.original);
    const cartItems = useSelector((state: RootState) => state.cart.cart);
    const searchQuery = useSelector((state: RootState) => state.cart.searchQuery);
    const selectedCategory = useSelector((state: RootState) => state.cart.selectedCategory);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    const getPrice = (original: string) => original;

    const filteredGames = useMemo(() =>
        games.filter(g =>
            (selectedCategory === "All" || g.category === selectedCategory) &&
            g.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [games, selectedCategory, searchQuery]
    );

    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmount = cartItems.reduce((total, item) => {
        const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + (priceValue * (item.quantity || 1));
    }, 0);

    return (
        <section id="shop" className={styles.shopContainer}>
            <div className={styles.bgImage} />
            <div className={styles.bgGlow} />

            <div className="container mx-auto px-6 relative z-10">

                { }
                <div className={styles.topBar}>
                    <nav className={styles.navHud}>
                        <Link href="/" className={styles.navItem}>
                            <Home size={14} /> <span>Home</span>
                        </Link>
                        <div className={styles.navSeparator} />
                        <span className={styles.navActive}>Shop</span>
                    </nav>

                    <div className={styles.actions}>
                        <div className={styles.statsBar}>
                            <div className={styles.statItem}>
                                <span className={styles.statVal}>8.4K</span>
                                <span className={styles.statLabel}>Active</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statVal}>128</span>
                                <span className={styles.statLabel}>Servers</span>
                            </div>
                        </div>

                        <div
                            className={styles.cartIconWrapper}
                            data-count={cartCount}
                            onClick={() => setIsCartOpen(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <ShoppingCart size={20} className="text-white hover:text-[#6366f1] transition-colors" />
                        </div>
                        <div className={styles.authGroup}>
                            <button className={styles.loginBtn}>
                                <LogIn size={16} /> <span>SIGN IN</span>
                            </button>
                        </div>
                    </div>
                </div>
                { }
                <div className={styles.headerArea}>
                    <div className={styles.titleBox}>
                        <h2 className={styles.mainTitle}>
                            Store
                        </h2>
                        <div className={styles.accentLine} />
                    </div>

                    <div className={styles.searchWrapper}>
                        <Search className="text-[#6366f1] ml-4" size={18} />
                        <input
                            type="text"
                            placeholder="Find your next conquest..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                    </div>
                </div>

                { }
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

                { }
                <motion.div layout className={styles.grid}>
                    <AnimatePresence mode='popLayout'>
                        {filteredGames.map((game) => (
                            <motion.div
                                layout
                                key={game.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={styles.card}
                            >
                                <div className={styles.imageContainer}>
                                    <img src={game.image} alt={game.name} className={styles.gameImg} />
                                    <div className={styles.priceTag}>{getPrice(game.price)}</div>
                                </div>

                                <div className={styles.cardInfo}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex gap-2">
                                            <Monitor size={10} className="text-gray-500" />
                                            <Smartphone size={10} className="text-gray-500" />
                                            <Cpu size={10} className="text-gray-500" />
                                        </div>
                                        <span className="text-yellow-500 text-xs font-black flex items-center gap-1">
                                            <Star size={10} fill="currentColor" /> 4.9
                                        </span>
                                    </div>
                                    <h3 className={styles.gameTitle}>{game.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedGame(game)}
                                            className={styles.detailsBtn}
                                        >
                                            DETAILS
                                        </button>
                                        <button
                                            onClick={() => dispatch(addToCart(game))}
                                            className={styles.buyBtn}
                                        >
                                            <span className="flex items-center gap-2">
                                                <Zap size={14} fill="currentColor" />
                                                Add to Cart
                                            </span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className={styles.footerSection}>
                    <div className="flex flex-col justify-end items-end text-right">
                        <p className="text-[#6366f1] font-black italic text-lg mb-2">PlatformName</p>
                        <p className="text-gray-600 text-xs font-bold">ALL RIGHTS RESERVED </p>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className={styles.drawerOverlay}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                            className={styles.drawer}
                        >
                            <div className={styles.drawerHeader}>
                                <h2 className={styles.drawerTitle}>YOUR <span className="text-[#6366f1]">Cart</span></h2>
                                <button onClick={() => setIsCartOpen(false)} className={styles.closeBtn}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className={styles.drawerContent}>
                                {cartItems.length === 0 ? (
                                    <div className={styles.emptyCart}>
                                        <ShoppingCart size={60} strokeWidth={1} />
                                        <p className={styles.emptyText}>Empty_Cart</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="text-[#6366f1] text-[10px] font-black tracking-[2px] uppercase hover:underline"
                                        >
                                            Return to Store
                                        </button>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className={styles.cartItem}>
                                            <img src={item.image} alt={item.name} className={styles.cartItemImg} />
                                            <div className={styles.cartItemInfo}>
                                                <div className="flex justify-between items-start">
                                                    <h4 className={styles.cartItemTitle}>{item.name}</h4>
                                                    <button
                                                        onClick={() => dispatch(removeFromCart(item.id))}
                                                        className={styles.removeBtn}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div className={styles.qtyControls}>
                                                        <button
                                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(0, (item.quantity || 1) - 1) }))}
                                                            className={styles.qtyBtn}
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className={styles.qtyVal}>{item.quantity || 1}</span>
                                                        <button
                                                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }))}
                                                            className={styles.qtyBtn}
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <span className={styles.cartItemPrice}>{getPrice(item.price)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cartItems.length > 0 && (
                                <div className={styles.drawerFooter}>
                                    <div className={styles.totalRow}>
                                        <span className={styles.totalLabel}>Total</span>
                                        <span className={styles.totalVal}>{totalAmount.toLocaleString()} DA</span>
                                    </div>
                                    <button className={styles.checkoutBtn}>
                                        Purchase
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
                {selectedGame && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.modalOverlay}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setSelectedGame(null);
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={styles.detailsModal}
                        >
                            <button onClick={() => setSelectedGame(null)} className={styles.modalClose}>
                                <X size={20} />
                            </button>

                            <div className={styles.modalBody}>
                                <div className={styles.modalImageWrapper}>
                                    <img src={selectedGame.image} alt={selectedGame.name} className={styles.modalImg} />
                                    <div className={styles.modalPrice}>{selectedGame.price}</div>
                                </div>

                                <div className={styles.modalInfo}>
                                    <div className="flex flex-col gap-2">
                                        <span className={styles.modalCategory}>{selectedGame.category}</span>
                                        <h2 className={styles.modalTitle}>{selectedGame.name}</h2>
                                    </div>

                                    <div className={styles.detailsSection}>
                                        <h4 className={styles.detailLabel}>MISSION DATA</h4>
                                        <p className={styles.detailText}>{selectedGame.details}</p>
                                    </div>

                                    <div className={styles.specGrid}>
                                        <div className={styles.specItem}>
                                            <div className={styles.specHeader}>
                                                <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                                                    <Zap size={16} className="text-[#6366f1]" />
                                                </div>
                                                <span>STORAGE</span>
                                            </div>
                                            <div className={styles.specValue}>{selectedGame.size}</div>
                                        </div>
                                        <div className={styles.specItem}>
                                            <div className={styles.specHeader}>
                                                <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                                                    <Monitor size={16} className="text-[#6366f1]" />
                                                </div>
                                                <span>REQUIREMENTS</span>
                                            </div>
                                            <div className={styles.specValue}>{selectedGame.requirements}</div>
                                        </div>
                                    </div>

                                    <button
                                        className={styles.modalBuyBtn}
                                        onClick={() => {
                                            dispatch(addToCart(selectedGame));
                                            setSelectedGame(null);
                                            setIsCartOpen(true);
                                        }}
                                    >
                                        Purchase
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}