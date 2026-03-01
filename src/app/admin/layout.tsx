'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Users,
  Gamepad2,
  LayoutDashboard,
  ShieldCheck,
  Banknote,
  LogOut,
  ChevronRight,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SilkBlueBackground from '@/components/SilkBlueBackground';

const navItems = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Operator Profile', path: '/admin/profile', icon: Users, exact: false },
  { name: 'User Management', path: '/admin/users', icon: Users, exact: false },
  { name: 'Game Catalog', path: '/admin/games', icon: Gamepad2, exact: false },
  { name: 'Pricing Engine', path: '/admin/pricing', icon: Banknote, exact: false },
  { name: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck, exact: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  const isActive = (path: string, exact: boolean) =>
    exact ? pathname === path : pathname.startsWith(path);

  return (
    <div className="min-h-screen text-white flex relative bg-[#0e141b]">
      <SilkBlueBackground />
      <aside className="w-72 border-r border-[#2a3f55] bg-[#16202d] flex flex-col fixed left-0 top-0 bottom-0 z-40">
        <div className="p-8 pt-10 border-b border-[#2a3f55]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-[#1b2838] border border-[#2a3f55] flex items-center justify-center group-hover:border-[#66c0f4] transition-all">
              <ShieldCheck size={20} className="text-[#66c0f4]" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-[#c7d5e0]">SYSTEM <span className="text-[#66c0f4]">ADMIN</span></h1>
              <p className="text-[9px] font-bold text-[#8f98a0] uppercase tracking-[0.2em] -mt-1">Control Center</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-5 py-4 font-bold text-xs uppercase tracking-wider transition-all duration-200 group ${
                isActive(item.path, !!item.exact)
                  ? 'bg-[#1b2838] text-white border-l-4 border-l-[#66c0f4]'
                  : 'text-[#8f98a0] hover:text-white hover:bg-[#1b2838]/50 border-l-4 border-l-transparent'
              }`}
            >
              <item.icon
                size={18}
                className={isActive(item.path, !!item.exact) ? 'text-[#66c0f4]' : 'text-[#8f98a0] group-hover:text-gray-300'}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 ml-72 flex flex-col min-h-screen relative z-10">
          <header className="h-20 bg-[#16202d]/80 backdrop-blur-md border-b border-[#2a3f55] flex items-center justify-between px-10 fixed right-0 left-72 z-30">
              <div>
                  <h3 className="text-[#c7d5e0] font-black text-sm uppercase tracking-widest">
                      {navItems.find(i => isActive(i.path, !!i.exact))?.name || 'Dashboard'}
                  </h3>
              </div>
              
              <div className="flex items-center gap-6">
                  <div className="h-8 w-[1px] bg-[#2a3f55]" />
                  <div className="flex items-center gap-4">
                      <div className="text-right">
                          <p className="text-[10px] font-bold text-[#8f98a0] uppercase tracking-widest">Root Access</p>
                          <p className="text-xs font-black text-white">{username || 'ADMIN_USER'}</p>
                      </div>
                      <Link href="/admin/profile">
                        <div className="w-10 h-10 rounded-sm bg-[#1b2838] border border-[#2a3f55] flex items-center justify-center hover:border-[#66c0f4] transition-all cursor-pointer text-[#66c0f4]">
                            <User size={20} />
                        </div>
                      </Link>
                      <button 
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/Login';
                        }}
                        className="p-2.5 rounded-sm bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        title="Sign Out"
                      >
                        <LogOut size={16} />
                      </button>
                  </div>
              </div>
          </header>

          <main className="flex-1 p-10 mt-20 overflow-x-hidden min-w-0">
              {children}
          </main>
      </div>
    </div>
  );
}
