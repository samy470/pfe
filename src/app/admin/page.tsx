'use client';
import { Users, Gamepad2, Banknote, ShieldCheck, TrendingUp, Activity, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-[#16202d] border border-[#2a3f55] p-6 rounded-sm relative overflow-hidden group hover:border-[#66c0f4] transition-all">
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black uppercase text-[#8f98a0] tracking-widest">{title}</p>
        <Icon size={20} className={color} />
      </div>
      <h3 className="text-3xl font-black text-white mb-1 tracking-tighter">{value}</h3>
      <p className="text-[10px] font-bold text-[#5ba32b]">{sub}</p>
    </div>
    <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity ${color}`}>
        <Icon size={120} />
    </div>
  </div>
);

export default function AdminOverview() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-2">
          <h2 className="text-[#66c0f4] font-black text-xs uppercase tracking-[0.3em]">System Overview</h2>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Platform <span className="text-[#66c0f4]">Pulse</span></h1>
      </header>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Users" value="12,842" sub="+12% from last week" icon={Users} color="text-blue-500" />
          <StatCard title="Live Games" value="482" sub="14 Pending review" icon={Gamepad2} color="text-[#66c0f4]" />
          <StatCard title="Total Revenue" value="2.4M DA" sub="+4.2% since yesterday" icon={Banknote} color="text-[#5ba32b]" />
          <StatCard title="Server Load" value="42%" sub="Operating at optimal levels" icon={Server} color="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">Recent Activity</h3>
                  <button className="text-[10px] font-black text-[#66c0f4] uppercase tracking-widest hover:underline">View All Logs</button>
              </div>
              <div className="bg-[#16202d] border border-[#2a3f55] rounded-sm overflow-hidden">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className="p-4 border-b border-[#2a3f55]/50 flex items-center justify-between hover:bg-[#1b2838]/50 transition-colors">
                          <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-sm bg-[#1b2838] flex items-center justify-center">
                                  <Activity size={14} className="text-[#66c0f4]" />
                              </div>
                              <div>
                                  <p className="text-sm text-white font-bold">New game submission: "Void Walker"</p>
                                  <p className="text-[10px] text-[#8f98a0] uppercase">Mar 1, 2026 - 14:23</p>
                              </div>
                          </div>
                          <span className="text-[9px] font-black bg-[#66c0f4]/10 text-[#66c0f4] px-2 py-0.5 rounded-sm border border-[#66c0f4]/20 uppercase">Pending</span>
                      </div>
                  ))}
              </div>
          </div>

          {}
          <div className="space-y-6">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Global Settings</h3>
              <div className="bg-[#1b2838] border border-[#2a3f55] p-6 rounded-sm space-y-4">
                  <div className="space-y-2">
                      <p className="text-[10px] font-black text-[#8f98a0] uppercase tracking-wider">Maintenance Mode</p>
                      <div className="flex items-center justify-between p-3 bg-[#0e141b] rounded-sm border border-[#2a3f55]">
                          <span className="text-xs font-bold text-red-500">OFFLINE</span>
                          <div className="w-10 h-5 bg-[#2a3f55] rounded-full relative cursor-pointer">
                              <div className="absolute left-1 top-1 w-3 h-3 bg-[#8f98a0] rounded-full" />
                          </div>
                      </div>
                  </div>
                  <div className="space-y-2 pt-4">
                      <button className="w-full bg-[#66c0f4] text-[#0e141b] py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-[#1999ff] transition-all">
                          Update Global Pricing
                      </button>
                      <button className="w-full bg-[#1b2838] text-[#c7d5e0] py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-[#16202d] transition-all border border-[#2a3f55]">
                          Database Backup
                      </button>
                  </div>
              </div>

              {}
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-red-500" />
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Security Alert</p>
                  </div>
                  <p className="text-xs text-[#c7d5e0]">3 Failed login attempts on root account detected. Integrity check recommended.</p>
              </div>
          </div>
      </div>
    </div>
  );
}
