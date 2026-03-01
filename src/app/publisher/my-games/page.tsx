'use client';
import { motion } from 'framer-motion';
import { Gamepad2, Search, Plus, MoreVertical, Edit2, Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MyGames() {
    const games = [
        { id: '1', name: 'Desert Storm: Reckoning', status: 'live', sales: 1240, rating: 4.8 },
        { id: '2', name: 'Neon Samurai', status: 'pending', sales: 0, rating: 0 },
        { id: '3', name: 'Void Runner', status: 'live', sales: 850, rating: 4.5 },
    ];

    return (
        <div className="min-h-screen bg-transparent text-white p-8 pt-24 relative">
            <div className="container mx-auto relative z-10">
                <Link href="/publisher" className="inline-flex items-center gap-2 text-[#8f98a0] hover:text-white mb-8 transition-all group font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#66c0f4] rounded-sm" />
                            <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">Catalog Manager</p>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                            MY <span className="text-[#66c0f4]">GAMES</span>
                        </h1>
                    </div>
                    <Link href="/publisher/upload" className="bg-[#66c0f4] text-[#0e141b] px-6 py-3 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#1999ff] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(102,192,244,0.15)]">
                        <Plus size={16} strokeWidth={3} /> Submit New Game
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game, i) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-6 group relative hover:border-[#66c0f4] transition-all"
                        >
                            <div className="aspect-video bg-[#1b2838] border border-[#2a3f55] rounded-sm mb-6 relative overflow-hidden">
                                <div className="absolute top-2 right-2">
                                    <div className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${game.status === 'live' ? 'bg-[#5ba32b]/20 text-[#5ba32b] border border-[#5ba32b]/30' : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                        }`}>
                                        <span className={`w-1 h-1 rounded-full ${game.status === 'live' ? 'bg-[#5ba32b]' : 'bg-amber-500'}`} />
                                        {game.status}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tight text-[#c7d5e0] group-hover:text-white mb-6 leading-none">{game.name}</h3>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-[#1b2838] p-3 rounded-sm border border-[#2a3f55]">
                                    <p className="text-[9px] font-bold text-[#8f98a0] uppercase tracking-widest mb-1">TOTAL SALES</p>
                                    <p className="text-lg font-black text-white">{game.sales.toLocaleString()}</p>
                                </div>
                                <div className="bg-[#1b2838] p-3 rounded-sm border border-[#2a3f55]">
                                    <p className="text-[9px] font-bold text-[#8f98a0] uppercase tracking-widest mb-1">AUDIENCE RATING</p>
                                    <p className="text-lg font-black text-[#66c0f4]">{game.rating || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => alert('Update functionality coming soon')}
                                    className="flex-1 bg-[#1b2838] border border-[#2a3f55] text-[#c7d5e0] py-3 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#16202d] hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Edit2 size={12} /> Edit Detail
                                </button>
                                <button
                                    onClick={() => alert('Launch for testing coming soon')}
                                    className="w-12 h-12 flex items-center justify-center bg-[#66c0f4]/10 border border-[#66c0f4]/20 rounded-sm text-[#66c0f4] hover:bg-[#66c0f4] hover:text-[#0e141b] transition-all">
                                    <Play size={16} fill="currentColor" />
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center bg-[#1b2838] border border-[#2a3f55] rounded-sm text-[#8f98a0] hover:text-white transition-all">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
