'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Globe, Save, ExternalLink, CreditCard, Bell, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PublisherSettings() {
    return (
        <div className="min-h-screen bg-transparent text-white p-8 pt-24 relative">
            <div className="container mx-auto max-w-5xl relative z-10">
                <Link href="/publisher" className="inline-flex items-center gap-2 text-[#8f98a0] hover:text-white mb-8 transition-all group font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Command Center
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-6 bg-[#66c0f4] rounded-sm" />
                        <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">System Config</p>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
                        OPERATOR <span className="text-[#66c0f4]">PROFILE</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <aside className="space-y-2">
                        {[
                            { name: 'General', icon: User, active: true },
                            { name: 'Billing', icon: CreditCard },
                            { name: 'Notifications', icon: Bell },
                            { name: 'Security', icon: Shield },
                        ].map((tab) => (
                            <button
                                key={tab.name}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm font-black italic uppercase text-[10px] tracking-[0.15em] transition-all duration-200 border ${tab.active
                                    ? 'bg-[#1b2838] text-[#66c0f4] border-[#66c0f4]'
                                    : 'text-[#8f98a0] border-transparent hover:text-white hover:bg-[#16202d] hover:border-[#2a3f55]'
                                    }`}
                            >
                                <tab.icon size={16} strokeWidth={2.5} /> {tab.name}
                            </button>
                        ))}
                    </aside>

                    <div className="md:col-span-3 space-y-8">
                        <section className="bg-[#16202d] border border-[#2a3f55] rounded-sm p-8 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-8 h-8 bg-[#1b2838] border border-[#2a3f55] rounded-sm flex items-center justify-center text-[#66c0f4]">
                                    <Globe size={16} />
                                </div>
                                <h3 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[0.4em]">Public Identity</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-[#8f98a0] uppercase tracking-[0.3em] ml-1">Publisher Name</label>
                                        <input type="text" defaultValue="Phoenix Studios" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-[#8f98a0] uppercase tracking-[0.3em] ml-1">Support Email</label>
                                        <input type="email" defaultValue="hi@phoenix.io" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-[#8f98a0] uppercase tracking-[0.3em] ml-1">Studio Bio</label>
                                    <textarea className="w-full h-32 bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all resize-none" defaultValue="Building the next generation of atmospheric shooters."></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-[#8f98a0] uppercase tracking-[0.3em] ml-1">Website URL</label>
                                    <input type="text" defaultValue="https://phoenix.io" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all" />
                                </div>
                            </div>

                            <button className="mt-10 bg-[#66c0f4] text-[#0e141b] px-10 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#1999ff] transition-all flex items-center gap-3">
                                <Save size={16} strokeWidth={3} /> Commit Configuration
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
