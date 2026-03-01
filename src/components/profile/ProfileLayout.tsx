'use client';
import React, { useState } from 'react';
import styles from './Profile.module.css';
import { Settings, Trophy, Gamepad2, Users, FolderOpen, History, BarChart3, Shield, Package, Heart, LogOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileLayoutProps {
  user: {
    username: string;
    avatar?: string;
    level: number;
    status: string;
    role: 'admin' | 'publisher' | 'customer';
  };
  activities: {
    game: string;
    image: string;
    hours: number;
    lastPlayed: string;
  }[];
  stats: {
    label: string;
    value: string | number;
  }[];
  children?: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ user, activities, stats, children }) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'games' | 'inventory' | 'settings'>('activity');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activity':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3>Recent Activity</h3>
            {activities.map((act, i) => (
              <div key={i} className={styles.activityCard}>
                <div className={styles.gameHeader}>
                  <img src={act.image} alt={act.game} className={styles.gameThumb} />
                  <div className={styles.gameDetails}>
                    <h4 className={styles.gameTitle}>{act.game}</h4>
                    <p className={styles.playTime}>{act.hours} hrs on record</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">Last played on {act.lastPlayed}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 'games':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
                <h3>Library</h3>
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8f98a0]" />
                    <input 
                        type="text" 
                        placeholder="Search your games..." 
                        className="bg-[#1b2838] border border-[#2a3f55] rounded-sm pl-9 pr-4 py-1.5 text-xs text-white focus:border-[#66c0f4] outline-none w-48"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {activities.map((act, i) => (
                    <div key={i} className="bg-[#16202d] border border-[#2a3f55] p-3 rounded-sm flex gap-3 items-center hover:border-[#66c0f4] transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-black/20 rounded-sm overflow-hidden flex-shrink-0">
                            <img src={act.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight">{act.game}</p>
                            <p className="text-[10px] text-[#8f98a0]">Purchased on Jan 12</p>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
        );
      case 'inventory':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3>{user.role === 'customer' ? 'Purchase History' : user.role === 'publisher' ? 'Sales Revenue' : 'System Logs'}</h3>
            <div className="bg-[#16202d] border border-[#2a3f55] rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="bg-[#1b2838] text-[#8f98a0] border-b border-[#2a3f55]">
                            <th className="px-4 py-3 font-bold uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-wider">Reference</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 font-bold uppercase tracking-wider text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#c7d5e0]">
                        {[1, 2, 3].map((_, i) => (
                            <tr key={i} className="border-b border-[#2a3f55]/50 hover:bg-[#1b2838]/50 transition-colors">
                                <td className="px-4 py-4">Mar {i + 1}, 2026</td>
                                <td className="px-4 py-4 font-mono">GV-9823-{i}</td>
                                <td className="px-4 py-4 text-[#5ba32b] font-bold">-{2500 * (i + 1)} DA</td>
                                <td className="px-4 py-4 text-right">
                                    <span className="bg-[#5ba32b]/10 text-[#5ba32b] px-2 py-0.5 rounded-sm border border-[#5ba32b]/20">COMPLETED</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3>Account Settings</h3>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#8f98a0] uppercase tracking-wider">Display Name</label>
                    <input type="text" defaultValue={user.username} className="w-full bg-[#1b2838] border border-[#2a3f55] p-3 rounded-sm text-white text-sm focus:border-[#66c0f4] outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#8f98a0] uppercase tracking-wider">Status Message</label>
                    <input type="text" defaultValue={user.status} className="w-full bg-[#1b2838] border border-[#2a3f55] p-3 rounded-sm text-white text-sm focus:border-[#66c0f4] outline-none" />
                </div>
            </div>
            <div className="flex justify-end gap-3 pt-6 border-t border-[#2a3f55]">
                <button className="px-6 py-2 bg-[#1b2838] border border-[#2a3f55] text-xs font-bold text-white rounded-sm hover:bg-[#16202d]">Cancel</button>
                <button className="px-8 py-2 bg-[#66c0f4] text-[#0e141b] text-xs font-bold rounded-sm hover:bg-[#1999ff]">Save Changes</button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={styles.profileContainer}>
      
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img 
            src={user.avatar || "https://avatars.githubusercontent.com/u/67915014?v=4"} 
            alt={user.username} 
            className={styles.avatar} 
          />
        </div>
        
        <div className={styles.headerInfo}>
          <div className="flex items-center gap-3 mb-1">
             <h1 className={styles.username}>{user.username}</h1>
             <span className="bg-[#66c0f4]/10 text-[#66c0f4] text-[9px] font-black uppercase px-2 py-0.5 rounded-sm border border-[#66c0f4]/20">{user.role}</span>
          </div>
          <p className={styles.status}>{user.status}</p>
          <div className="mt-4 flex gap-4">
            <button 
                onClick={() => setActiveTab('settings')}
                className="bg-[#1b2838] border border-[#2a3f55] hover:bg-[#16202d] text-white px-5 py-2 rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-inner"
            >
              <Settings size={14} className="text-[#66c0f4]" /> Edit Profile
            </button>
            <button className="bg-[#1b2838] border border-[#2a3f55] hover:bg-[#16202d] text-white px-5 py-2 rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-inner">
              <LogOut size={14} className="text-red-500" /> Logout
            </button>
          </div>
        </div>

        <div className={styles.levelSection}>
          <div className="flex items-center gap-3 justify-end">
            <span className="text-[#8f98a0] text-sm font-bold uppercase tracking-wider">Level</span>
            <div className={styles.levelCircle}>
              <span>{user.level}</span>
            </div>
          </div>
          
          <div className="bg-[#16202d] p-4 rounded-sm border border-[#2a3f55] text-left text-[11px] text-[#8f98a0] hover:border-[#66c0f4]/30 transition-all">
            <div className="flex items-center gap-2 mb-2 text-white font-bold">
                <Trophy size={14} className="text-amber-500" />
                Featured Badge
            </div>
            Display one of your earned badges here. Select from the editor.
          </div>
        </div>
      </header>

      
      <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tab} ${activeTab === 'activity' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('activity')}
          >
              <History size={14} className="inline mr-2" /> Activity
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'games' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('games')}
          >
              <Gamepad2 size={14} className="inline mr-2" /> Games
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'inventory' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
              <Package size={14} className="inline mr-2" /> {user.role === 'customer' ? 'Inventory' : user.role === 'publisher' ? 'Finances' : 'Logs'}
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'settings' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('settings')}
          >
              <Settings size={14} className="inline mr-2" /> Settings
          </button>
      </div>

      
      <div className={styles.contentGrid}>
        <div className={styles.mainSection}>
           <AnimatePresence mode="wait">
             {renderTabContent()}
           </AnimatePresence>
          {children}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h4 className="flex justify-between items-center text-emerald-500">
               ONLINE
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h4>
            <div className="text-[11px] text-[#8f98a0] mt-2">Currently browsing the repository</div>
          </div>

          <div className={styles.sidebarSection}>
            <h4>
               BADGES
               <span className="text-[#8f98a0]">1</span>
            </h4>
            <div className={styles.badgeGrid}>
              <div className={styles.badge}>
                <div className="p-2">
                  <span className="text-[#66c0f4] text-[10px] font-black uppercase tracking-tighter italic">5+ Yrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
             <h4>
                CONNECTIONS
                <span className="text-[#8f98a0]">10</span>
             </h4>
             <div className="space-y-1">
                <a href="#" className={styles.linkItem}>Inventory <FolderOpen size={12} className="text-[#8f98a0]" /></a>
                <a href="#" className={styles.linkItem}>Wishlist <Heart size={12} className="text-[#8f98a0]" /></a>
                <a href="#" className={styles.linkItem}>Reviews <BarChart3 size={12} className="text-[#8f98a0]" /></a>
                <a href="#" className={styles.linkItem}>Security <Shield size={12} className="text-[#8f98a0]" /></a>
             </div>
          </div>

          <div className={styles.sidebarSection}>
            <h4>FRIENDS</h4>
            <div className="space-y-3">
               <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-black/40 border border-[#2a3f55] rounded-sm flex items-center justify-center group-hover:border-[#66c0f4] transition-all overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-red-500/20" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#c7d5e0] font-bold group-hover:text-[#66c0f4] transition-all">Support Agent #01</p>
                    <p className="text-[10px] text-emerald-500 font-bold">Online</p>
                  </div>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfileLayout;
