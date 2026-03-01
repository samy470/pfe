'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
    Activity, 
    Shield, 
    Globe, 
    Cpu, 
    Server, 
    Database, 
    Zap, 
    Terminal,
    AlertTriangle,
    CheckCircle2,
    User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminProfile() {
    const { username } = useSelector((state: RootState) => state.auth);

    const metrics = [
        { label: 'Cluster Load', value: '32%', icon: Cpu, color: '#1a73e8' },
        { label: 'Latency', value: '14ms', icon: Zap, color: '#f5c518' },
        { label: 'Active Nodes', value: '1,024', icon: Database, color: '#5ba32b' },
        { label: 'Network', value: '12.4 GB/s', icon: Globe, color: '#66c0f4' }
    ];

    const logs = [
        { id: 1, type: 'SUCCESS', msg: 'Kernel integration completed at node 0x82', time: '2m ago' },
        { id: 2, type: 'WARN', msg: 'Unauthorized handshake detected (IP: 192.168.0.1)', time: '5m ago' },
        { id: 3, type: 'INFO', msg: 'New publisher "STUDIO_X" verified', time: '12m ago' },
        { id: 4, type: 'CRIT', msg: 'Thermal threshold warning in Sector 7', time: '22m ago' }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-20 px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-[#050608] border border-white/20 rounded-sm flex items-center justify-center p-1 transition-all group-hover:border-[#1a73e8]">
                                <div className="absolute inset-0 bg-blue-500/10 animate-pulse rounded-sm" />
                                <User size={40} className="text-white/20 group-hover:text-[#1a73e8] transition-all" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-[#5ba32b] px-2 py-0.5 rounded-sm border border-black text-[8px] font-black uppercase">Online</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 rounded-full bg-white/20" />
                                <p className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">Root Configuration // 001</p>
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
                                {username || 'ROOT_ADMINISTRATOR'}
                            </h1>
                            <div className="flex gap-4 mt-6">
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] font-black uppercase text-white/40">
                                    Jurisdiction: <span className="text-white">Global</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] font-black uppercase text-white/40">
                                    Clearance: <span className="text-red-500">Tier 5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto">
                        {metrics.map((m, i) => (
                            <div key={i} className="p-6 bg-white/[0.03] border border-white/10 rounded-sm min-w-[140px] hover:border-white/20 transition-all">
                                <m.icon size={16} style={{ color: m.color }} className="mb-4" />
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">{m.label}</p>
                                <p className="text-xl font-black italic">{m.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
                    <section className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <Terminal size={20} className="text-[#1a73e8]" />
                                <h2 className="text-xl font-black uppercase italic tracking-widest text-[#1a73e8]">System Command Log</h2>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white underline decoration-[#1a73e8]">Export Settings</button>
                        </div>

                        <div className="bg-[#050608] border border-white/10 rounded-sm overflow-hidden font-mono">
                            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <span className="text-[10px] text-white/20 uppercase font-black">Localhost // tty1</span>
                            </div>
                            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-4 group">
                                        <span className="text-white/20 text-[9px] mt-1">[{log.time}]</span>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm ${
                                            log.type === 'SUCCESS' ? 'bg-green-500/10 text-green-500' :
                                            log.type === 'WARN' ? 'bg-yellow-500/10 text-yellow-500' :
                                            log.type === 'CRIT' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                                        }`}>{log.type}</span>
                                        <p className="text-[11px] text-white/70 group-hover:text-white transition-all">{log.msg}</p>
                                    </div>
                                ))}
                                <div className="pt-4 flex items-center gap-2 text-white/20">
                                    <span className="text-[#1a73e8]">❯</span>
                                    <div className="w-2 h-4 bg-white/20 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {}
                    <aside className="space-y-8">
                         <div className="p-8 bg-white/[0.03] border border-white/10 rounded-sm space-y-8">
                            <div>
                                <h3 className="text-[11px] font-black text-white uppercase italic tracking-widest mb-6">Service Pillars</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Core API', status: 'Stable', ping: '12ms' },
                                        { name: 'Storage Repository', status: 'Optimal', ping: '8ms' },
                                        { name: 'Identity Grid', status: 'Sinking', ping: '42ms' },
                                        { name: 'Payment Nodes', status: 'Critical', ping: '542ms' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-white/40 uppercase mb-1">{s.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${i === 3 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                                    <span className="text-[11px] font-black text-white italic">{s.status}</span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-white/20">{s.ping}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-[11px] font-black text-[#1a73e8] uppercase italic tracking-widest mb-6">Activity Intensity</h3>
                                <div className="h-40 relative flex items-end gap-1 px-2 border-b border-l border-white/5 bg-white/5">
                                    {[20, 45, 30, 60, 25, 80, 50, 40, 90, 35].map((h, i) => (
                                        <div 
                                            key={i} 
                                            className="flex-1 bg-[#1a73e8]/30 border-t border-x border-[#1a73e8]/40 hover:bg-[#1a73e8]/60 transition-all cursor-crosshair" 
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                    <div className="absolute top-2 right-4 flex items-center gap-2">
                                        <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Level 2 Alert</span>
                                    </div>
                                </div>
                            </div>
                         </div>

                         <div className="p-8 bg-[#1a73e8]/10 border border-[#1a73e8]/20 rounded-sm">
                            <p className="text-[9px] font-black text-[#1a73e8] uppercase tracking-[0.3em] mb-3">Operator Memo</p>
                            <p className="text-[11px] text-white/60 font-medium leading-relaxed italic">"Node migration scheduled for 04:00 Zulu. Ensure all redundant nodes are synchronized with the Standard Configuration."</p>
                         </div>
                    </aside>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-[40vw] h-[40vh] bg-[#1a73e8]/5 -translate-x-1/2 -translate-y-1/2 blur-[100px] pointer-events-none" />
        </div>
    );
}
