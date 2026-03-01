'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleWishlist, addToCart } from '@/redux/shopSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Ghost } from 'lucide-react';
import Link from 'next/link';
import styles from '../../Shop/shop.module.css';

export default function WishlistPage() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state: RootState) => state.cart.wishlist);
    const pricingStrategy = useSelector((state: RootState) => state.cart.pricingStrategy);

    const getPrice = (original: string) => {
        const val = parseFloat(original.replace(/[^\d.]/g, ''));
        if (isNaN(val)) return original;

        let multiplier = 1;
        if (pricingStrategy === 'sale') multiplier = 0.8;
        if (pricingStrategy === 'premium') multiplier = 1.2;

        return `${Math.round(val * multiplier)} DA`;
    };

    return (
        <div className="min-h-screen bg-transparent text-white p-8 pt-24 relative">
            <div className="container mx-auto relative z-10">
                <Link href="/Shop" className="inline-flex items-center gap-2 text-[#8f98a0] hover:text-white mb-8 transition-all group font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-6 bg-[#66c0f4] rounded-sm" />
                        <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">User Wishlist</p>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
                        MY <span className="text-[#66c0f4]">WISHLIST</span>
                    </h1>
                    <p className="text-[#8f98a0] font-bold uppercase text-[10px] tracking-[0.3em]">{wishlistItems.length} Items Saved for Later</p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 bg-[#16202d] border border-[#2a3f55] rounded-sm flex items-center justify-center text-[#2a3f55] mb-8">
                            <Ghost size={40} strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#8f98a0]">Your wishlist is currently empty.</p>
                        <Link href="/Shop">
                            <button className="px-10 py-4 bg-[#66c0f4] text-[#0e141b] rounded-sm font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#1999ff] transition-all">
                                Return to Shop
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {wishlistItems.map((item, i) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-4 group relative hover:border-[#66c0f4] transition-all"
                                >
                                    <div className="relative aspect-video rounded-sm overflow-hidden mb-4 border border-[#2a3f55]">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2">
                                            <div className="px-2 py-0.5 bg-[#0e141b]/80 backdrop-blur-sm border border-[#2a3f55] rounded-sm text-[8px] font-black uppercase tracking-widest text-[#66c0f4]">
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-black uppercase tracking-tight text-[#c7d5e0] group-hover:text-white transition-colors">{item.name}</h3>
                                        
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[9px] font-bold text-[#8f98a0] uppercase tracking-widest mb-1">STORE PRICE</p>
                                                <span className="text-white font-black text-xl italic">{getPrice(item.price)}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-sm border border-[#2a3f55] flex items-center justify-center bg-[#1b2838] text-[#666]">
                                                 <Heart size={14} className="text-[#66c0f4]" fill="currentColor" />
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => {
                                                    dispatch(addToCart(item));
                                                    dispatch(toggleWishlist(item));
                                                }}
                                                className="flex-1 bg-[#66c0f4] text-[#0e141b] py-3 rounded-sm font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#1999ff] transition-all"
                                            >
                                                <ShoppingCart size={14} /> Add to Cart
                                            </button>
                                            <button
                                                onClick={() => dispatch(toggleWishlist(item))}
                                                className="px-4 bg-[#1b2838] border border-[#2a3f55] text-[#8f98a0] hover:text-red-500 hover:border-red-500/30 transition-all rounded-sm"
                                                title="Remove"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
