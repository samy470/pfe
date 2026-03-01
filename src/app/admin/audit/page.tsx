'use client';

import { motion } from 'framer-motion';
import { Download, Terminal, AlertCircle, Info } from 'lucide-react';

export default function AuditLogs() {
    const logs = [
        { id: '1', level: 'crit' as const, event: 'Unauthorized Access Attempt', user: 'Unknown (IP: 192.168.1.1)', time: '2024-02-28 14:22:10', target: 'AuthModule' },
        { id: '2', level: 'warn' as const, event: 'Pricing Strategy Changed', user: 'KenzITech', time: '2024-02-28 12:05:45', target: 'PricingEngine' },
        { id: '3', level: 'info' as const, event: 'New Publisher Registered', user: 'Samy_Dev', time: '2024-02-28 10:15:33', target: 'RegistrationService' },
        { id: '4', level: 'info' as const, event: 'Bulk Inventory Synchronization', user: 'System', time: '2024-02-28 09:00:00', target: 'DatabaseService' },
        { id: '5', level: 'crit' as const, event: 'Database Connection Timeout', user: 'System', time: '2024-02-28 08:45:12', target: 'PostgreSQL' },
    ];

    const getLevelStyle = (level: string) => {
        const styles = {
            crit: 'text-[#d94141] bg-[#d94141]/10 border-[#d94141]/20',
            warn: 'text-[#f5c518] bg-[#f5c518]/10 border-[#f5c518]/20',
            info: 'text-[#66c0f4] bg-[#66c0f4]/10 border-[#66c0f4]/20',
        };
        return styles[level as keyof typeof styles] || styles.info;
    };

    return (
        <div className="relative min-h-screen w-full">
            <div className="relative p-8 md:p-12 pt-24 w-full">
                <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-10 bg-[#66c0f4] rounded-sm" />
                            <p className="text-[#8f98a0] font-semibold uppercase tracking-[0.35em] text-[11px]">Security Monitor</p>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight leading-none uppercase text-[#c7d5e0]">System Logs</h1>
                    </div>

                    <button
                        onClick={() => alert('Exporting logs...')}
                        className="bg-[#1b2838] border border-[#2a3f55] px-6 py-3.5 rounded-sm hover:bg-[#16202d] text-[#c7d5e0] font-semibold uppercase text-xs tracking-wider flex items-center gap-2 transition-all"
                    >
                        <Download size={18} /> Export Logs
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#16202d] border border-[#2a3f55] rounded-sm overflow-hidden"
                >
                    <div className="bg-[#0e141b]/50 px-6 py-4 flex justify-between items-center border-b border-[#2a3f55]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#d94141]/60" />
                            <div className="w-3 h-3 rounded-full bg-[#f5c518]/60" />
                            <div className="w-3 h-3 rounded-full bg-[#5ba32b]/60" />
                        </div>
                        <div className="font-mono text-[11px] text-[#8f98a0] font-semibold uppercase tracking-wider flex items-center gap-2">
                            <Terminal size={14} /> System Log Viewer
                        </div>
                    </div>

                    <div className="p-6 font-mono text-[12px] space-y-1">
                        {logs.map((log, i) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex gap-6 py-4 px-4 rounded-sm hover:bg-[#1b2838] transition-colors group"
                            >
                                <span className="text-[#8f98a0] text-[11px] shrink-0">[{log.time}]</span>
                                <span className={`font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded-sm border ${getLevelStyle(log.level)}`}>
                                    {log.level.padEnd(5)}
                                </span>
                                <span className="text-[#8f98a0]/80 font-semibold shrink-0">{log.target}:</span>
                                <span className="text-white flex-1">{log.event}</span>
                                <span className="text-[#8f98a0] italic shrink-0 group-hover:text-gray-400">User: {log.user}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-sm bg-[#16202d] border border-[#2a3f55] flex items-center gap-4 shadow-inner"
                    >
                        <div className="w-12 h-12 rounded-sm bg-[#d94141]/10 flex items-center justify-center">
                            <AlertCircle size={24} className="text-[#d94141]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-[#d94141]/80 tracking-wider mb-1">Critical Warnings</p>
                            <p className="text-sm font-semibold text-[#c7d5e0]">somethingh</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="p-6 rounded-sm bg-[#16202d] border border-[#2a3f55] flex items-center gap-4 shadow-inner"
                    >
                        <div className="w-12 h-12 rounded-sm bg-[#66c0f4]/10 flex items-center justify-center text-[#66c0f4]">
                            <Info size={24} className="text-[#66c0f4]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-[#66c0f4] tracking-wider mb-1">Log Status</p>
                            <p className="text-sm font-semibold text-[#c7d5e0]">1</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
