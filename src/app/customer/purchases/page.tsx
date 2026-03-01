'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, Download, Clock, Star, ArrowLeft, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseHistory() {
    const orders = [
        { id: 'ORD-8821', game: 'Cyberpunk 2077', date: '2024-02-15', price: '5,500 DA', status: 'completed' },
        { id: 'ORD-7740', game: 'Elden Ring', date: '2024-01-20', price: '6,200 DA', status: 'completed' },
        { id: 'ORD-6612', game: 'Hades', date: '2023-12-05', price: '2,800 DA', status: 'completed' },
    ];

    return (
        <div className="min-h-screen bg-transparent text-white p-8 pt-24 relative">
            <div className="container mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-[#8f98a0] hover:text-white mb-8 transition-all group font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-6 bg-[#66c0f4] rounded-sm" />
                        <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">Purchase Records</p>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
                        MY <span className="text-[#66c0f4]">LIBRARY</span>
                    </h1>
                    <p className="text-[#8f98a0] font-bold uppercase text-[10px] tracking-[0.3em]">View and manage your digital acquisitions</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[4px]">Verified Purchases</h3>
                            <div className="h-[1px] flex-1 mx-6 bg-[#2a3f55]" />
                        </div>

                        {orders.map((order, i) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#16202d] border border-[#2a3f55] p-5 rounded-sm flex items-center justify-between group hover:bg-[#1b2838] hover:border-[#66c0f4] transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-[#1b2838] border border-[#2a3f55] rounded-sm flex items-center justify-center text-[#66c0f4] group-hover:border-[#66c0f4] transition-all">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg uppercase tracking-tight text-[#c7d5e0] group-hover:text-white transition-colors">{order.game}</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] text-[#556772] font-mono uppercase tracking-widest">{order.id}</span>
                                            <div className="w-1 h-1 rounded-full bg-[#2a3f55]" />
                                            <span className="text-[9px] text-[#556772] font-bold uppercase tracking-widest">{order.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black italic text-[#66c0f4] mb-1 tabular-nums">{order.price}</p>
                                    <div className="flex items-center justify-end gap-2 px-2 py-0.5 bg-[#5ba32b]/10 border border-[#5ba32b]/20 rounded-sm">
                                        <div className="w-1 h-1 rounded-full bg-[#5ba32b]"></div>
                                        <span className="text-[8px] font-black uppercase text-[#5ba32b] tracking-wider">SECURE</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[4px]">Launcher Utility</h3>
                        <div className="bg-[#1b2838] border border-[#2a3f55] rounded-sm p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-[#16202d] border border-[#2a3f55] rounded-sm flex items-center justify-center text-[#66c0f4]">
                                <Gamepad2 size={32} />
                            </div>
                            <p className="text-lg font-black uppercase text-white mb-2 italic">Remote Access</p>
                            <p className="text-[9px] text-[#8f98a0] mb-8 uppercase tracking-[0.2em] font-bold leading-relaxed">Cross-device synchronization active</p>
                            <button
                                onClick={() => alert('Launching launcher...')}
                                className="w-full bg-[#66c0f4] text-[#0e141b] py-3 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#1999ff] transition-all">
                                Synchronize Now
                            </button>
                        </div>

                        <div className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-6 flex items-center justify-between group hover:border-[#66c0f4] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#1b2838] rounded-sm flex items-center justify-center text-[#66c0f4] border border-[#2a3f55]">
                                    <Clock size={16} />
                                </div>
                                <p className="text-[10px] font-black uppercase text-[#8f98a0] tracking-widest">Total Playtime</p>
                            </div>
                            <p className="text-xl font-black italic text-white uppercase tracking-tighter">142<span className="text-[#66c0f4]">H</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
