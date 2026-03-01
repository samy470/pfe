'use client';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, Video, FileText, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function PublishGame() {
    return (
        <div className="min-vh-100 bg-black text-white p-8 pt-24">
            <div className="container mx-auto max-w-5xl">
                <Link href="/publisher" className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary)] mb-8 transition-colors uppercase font-bold text-[10px] tracking-widest">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div className="mb-12 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-[var(--primary)] rounded-full shadow-lg" />
                        <p className="text-[var(--primary)] font-bold uppercase tracking-[0.4em] text-[10px]">Submission Portal</p>
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight leading-none uppercase">SUBMIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#f87171]">NEW GAME</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-[3px] mb-8">Metadata</h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Game Title</label>
                                    <input type="text" placeholder="e.g. Cyber Raid 2099" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--primary)] outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--primary)] outline-none transition-all appearance-none">
                                            <option>Action</option>
                                            <option>RPG</option>
                                            <option>Adventure</option>
                                            <option>Simulation</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Price (DA)</label>
                                        <input type="number" placeholder="2500" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--primary)] outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Summary</label>
                                    <textarea className="w-full h-32 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[var(--primary)] outline-none transition-all resize-none" placeholder="Briefly describe the core gameplay..."></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                            <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-[3px] mb-8">Asset Pack</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="aspect-square bg-black/40 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer">
                                    <ImageIcon size={32} className="mb-4" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Upload Key Art</p>
                                </div>
                                <div className="aspect-square bg-black/40 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer">
                                    <Video size={32} className="mb-4" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Upload Trailer</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {}
                    <div className="space-y-8">
                        <section className="bg-gray-900/60 border border-white/5 rounded-3xl p-8 sticky top-24">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[3px] mb-8">Submission Control</h3>

                            <div className="space-y-4 mb-12 text-[11px] font-mono">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 uppercase tracking-tighter text-[9px] font-bold">Metadata Check</span>
                                    <span className="text-green-500 font-bold uppercase text-[9px]">READY</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-gray-500 uppercase tracking-tighter text-[9px] font-bold">File Verification</span>
                                    <span className="text-yellow-500 font-bold uppercase text-[9px]">PENDING</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 uppercase tracking-tighter text-[9px] font-bold">Legal Approval</span>
                                    <span className="text-red-500 font-bold uppercase text-[9px]">MISSING</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => alert('Submitting for review...')}
                                    className="w-full bg-[var(--primary)] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-[#991b1b] transition-all shadow-lg">
                                    <Send size={18} /> Submit Game
                                </button>
                                <button
                                    onClick={() => alert('Draft saved.')}
                                    className="w-full bg-white/5 border border-white/10 text-gray-500 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/10 hover:text-white transition-all">
                                    Save as Draft
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
