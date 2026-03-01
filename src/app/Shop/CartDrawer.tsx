'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, X, Trash2, Minus, Plus, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/redux/shopSlice';
import styles from './shop.module.css';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
    cartItems: any[];
    totalAmount: number;
    getPrice: (price: string) => string;
}

export default function CartDrawer({ isOpen, onClose, onCheckout, cartItems, totalAmount, getPrice }: CartDrawerProps) {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
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
                    <h2 className={styles.drawerTitle}>YOUR <span className="text-[var(--primary)]">Cart</span></h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.drawerContent}>
                    {cartItems.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <ShoppingCart size={60} strokeWidth={1} />
                            <p className={styles.emptyText}>Empty_Cart</p>
                            <button
                                onClick={onClose}
                                className="text-[var(--primary)] text-[10px] font-black tracking-[2px] uppercase hover:underline"
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
                        <button 
                            className={styles.checkoutBtn}
                            onClick={() => {
                                onClose();
                                onCheckout();
                            }}
                        >
                            Purchase
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </motion.div>
        </>
    );
}
