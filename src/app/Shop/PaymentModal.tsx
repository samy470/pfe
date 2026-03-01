'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';


const stripePromise = loadStripe('pk_test_51PFE_MOCK_KEY_PROTCOL_7');

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#4d5a69',
            },
        },
        invalid: {
            color: '#ff4b4b',
            iconColor: '#ff4b4b',
        },
    },
};

function CheckoutForm({ total, onSuccess, onCancel }: { total: number, onSuccess: () => void, onCancel: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);


        await new Promise(resolve => setTimeout(resolve, 2000));

        const cardElement = elements.getElement(CardElement);

        
        setIsProcessing(false);
        toast.success("Transaction Authorized. Repository updated.");
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#0b1119] border border-[#2a3f55] p-4 rounded-sm">
                <div className="flex items-center gap-2 mb-4 text-[#6699cc]">
                    <CreditCard size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Secure Credit Interface</span>
                </div>
                
                <div className="p-3 bg-[#16202d] border border-[#1a73e8]/20 rounded-sm">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-tight">
                    <ShieldCheck size={12} />
                    SSL Encrypted
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-tight justify-end">
                    <Lock size={12} />
                    Anti-Fraud Active
                </div>
            </div>

            <div className="pt-4 border-t border-[#2a3f55] flex flex-col gap-3">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-400 text-xs font-bold uppercase">Total Order</span>
                    <span className="text-2xl font-black text-white">{total.toLocaleString()} DA</span>
                </div>

                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full bg-[#1a73e8] hover:bg-[#1a88ff] disabled:opacity-50 text-white py-4 rounded-sm font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#1a73e8]/20"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Authorizing...
                        </>
                    ) : (
                        <>
                            Complete Purchase
                            <ChevronRight size={18} />
                        </>
                    )}
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest py-2 transition-colors"
                >
                    Return to Catalog
                </button>
            </div>
        </form>
    );
}

export default function PaymentModal({ 
    isOpen, 
    onClose, 
    total, 
    onSuccess 
}: { 
    isOpen: boolean, 
    onClose: () => void, 
    total: number, 
    onSuccess: () => void 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#1b2838] border border-[#2a3f55] w-[480px] p-8 shadow-2xl relative overflow-hidden"
            >
                {}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1a73e8] to-transparent animate-pulse" />
                
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-[#1a73e8] rounded-full animate-ping" />
                            <span className="text-[#66c0f4] text-[10px] font-black uppercase tracking-[0.3em]">Billing_Interface</span>
                        </div>
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Secure Transaction</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm total={total} onSuccess={onSuccess} onCancel={onClose} />
                </Elements>
            </motion.div>
        </div>
    );
}
