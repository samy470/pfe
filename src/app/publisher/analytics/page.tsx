'use client';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function Analytics() {
    const stats = [
        { label: 'Total Revenue', val: '840k DA', growth: '+12%', icon: BarChart3 },
        { label: 'Active Players', val: '4,200', growth: '+8%', icon: Users },
        { label: 'Avg. Playtime', val: '2.4h', growth: '-3%', icon: Clock },
        { label: 'Wishlists', val: '12,400', growth: '+25%', icon: TrendingUp },
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
                            <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">Data Intelligence</p>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
                            ANALYTIC <span className="text-[#66c0f4]">METRICS</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => alert('Exporting data...')}
                        className="bg-[#1b2838] border border-[#2a3f55] px-8 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest flex items-center gap-3 text-[#c7d5e0] hover:border-[#66c0f4] hover:text-white transition-all">
                        <Download size={16} /> Download Report
                    </button>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#16202d] border border-[#2a3f55] p-8 rounded-sm relative overflow-hidden group hover:border-[#66c0f4] transition-all"
                        >
                            <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-20 transition-opacity text-[#66c0f4]">
                                <stat.icon size={40} />
                            </div>
                            <p className="text-[#8f98a0] text-[10px] font-black uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                            <div className="flex items-end gap-3">
                                <p className="text-3xl font-black text-white tabular-nums tracking-tighter">{stat.val}</p>
                                <div className={`flex items-center px-2 py-0.5 rounded-sm text-[8px] font-black mb-1.5 ${stat.growth.startsWith('+') ? 'bg-[#5ba32b]/10 text-[#5ba32b] border border-[#5ba32b]/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {stat.growth}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-8 h-8 bg-[#1b2838] rounded-sm flex items-center justify-center text-[#66c0f4] border border-[#2a3f55]">
                                <BarChart3 size={16} />
                            </div>
                            <h3 className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.4em]">Sales Performance</h3>
                        </div>
                        <div className="aspect-video bg-[#0e141b] border border-[#2a3f55] rounded-sm flex flex-col items-center justify-center text-[#2a3f55]">
                            <BarChart3 size={40} className="mb-4 opacity-10" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 italic">Processing System Logs...</p>
                        </div>
                    </div>
                    <div className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-8 h-8 bg-[#1b2838] rounded-sm flex items-center justify-center text-[#66c0f4] border border-[#2a3f55]">
                                <TrendingUp size={16} />
                            </div>
                            <h3 className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.4em]">Engagement Levels</h3>
                        </div>
                        <div className="aspect-video bg-[#0e141b] border border-[#2a3f55] rounded-sm flex flex-col items-center justify-center text-[#2a3f55]">
                            <TrendingUp size={40} className="mb-4 opacity-10" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 italic">Aggregating User Data...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
