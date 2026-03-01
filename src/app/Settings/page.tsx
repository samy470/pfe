'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    User, 
    Shield, 
    Bell, 
    CreditCard, 
    Store, 
    Lock, 
    Eye, 
    Users, 
    DollarSign, 
    Box, 
    Settings, 
    Globe, 
    ShieldAlert, 
    Activity,
    LogOut,
    ChevronRight,
    Search,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type SettingSection = {
    id: string;
    name: string;
    icon: any;
    description: string;
};

const getRoleData = (role: string) => {
    switch (role) {
        case 'publisher':
            return {
                title: 'STUDIO',
                subtitle: 'PROVIDER INTERFACE',
                accent: '#5c6bc0',
                sections: [
                    { id: 'studio', name: 'Studio Profile', icon: Store, description: 'Public entity information' },
                    { id: 'team', name: 'Team & Roles', icon: Users, description: 'Manage collaborator access' },
                    { id: 'finance', name: 'Payouts & Finance', icon: DollarSign, description: 'Revenue and tax info' },
                    { id: 'storefront', name: 'Storefront Config', icon: Settings, description: 'Global listing preferences' },
                    { id: 'builds', name: 'Build Management', icon: Box, description: 'Release configuration settings' },
                ]
            };
        case 'admin':
            return {
                title: 'SYSTEM',
                subtitle: 'ADMINISTRATIVE CONFIG',
                accent: '#b0bec5',
                sections: [
                    { id: 'platform', name: 'Platform Config', icon: Globe, description: 'Global system variables' },
                    { id: 'moderation', name: 'Moderation', icon: Shield, description: 'Content & User control' },
                    { id: 'commerce', name: 'Commerce & Fraud', icon: ShieldAlert, description: 'Transaction monitoring' },
                    { id: 'logs', name: 'System Logs', icon: Activity, description: 'Real-time audit trail' },
                ]
            };
        default:
            return {
                title: 'ACCOUNT',
                subtitle: 'USER PREFERENCES',
                accent: '#1a73e8',
                sections: [
                    { id: 'profile', name: 'Profile', icon: User, description: 'Public identity settings' },
                    { id: 'security', name: 'Security', icon: Lock, description: 'Auth & 2FA management' },
                    { id: 'payments', name: 'Payments', icon: CreditCard, description: 'Saved methods & history' },
                    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Platform alert preferences' },
                    { id: 'store', name: 'Store Prefs', icon: Store, description: 'Discovery & content content' },
                    { id: 'privacy', name: 'Privacy', icon: Eye, description: 'Visibility and data usage' },
                ]
            };
    }
};

export default function RoleSettings() {
    const { username, role } = useSelector((state: RootState) => state.auth);
    const roleData = getRoleData(role || 'customer');
    const [activeSection, setActiveSection] = useState(roleData.sections[0].id);

    return (
        <div className="min-h-screen bg-transparent text-[#c7d5e0] pb-20 pt-24 px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-10">
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all mb-6">
                            <ArrowLeft size={14} /> Back to System
                        </Link>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-1.5 h-8 rounded-full" style={{ background: roleData.accent }} />
                            <p className="font-black text-[11px] uppercase tracking-[0.4em]" style={{ color: roleData.accent }}>{roleData.subtitle}</p>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
                            {roleData.title} <span className="text-white/20">/</span> SETTINGS
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md p-4 rounded-sm border border-white/10">
                        <div className="w-12 h-12 bg-[#050608] border border-white/10 rounded-sm flex items-center justify-center">
                            <User size={24} style={{ color: roleData.accent }} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white leading-tight uppercase tracking-wider">{username}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Status: System Active</p>
                        </div>
                        <div className="ml-6 pl-6 border-l border-white/10">
                             <button className="p-2 hover:bg-white/5 rounded-sm transition-all text-white/40 hover:text-red-400">
                                <LogOut size={18} />
                             </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    <nav className="space-y-1.5">
                        <div className="relative mb-6">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input 
                                type="text" 
                                placeholder="Filter settings..." 
                                className="w-full bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-xs font-bold text-white focus:border-white/30 outline-none transition-all"
                            />
                        </div>
                        
                        {roleData.sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center justify-between px-5 py-4 rounded-sm text-left transition-all group ${
                                    activeSection === section.id 
                                    ? 'bg-white/10 text-white border-l-4 border-l-white' 
                                    : 'text-white/40 hover:bg-white/[0.03] hover:text-white/70'
                                }`}
                                style={{ 
                                    borderLeftColor: activeSection === section.id ? roleData.accent : 'transparent',
                                    backgroundColor: activeSection === section.id ? `${roleData.accent}10` : ''
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <section.icon size={18} strokeWidth={activeSection === section.id ? 2.5 : 2} />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{section.name}</span>
                                </div>
                                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all ${activeSection === section.id ? 'opacity-30' : ''}`} />
                            </button>
                        ))}
                    </nav>

                    {}
                    <main className="bg-white/[0.02] border border-white/5 rounded-sm p-12 min-h-[600px] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-white/[0.02] to-transparent -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                                        {roleData.sections.find(s => s.id === activeSection)?.name}
                                    </h2>
                                    <p className="text-sm font-medium text-white/40 max-w-xl leading-relaxed">
                                        {roleData.sections.find(s => s.id === activeSection)?.description}. Configure your parameters to optimize your {role} experience on the system.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[1, 2].map(i => (
                                            <div key={i} className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Parameter Configuration {i}</label>
                                                <input type="text" className="w-full bg-[#050608] border border-white/10 px-5 py-4 rounded-sm text-sm text-white focus:border-white/30 outline-none transition-all" defaultValue={`Setting_V${i}.config`} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between group hover:border-white/20 transition-all">
                                        <div>
                                            <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Advanced Mode Configuration</p>
                                            <p className="text-xs text-white/40 font-medium">Toggle high-density interface and full system logs</p>
                                        </div>
                                        <div className="w-12 h-6 bg-white/10 rounded-full p-1 cursor-pointer transition-all hover:bg-white/20">
                                            <div className="w-4 h-4 bg-white/30 rounded-full" />
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-sm text-yellow-500">
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Critical Verification Required</p>
                                                <p className="text-xs text-white/40 font-medium leading-relaxed max-w-md">Some settings in this sequence require hardware key authorization or 2FA syncing. Consult global security logs.</p>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-yellow-500/80 hover:text-yellow-500 transition-all border-b border-yellow-500/20">Initialize Security Check</button>
                                    </div>
                                </div>

                                <div className="pt-12 border-t border-white/5 flex items-center gap-6">
                                    <button 
                                        className="bg-white text-black px-10 py-4 rounded-sm font-black uppercase text-[11px] tracking-widest hover:bg-white/90 transition-all flex items-center gap-3 shadow-xl"
                                        style={{ backgroundColor: roleData.accent, color: '#000' }}
                                    >
                                        Apply Settings <CheckCircle2 size={16} />
                                    </button>
                                    <button className="text-[11px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-all">Discard Changes</button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>

                {}
                <div className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">System Terminal v4.2.0-STABLE — Role: {role}</p>
                </div>
            </div>

            {}
            <div className="fixed top-0 right-0 w-[80vw] h-[80vh] bg-gradient-radial from-[#1a73e8]/5 to-transparent -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10 blur-[100px]" />
        </div>
    );
}
