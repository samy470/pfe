'use client';

import { motion } from 'framer-motion';
import { Users, Search, Filter, Check, X, MoreVertical } from 'lucide-react';

export default function UserManagement() {
    const users = [
        { id: '1', username: 'KenzITech', email: 'kenzi@example.com', role: 'admin' as const, status: 'active' as const, joined: '2024-01-12' },
        { id: '2', username: 'Samy_Dev', email: 'samy@pfe.dz', role: 'publisher' as const, status: 'active' as const, joined: '2024-01-20' },
        { id: '3', username: 'client_03', email: 'client.03@platform.dz', role: 'customer' as const, status: 'banned' as const, joined: '2024-02-05' },
        { id: '4', username: 'waselkouz', email: 'waselkouz@gmail.com', role: 'customer' as const, status: 'active' as const, joined: '2024-02-15' },
    ];

    const getRoleBadge = (role: string) => {
        const styles = {
            admin: 'bg-[#66c0f4]/15 text-[#66c0f4] border border-[#66c0f4]/30',
            publisher: 'bg-amber-500/10 text-amber-500/80 border border-amber-500/20',
            customer: 'bg-[#1b2838] text-[#8f98a0] border border-[#2a3f55]',
        };
        return styles[role as keyof typeof styles] || styles.customer;
    };

    return (
        <div className="relative min-h-screen w-full">
            <div className="relative p-8 md:p-12 pt-24 w-full">
                <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-10 bg-[#66c0f4] rounded-sm" />
                            <p className="text-[#8f98a0] font-semibold uppercase tracking-[0.35em] text-[11px]">Access Control</p>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight leading-none uppercase text-[#c7d5e0]">User Management</h1>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f98a0]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="bg-[#1b2838] border border-[#2a3f55] rounded-sm pl-12 pr-5 py-3.5 text-sm text-[#c7d5e0] placeholder-[#8f98a0] focus:border-[#66c0f4]/60 outline-none transition-all w-64 shadow-inner"
                            />
                        </div>
                        <button className="bg-[#1b2838] border border-[#2a3f55] px-5 py-3.5 rounded-sm hover:bg-[#16202d] hover:border-[#66c0f4]/30 transition-all">
                            <Filter size={18} className="text-[#8f98a0]" />
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#16202d] border border-[#2a3f55] rounded-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#2a3f55] bg-[#0e141b]/50">
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f98a0]">User Profile</th>
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f98a0]">Access Level</th>
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f98a0]">Join Date</th>
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f98a0]">Status</th>
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f98a0] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group border-b border-[#2a3f55]/30 last:border-0 hover:bg-[#1b2838] transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-sm bg-[#1b2838] border border-[#2a3f55] flex items-center justify-center text-[#66c0f4] font-bold text-sm">
                                                    {user.username[0]}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-[#c7d5e0]">{user.username}</div>
                                                    <div className="text-[11px] text-[#8f98a0] font-mono">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-[12px] font-mono text-[#8f98a0]">{user.joined}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-[#5ba32b]' : 'bg-[#d94141]'}`} />
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8f98a0]">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex gap-1 justify-end">
                                                <button className="p-2.5 rounded-sm hover:bg-[#1b2838] text-[#5ba32b] transition-all" title="Approve">
                                                    <Check size={16} />
                                                </button>
                                                <button className="p-2.5 rounded-sm hover:bg-[#1b2838] text-[#d94141] transition-all" title="Suspend">
                                                    <X size={16} />
                                                </button>
                                                <button className="p-2.5 rounded-sm hover:bg-[#1b2838] text-[#8f98a0] transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <div className="mt-8 flex justify-between items-center text-[11px] font-semibold text-gray-500">
                    <p>Displaying {users.length} users</p>
                    <div className="flex gap-4">
                        <button className="hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]">Previous</button>
                        <button className="hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
