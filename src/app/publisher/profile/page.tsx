'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
    BarChart3, 
    Users, 
    Package, 
    TrendingUp, 
    DollarSign, 
    Globe, 
    ArrowUpRight,
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    LayoutDashboard,
    Store
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublisherProfile() {
    const { username } = useSelector((state: RootState) => state.auth);

    const metrics = [
        { label: 'Total Revenue', value: '450k DA', trend: '+12%', icon: DollarSign, color: '#5ba32b' },
        { label: 'Active Players', value: '8.2k', trend: '+5.4k', icon: Users, color: '#1a73e8' },
        { label: 'Refund Rate', value: '1.2%', trend: '-0.3%', icon: TrendingUp, color: '#f5c518' },
        { label: 'Global Rank', value: '#124', trend: 'Top 5%', icon: Globe, color: '#5c6bc0' }
    ];

    const topGames = [
        { title: 'Cyberpunk 2077', sales: '242k', revenue: '142k DA', rating: 4.9 },
        { title: 'Hades II', sales: '188k', revenue: '94k DA', rating: 4.7 },
        { title: 'Starfield', sales: '92k', revenue: '62k DA', rating: 4.4 }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-20 px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-sm p-4 flex items-center justify-center group hover:border-[#5c6bc0] transition-all">
                            <Store size={48} className="text-white/20 group-hover:text-[#5c6bc0] transition-all" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 rounded-full bg-[#5c6bc0]" />
                                <p className="font-black text-[10px] uppercase tracking-[0.4em] text-[#5c6bc0]">Registered Studio — DX-92</p>
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
                                {username || 'PHOENIX_STUDIOS'}
                            </h1>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-4">Verified Distribution Partner</p>
                        </div>
                    </div>
                    
                    <button className="bg-[#5c6bc0] text-white px-8 py-4 rounded-sm font-black uppercase text-[11px] tracking-widest hover:bg-[#5c6bc0]/90 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(92,107,192,0.15)]">
                        <Plus size={16} strokeWidth={3} /> Submit New Configuration
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((m, i) => (
                        <div key={i} className="p-8 bg-white/[0.03] border border-white/10 rounded-sm hover:border-[#5c6bc0]/30 transition-all group relative">
                            <div className="absolute top-4 right-6 text-[9px] font-black text-white/20 group-hover:text-white transition-all flex items-center gap-1">
                                {m.trend} <ArrowUpRight size={10} />
                            </div>
                            <m.icon size={20} style={{ color: m.color }} className="mb-6 opacity-40 group-hover:opacity-100 transition-all" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{m.label}</p>
                            <p className="text-2xl font-black italic">{m.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                    <section className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <BarChart3 size={20} className="text-[#5c6bc0]" />
                                <h2 className="text-xl font-black uppercase italic tracking-widest text-white">Inventory Performance</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                    <input type="text" placeholder="Filter games..." className="bg-white/5 border border-white/10 rounded-sm pl-9 pr-4 py-2 text-xs font-bold focus:border-[#5c6bc0]/50 outline-none w-48" />
                                </div>
                                <button className="p-2 bg-white/5 border border-white/10 rounded-sm text-white/40 hover:text-white transition-all"><Filter size={16} /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {topGames.map((game, i) => (
                                <div key={i} className="p-6 bg-white/[0.02] border border-white/10 rounded-sm flex items-center justify-between group hover:bg-white/[0.05] transition-all cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-black/40 border border-white/10 rounded-sm flex items-center justify-center text-white/20 group-hover:text-[#5c6bc0] transition-all">
                                            <Package size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black uppercase italic tracking-tighter text-white">{game.title}</h3>
                                            <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-0.5">Rating: {game.rating} ★</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12 text-right">
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Downloads</p>
                                            <p className="text-sm font-black italic text-white">{game.sales}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Revenue</p>
                                            <p className="text-sm font-black italic text-[#5ba32b]">{game.revenue}</p>
                                        </div>
                                        <button className="text-white/20 hover:text-white transition-all"><MoreHorizontal size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-8">
                         <div className="p-8 bg-white/[0.03] border border-white/10 rounded-sm">
                            <h3 className="text-[11px] font-black text-[#5c6bc0] uppercase italic tracking-widest mb-8">Audience Distribution</h3>
                            <div className="space-y-8">
                                {[
                                    { region: 'North America', pct: 45, color: '#1a73e8' },
                                    { region: 'Europe', pct: 30, color: '#5c6bc0' },
                                    { region: 'Asia Pacific', pct: 15, color: '#5ba32b' },
                                    { region: 'Rest of World', pct: 10, color: '#f5c518' },
                                ].map((r, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                            <span>{r.region}</span>
                                            <span className="text-white/40">{r.pct}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>

                         <div className="p-8 bg-[#5c6bc0]/10 border border-[#5c6bc0]/20 rounded-sm">
                            <div className="flex items-start gap-4 mb-4">
                                <LayoutDashboard size={20} className="text-[#5c6bc0]" />
                                <p className="text-[9px] font-black text-[#5c6bc0] uppercase tracking-[0.3em] mt-1">Publisher Memo</p>
                            </div>
                            <p className="text-[11px] text-white/60 font-medium leading-relaxed italic">"Storefront algorithm update 7.2 favors high engagement metrics this week. Consider a 15% discount strategy for underperforming legacy titles."</p>
                         </div>
                    </aside>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] bg-[#5c6bc0]/5 translate-x-1/4 translate-y-1/4 blur-[120px] pointer-events-none -z-10" />
        </div>
    );
}
