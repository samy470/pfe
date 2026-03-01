'use client';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    MessageSquare, 
    ArrowLeft, 
    Clock, 
    ShieldCheck, 
    Gamepad2,
    CheckCircle2,
    CalendarCheck
} from 'lucide-react';
import Link from 'next/link';

export default function AppointmentPage() {
    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-20 px-8 relative overflow-hidden">
            <div className="container mx-auto max-w-4xl relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all mb-12">
                    <ArrowLeft size={14} /> Back to Repository
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <section className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 rounded-full bg-[#1a73e8]" />
                                <p className="font-black text-[11px] uppercase tracking-[0.4em] text-[#1a73e8]">Service Standard</p>
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-6">
                                SERVICE <span className="text-white/20">/</span> REQUEST
                            </h1>
                            <p className="text-sm font-medium text-white/40 leading-relaxed max-w-sm">
                                If an asset is restricted or currently unavailable, you can request an appointment with a system specialist for manual authorized access or support.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Calendar, text: "Select your preferred integration window" },
                                { icon: MessageSquare, text: "Specify asset ID and technical reason" },
                                { icon: ShieldCheck, text: "Verify identity via hardware credentials" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-sm">
                                    <div className="p-2 bg-[#1a73e8]/10 border border-[#1a73e8]/20 rounded-sm text-[#1a73e8]">
                                        <item.icon size={18} />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-white/70">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white/[0.03] border border-white/10 rounded-sm p-10 backdrop-blur-xl shadow-2xl relative">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Target Asset ID</label>
                                <div className="relative">
                                    <Gamepad2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                    <input type="text" placeholder="SYS-982-ASSET" className="w-full bg-black/40 border border-white/10 px-10 py-4 rounded-sm text-sm text-white focus:border-[#1a73e8]/50 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Integration Date</label>
                                    <div className="relative">
                                        <CalendarCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                        <input type="date" className="w-full bg-black/40 border border-white/10 px-10 py-4 rounded-sm text-sm text-white focus:border-[#1a73e8]/50 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Window (UTC)</label>
                                    <div className="relative">
                                        <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                        <select className="w-full bg-black/40 border border-white/10 px-10 py-4 rounded-sm text-sm text-white focus:border-[#1a73e8]/50 outline-none transition-all appearance-none cursor-pointer">
                                            <option>09:00 - 12:00</option>
                                            <option>13:00 - 17:00</option>
                                            <option>20:00 - 00:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Context / Reason</label>
                                <textarea rows={4} placeholder="Briefly specify your requirement for manual integration..." className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-sm text-sm text-white focus:border-[#1a73e8]/50 outline-none transition-all resize-none" />
                            </div>

                            <button className="w-full bg-[#1a73e8] text-white px-10 py-5 rounded-sm font-black uppercase text-[11px] tracking-[0.2em] hover:bg-[#1a73e8]/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(26,115,232,0.2)]">
                                Submit Integration Request <CheckCircle2 size={16} strokeWidth={3} />
                            </button>

                            <p className="text-[9px] text-center font-bold text-white/20 uppercase tracking-widest">Specialist response typical: ~24 Hours</p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />
        </div>
    );
}
