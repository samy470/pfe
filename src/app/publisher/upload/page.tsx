'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Upload, 
    Image as ImageIcon, 
    Layers, 
    Monitor, 
    CheckCircle2, 
    Plus, 
    ChevronRight, 
    ChevronLeft,
    Save,
    Gamepad2,
    FileCode,
    Cpu,
    HardDrive,
    MemoryStick
} from 'lucide-react';
import Link from 'next/link';

const steps = [
    { id: 1, name: 'Basic Info', icon: Gamepad2 },
    { id: 2, name: 'Media assets', icon: ImageIcon },
    { id: 3, name: 'Builds', icon: FileCode },
    { id: 4, name: 'Requirements', icon: Monitor },
    { id: 5, name: 'Review', icon: CheckCircle2 }
];

export default function GameUploadFlow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.3em]">Game Title</label>
                                <input type="text" placeholder="e.g. Cyber Neon: Overdrive" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-4 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.3em]">Base Price (DA)</label>
                                <input type="number" placeholder="4500" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-4 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Short Description</label>
                            <textarea rows={3} placeholder="Enter a brief summary for the store page..." className="w-full bg-white/5 border border-white/10 rounded-sm px-5 py-4 text-sm font-bold text-white focus:border-[#1a73e8] outline-none transition-all resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.3em]">Genre</label>
                                <select className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-4 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all appearance-none cursor-pointer">
                                    <option>Select Genre</option>
                                    <option>Action</option>
                                    <option>RPG</option>
                                    <option>Strategy</option>
                                    <option>Indie</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.3em]">Age Rating</label>
                                <select className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-4 text-sm font-bold text-white focus:border-[#66c0f4] outline-none transition-all appearance-none cursor-pointer">
                                    <option>PEGI 3</option>
                                    <option>PEGI 12</option>
                                    <option>PEGI 16</option>
                                    <option>PEGI 18</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#8f98a0] uppercase tracking-[0.3em]">Language Support</label>
                                <div className="flex gap-2">
                                    {['EN', 'FR', 'AR'].map(l => (
                                        <div key={l} className="flex-1 text-center py-4 bg-[#1b2838] border border-[#2a3f55] text-xs font-black rounded-sm cursor-pointer hover:border-[#66c0f4] transition-all">{l}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-1 space-y-4">
                                <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-widest">Main Capsule</h4>
                                <div className="aspect-[2/3] bg-[#0e141b] border-2 border-dashed border-[#2a3f55] rounded-sm flex flex-col items-center justify-center gap-4 hover:border-[#66c0f4]/50 transition-all cursor-pointer group">
                                    <Upload size={32} className="text-[#8f98a0] group-hover:text-[#66c0f4] transition-all" />
                                    <p className="text-[10px] font-bold text-[#8f98a0] uppercase tracking-wider">300x450px</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-widest">Store Screenshots (Min 3)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-video bg-[#0e141b] border-2 border-dashed border-[#2a3f55] rounded-sm flex flex-col items-center justify-center gap-2 hover:border-[#66c0f4]/50 transition-all cursor-pointer group">
                                            <ImageIcon size={24} className="text-[#8f98a0] group-hover:text-[#66c0f4] transition-all" />
                                            <p className="text-[9px] font-bold text-[#8f98a0] uppercase tracking-wider">Screenshot #{i}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-widest">Cinematic Trailer</h4>
                            <div className="w-full h-32 bg-[#0e141b] border-2 border-dashed border-[#2a3f55] rounded-sm flex items-center justify-center gap-4 hover:border-[#66c0f4]/50 transition-all cursor-pointer group">
                                <FileCode size={24} className="text-[#8f98a0] group-hover:text-[#66c0f4] transition-all" />
                                <span className="text-xs font-bold text-[#8f98a0] group-hover:text-white transition-all uppercase tracking-widest">Click to upload .mp4 or .mov</span>
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="bg-[#1b2838] border border-[#2a3f55] p-8 rounded-sm">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase italic">Active Build Configuration</h3>
                                    <p className="text-[10px] font-bold text-[#8f98a0] uppercase tracking-widest mt-1">Manage versioning and platform distribution</p>
                                </div>
                                <div className="bg-[#5ba32b]/10 text-[#5ba32b] px-3 py-1 rounded-sm border border-[#5ba32b]/20 text-[10px] font-black uppercase">v1.0.0-Stable</div>
                            </div>

                            <div className="space-y-4">
                                {['Windows 64-bit', 'macOS Universal', 'Linux (Ubuntu/SteamOS)'].map((os, i) => (
                                    <div key={os} className="flex items-center justify-between p-6 bg-[#0e141b] border border-[#2a3f55] rounded-sm hover:border-[#66c0f4]/30 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-[#16202d] border border-[#2a3f55] rounded-sm flex items-center justify-center text-[#66c0f4]">
                                                {i === 0 ? <Monitor size={24} /> : i === 1 ? <Layers size={24} /> : <FileCode size={24} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white uppercase tracking-wider">{os}</p>
                                                <p className="text-[10px] text-[#8f98a0] uppercase tracking-widest mt-1">Status: No Build detected</p>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black text-[#1a73e8] uppercase tracking-widest hover:text-white flex items-center gap-2 border border-[#1a73e8]/20 px-4 py-2 rounded-sm hover:bg-[#1a73e8]/10 transition-all">
                                            <Plus size={14} /> Upload Build
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-[#16202d] border-l-4 border-l-[#f5c518] rounded-sm">
                            <p className="text-[10px] text-[#f5c518] font-black uppercase tracking-widest mb-1">Warning: Version Safety</p>
                            <p className="text-[11px] text-[#8f98a0] font-bold">Ensure your build is scanned for malware and doesn't contain external DRM. Use our SDK for best compatibility.</p>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[0.4em] mb-8">Minimum Specifications</h4>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <Cpu size={12} /> Processor
                                        </label>
                                        <input type="text" placeholder="i5-8400 or Ryzen 5 2600" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <MemoryStick size={12} /> RAM
                                        </label>
                                        <input type="text" placeholder="8 GB" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <Layers size={12} /> Graphics
                                        </label>
                                        <input type="text" placeholder="GTX 1060 or RX 580" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <HardDrive size={12} /> Storage
                                        </label>
                                        <input type="text" placeholder="50 GB" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-6">
                                <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[0.4em] mb-8">Recommended Specs</h4>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <Cpu size={12} /> Processor
                                        </label>
                                        <input type="text" placeholder="i7-10700K or Ryzen 7 5800X" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <MemoryStick size={12} /> RAM
                                        </label>
                                        <input type="text" placeholder="16 GB" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <Layers size={12} /> Graphics
                                        </label>
                                        <input type="text" placeholder="RTX 3070 or RX 6800 XT" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-[#8f98a0] uppercase tracking-widest">
                                            <HardDrive size={12} /> Storage
                                        </label>
                                        <input type="text" placeholder="50 GB (SSD Recommended)" className="w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-5 py-3 text-sm font-bold text-white focus:border-[#66c0f4] outline-none" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10 text-center py-10">
                        <div className="w-24 h-24 bg-[#5ba32b]/10 border border-[#5ba32b]/30 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(91,163,43,0.1)]">
                            <CheckCircle2 size={48} className="text-[#5ba32b]" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white leading-none">Configuration <span className="text-[#66c0f4]">Complete</span></h2>
                        <p className="text-[#8f98a0] max-w-lg mx-auto font-bold text-sm leading-relaxed">
                            Your asset draft is ready for submission to the System Administration. Once approved, it will be visible to all verified clients globally.
                        </p>
                        
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                            <div className="p-6 bg-[#16202d] border border-[#2a3f55] rounded-sm">
                                <p className="text-[9px] font-black text-[#66c0f4] uppercase tracking-widest mb-2">Build Integrity</p>
                                <p className="text-sm font-black text-white italic">PASSED</p>
                            </div>
                            <div className="p-6 bg-[#16202d] border border-[#2a3f55] rounded-sm">
                                <p className="text-[9px] font-black text-[#66c0f4] uppercase tracking-widest mb-2">Media Coverage</p>
                                <p className="text-sm font-black text-white italic">4 SCREENSHOTS</p>
                            </div>
                            <div className="p-6 bg-[#16202d] border border-[#2a3f55] rounded-sm">
                                <p className="text-[9px] font-black text-[#66c0f4] uppercase tracking-widest mb-2">Listing Fee</p>
                                <p className="text-sm font-black text-white italic">WAIVED (Beta)</p>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white p-8 pt-24 relative">
            <div className="container mx-auto max-w-6xl relative z-10">
                <Link href="/publisher/my-games" className="inline-flex items-center gap-2 text-[#8f98a0] hover:text-white mb-8 transition-all group font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-[#1a73e8] rounded-sm" />
                            <p className="text-[#1a73e8] font-black uppercase tracking-[0.3em] text-[10px]">Standard asset submission</p>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
                            BUILD <span className="text-[#1a73e8]">SUBMISSION</span>
                        </h1>
                    </div>

                    {}
                    <div className="flex items-center gap-1">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-center gap-1">
                                <div 
                                    className={`w-10 h-10 rounded-sm flex items-center justify-center border transition-all duration-300 ${
                                        currentStep >= step.id 
                                        ? 'bg-[#1b2838] border-[#66c0f4] text-[#66c0f4] shadow-[0_0_15px_rgba(102,192,244,0.15)]' 
                                        : 'bg-transparent border-[#2a3f55] text-[#8f98a0]'
                                    }`}
                                    title={step.name}
                                >
                                    <step.icon size={18} />
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-[1px] ${currentStep > step.id ? 'bg-[#66c0f4]' : 'bg-[#2a3f55]'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-sm p-10 min-h-[500px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1a73e8]/30 to-transparent" />
                    
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <span className="text-4xl font-black text-[#66c0f4]/20 italic select-none">0{currentStep}</span>
                            <h2 className="text-xl font-black text-white uppercase italic tracking-widest">
                                {steps[currentStep - 1].name}
                            </h2>
                        </div>
                        {renderStepContent()}
                    </div>

                    <div className="flex justify-between items-center mt-20 pt-10 border-t border-[#2a3f55]">
                        <button 
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-3 px-8 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest transition-all ${
                                currentStep === 1 
                                ? 'opacity-20 cursor-not-allowed text-[#8f98a0]' 
                                : 'text-[#8f98a0] hover:text-white hover:bg-[#1b2838]'
                            }`}
                        >
                            <ChevronLeft size={16} /> Previous Configuration
                        </button>

                        {currentStep < steps.length ? (
                            <button 
                                onClick={nextStep}
                                className="bg-[#66c0f4] text-[#0e141b] px-10 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#1999ff] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(102,192,244,0.15)]"
                            >
                                Continue to Next Step <ChevronRight size={16} strokeWidth={3} />
                            </button>
                        ) : (
                            <button 
                                onClick={() => {
                                    setIsSubmitting(true);
                                    setTimeout(() => window.location.href = '/publisher/my-games', 2000);
                                }}
                                disabled={isSubmitting}
                                className="bg-[#5ba32b] text-white px-12 py-4 rounded-sm font-black uppercase text-[10px] tracking-widest hover:bg-[#68bc31] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(91,163,43,0.2)]"
                            >
                                {isSubmitting ? 'Integrating with System...' : 'Submit to Asset Repository'} <Save size={16} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
