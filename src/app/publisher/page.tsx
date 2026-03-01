'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfileLayout from '@/components/profile/ProfileLayout';

export default function PublisherDashboard() {
    const { username } = useSelector((state: RootState) => state.auth);

    const activities = [
        { 
            game: 'God of War Hub', 
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg', 
            hours: 324, 
            lastPlayed: '1 Mar' 
        },
        { 
            game: 'Elden Ring Editor', 
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg', 
            hours: 586, 
            lastPlayed: '28 Feb' 
        },
        { 
            game: 'Cyberpunk Analytics', 
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', 
            hours: 274, 
            lastPlayed: '21 Feb' 
        }
    ];

    const stats = [
        { label: 'Published Games', value: 12 },
        { label: 'Total Sales', value: '45.2k' },
        { label: 'Avg Rating', value: 4.8 },
    ];

    const profileUser = {
        username: username || 'Publisher_Demo',
        level: 42,
        status: 'Developing "Project Red"',
        role: 'publisher' as const,
        avatar: 'https://avatars.githubusercontent.com/u/67915014?v=4'
    };

    return (
        <div className="min-h-screen bg-transparent">
            <ProfileLayout 
                user={profileUser} 
                activities={activities} 
                stats={stats}
            >
                <div className="mt-8 p-6 bg-black/30 border border-white/5 rounded-sm">
                    <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Publisher Analytics Snapshot</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-[var(--primary)] text-xl font-black">124k</p>
                            <p className="text-[9px] text-gray-500 uppercase">Total Reach</p>
                        </div>
                        <div className="text-center">
                            <p className="text-emerald-500 text-xl font-black">92%</p>
                            <p className="text-[9px] text-gray-500 uppercase">Positive</p>
                        </div>
                        <div className="text-center">
                            <p className="text-amber-500 text-xl font-black">15</p>
                            <p className="text-[9px] text-gray-500 uppercase">Awards</p>
                        </div>
                    </div>
                </div>
            </ProfileLayout>
        </div>
    );
}
