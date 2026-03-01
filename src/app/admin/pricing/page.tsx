'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setPricingStrategy } from '@/redux/shopSlice';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, ShieldCheck } from 'lucide-react';

export default function PricingEngine() {
    const dispatch = useDispatch();
    const currentStrategy = useSelector((state: RootState) => state.cart.pricingStrategy);

    const strategies = [
        {
            id: 'default',
            name: 'Standard Pricing',
            description: 'Regular pricing without active modifiers. Multiplier: 1.0x',
            icon: Zap,
            color: '#94a3b8',
        },
        {
            id: 'sale',
            name: 'Flash Sale (20% OFF)',
            description: '20% discount across all store items. Multiplier: 0.8x',
            icon: TrendingDown,
            color: '#10b981',
        },
        {
            id: 'premium',
            name: 'Premium Adjustment (20% Up)',
            description: '20% increase for peak periods. Multiplier: 1.2x',
            icon: ShieldCheck,
            color: '#f59e0b',
        },
    ];

    return (
        <div className="relative min-h-screen w-full bg-transparent">
            <div className="relative p-8 md:p-12 w-full">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-[#66c0f4] rounded-sm" />
                        <p className="text-[#66c0f4] font-black uppercase tracking-[0.3em] text-[10px]">Financial Engine</p>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Pricing <span className="text-[#66c0f4]">Models</span></h1>
                </div>

                <div className="grid gap-4 mb-10">
                    {strategies.map((strategy, i) => (
                        <motion.div
                            key={strategy.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => dispatch(setPricingStrategy(strategy.id as 'default' | 'sale' | 'premium'))}
                            className={`p-6 rounded-sm border cursor-pointer transition-all duration-200 ${
                                currentStrategy === strategy.id
                                    ? 'bg-[#1b2838] border-[#66c0f4] shadow-[0_0_20px_rgba(102,192,244,0.1)]'
                                    : 'bg-[#16202d] border-[#2a3f55] hover:border-[#66c0f4]/50'
                            }`}
                        >
                            <div className="flex items-center gap-6">
                                <div
                                    className={`w-12 h-12 rounded-sm flex items-center justify-center transition-colors ${
                                        currentStrategy === strategy.id ? 'bg-[#66c0f4] text-[#0e141b]' : 'bg-[#1b2838] border border-[#2a3f55]'
                                    }`}
                                    style={currentStrategy !== strategy.id ? { color: strategy.color } : {}}
                                >
                                    <strategy.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-black uppercase text-[#c7d5e0]">{strategy.name}</h3>
                                    <p className="text-[#8f98a0] text-[10px] font-bold uppercase tracking-wider">{strategy.description}</p>
                                </div>
                                {currentStrategy === strategy.id && (
                                    <div className="bg-[#66c0f4] text-[#0e141b] px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest">
                                        Selected
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-8 rounded-sm bg-[#16202d] border border-[#2a3f55] shadow-inner">
                    <h4 className="text-[10px] font-black text-[#66c0f4] uppercase tracking-[0.3em] mb-6">Execution Log</h4>
                    <div className="font-mono text-[11px] text-[#556772] space-y-3">
                        <p className="flex gap-4 items-start">
                            <span className="shrink-0">[{new Date().toLocaleTimeString()}]</span>
                            <span className="text-[#66c0f4] font-bold shrink-0">INTEL:</span>
                            <span className="uppercase font-bold">Policy synchronized with blockchain.</span>
                        </p>
                        <p className="flex gap-4 items-start">
                            <span className="shrink-0">[{new Date().toLocaleTimeString()}]</span>
                            <span className="text-[#66c0f4] font-bold shrink-0">INTEL:</span>
                            <span className="uppercase font-bold">Active multiplier verified: {currentStrategy === 'sale' ? '0.8x' : currentStrategy === 'premium' ? '1.2x' : '1.0x'}.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
