'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
    Gamepad2, 
    Trophy, 
    Clock, 
    Search,
    Filter,
    Heart,
    Package,
    History,
    MoreVertical,
    Star,
    Sparkles,
    Library,
    Plus,
    User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerProfile() {
    const { username } = useSelector((state: RootState) => state.auth);

    const stats = [
        { label: 'Assets in Repository', value: '42', icon: Library, color: '#1a73e8' },
        { label: 'Achievements', value: '840', icon: Trophy, color: '#f5c518' },
        { label: 'Integration Time', value: '1.2k hrs', icon: Clock, color: '#5ba32b' },
    ];

    const library = [
        { title: 'God of War', hours: '45h', lastPlayed: '2h ago', rating: 5.0 },
        { title: 'Elden Ring', hours: '120h', lastPlayed: '1d ago', rating: 4.9 },
        { title: 'Red Dead Redemption 2', hours: '88h', lastPlayed: '3d ago', rating: 4.8 }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-20 px-8 relative">
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 pb-12 border-b border-white/5">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="w-28 h-28 bg-[#050608] border border-white/20 rounded-sm flex items-center justify-center p-1 transition-all group-hover:border-[#1a73e8]">
                                <User size={48} className="text-white/20 group-hover:text-[#1a73e8] transition-all" />
                            </div>
                            <div className="absolute -top-3 -right-3 bg-[#1a73e8] w-10 h-10 rounded-sm flex items-center justify-center border-4 border-[#050608] font-black italic shadow-xl">
                                42
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 rounded-full bg-[#1a73e8]" />
                                <p className="font-black text-[10px] uppercase tracking-[0.4em] text-[#1a73e8]">User Profile // Identity</p>
                            </div>
                            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none text-white">
                                {username || 'PLAYER_ONE'}
                            </h1>
                            <div className="flex gap-4 mt-6">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white/40">
                                    <Sparkles size={14} className="text-[#f5c518]" /> Featured Badge: <span className="text-white">Collector Prime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-6">
                        {stats.map((s, i) => (
                            <div key={i} className="text-right">
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{s.label}</p>
                                <div className="flex items-center justify-end gap-3">
                                    <s.icon size={16} style={{ color: s.color }} />
                                    <p className="text-2xl font-black italic text-white">{s.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                    {}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <Gamepad2 size={24} className="text-[#1a73e8]" />
                                <h2 className="text-2xl font-black uppercase italic tracking-widest text-white">REPOSITORY</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                                    <Filter size={14} /> Sort: Recent
                                </button>
                                <button className="p-2 bg-white/5 border border-white/10 rounded-sm text-[#1a73e8]"><Plus size={18} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {library.map((game, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden group hover:border-[#1a73e8]/50 transition-all cursor-pointer">
                                    <div className="h-40 bg-gradient-to-br from-white/5 to-transparent relative p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="bg-[#050608]/80 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10 text-[9px] font-black uppercase tracking-widest">v4.4.2</div>
                                            <button className="text-white/20 hover:text-white transition-all"><MoreVertical size={20} /></button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black uppercase italic tracking-tighter text-white leading-tight mb-2 group-hover:text-[#1a73e8] transition-all">{game.title}</h3>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                                <span>{game.hours} LOGGED</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span className="text-[#1a73e8]">READY FOR INTEGRATION</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 flex items-center justify-between border-t border-white/5">
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Last Access: {game.lastPlayed}</p>
                                        <div className="flex items-center gap-1 text-[#f5c518]">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-[11px] font-black">{game.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {}
                    <aside className="space-y-8">
                         <div className="p-8 bg-white/[0.03] border border-white/10 rounded-sm">
                            <h3 className="text-[11px] font-black text-[#1a73e8] uppercase italic tracking-widest mb-8">Access History</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Inventory', icon: Package, count: '142 Items' },
                                    { name: 'Wishlist', icon: Heart, count: '12 Targets' },
                                    { name: 'System Logs', icon: History, count: 'Archive Ready' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white/40 group-hover:text-[#1a73e8] group-hover:border-[#1a73e8]/30 transition-all">
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-1 group-hover:text-white transition-all">{item.name}</p>
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{item.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>

                         <div className="p-8 bg-[#1a73e8]/10 border border-[#1a73e8]/20 rounded-sm">
                            <p className="text-[9px] font-black text-[#1a73e8] uppercase tracking-[0.3em] mb-4">Repository Status</p>
                            <p className="text-[11px] text-white/60 font-medium leading-relaxed italic">"Optimal integration window detected for Cyber Neon. Bonus productivity standard is now active globally for the next 4 hours."</p>
                         </div>
                    </aside>
                </div>
            </div>

            {}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(26,115,232,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(26,115,232,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none -z-10" />
            <div className="fixed top-0 right-0 w-[60vw] h-[60vh] bg-[#1a73e8]/5 -translate-y-1/2 translate-x-1/2 blur-[150px] pointer-events-none -z-10" />
        </div>
    );
}
