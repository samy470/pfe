'use client';
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, User, ChevronRight, CheckCircle2, Globe, ShieldCheck, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./contact.module.css";

const ContactPage = () => {
    const lang = useSelector((state: RootState) => state.language.lang);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className={styles.contactWrapper} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className={styles.gridOverlay} />
            <div className={styles.glowTop} />
            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <Link href="/" className={styles.homeBtn}>
                            <ArrowLeft className="w-4 h-4" />
                            <span>Return Home</span>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20 space-y-6"
                    >
                        <h1 className="text-6xl lg:text-8xl font-black italic tracking-tighter leading-none text-white uppercase">
                            DIRECT <span className="text-[#6366f1]">CONTACT</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                             Our support agents are ready to assist with technical queries, publisher inquiries, or platform feedback.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4 space-y-6">
                            {[
                                { icon: Mail, title: "Email", detail: "[EMAIL ADDRESS]", link: "Draft Email" },
                                { icon: Globe, title: "Social Feed", detail: "@insta-facebook-X", link: "Follow Us" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={styles.infoCard}
                                >
                                    <div className={styles.iconBox}>
                                        <item.icon className="w-6 h-6 text-[#6366f1]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-white uppercase italic">{item.title}</h3>
                                        <p className="text-gray-500 font-bold text-sm">{item.detail}</p>
                                        <div className={styles.cardLink}>
                                            {item.link} <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            className="lg:col-span-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className={styles.formContainer}>
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-20"
                                        >
                                            <div className={styles.successCircle}>
                                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                                            </div>
                                            <h2 className="text-4xl font-black italic text-white uppercase mb-4">Transmission Received</h2>
                                            <p className="text-gray-400 max-w-md mx-auto mb-10">
                                                Your message has been sent to our admin terminal. Check your inbox for a confirmation.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <button onClick={() => setSubmitted(false)} className={styles.secondaryBtn}>
                                                    New message
                                                </button>
                                                <Link href="/" className={styles.primaryBtn}>
                                                    <Home className="w-4 h-4" />
                                                    Go home
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className={styles.inputGroup}>
                                                    <label>Name</label>
                                                    <div className={styles.inputWrapper}>
                                                        <User className={styles.inputIcon} />
                                                        <input required type="text" placeholder=" " />
                                                    </div>
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label>Your Email</label>
                                                    <div className={styles.inputWrapper}>
                                                        <Mail className={styles.inputIcon} />
                                                        <input required type="email" placeholder=" " />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Subject</label>
                                                <div className={styles.inputWrapper}>
                                                    <input required type="text" placeholder=" " />
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Message</label>
                                                <div className={styles.inputWrapper}>
                                                    <textarea required rows={5} placeholder=" " />
                                                </div>
                                            </div>

                                            <button disabled={loading} type="submit" className={styles.submitBtn}>
                                                {loading ? (
                                                    <div className={styles.loader} />
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        <span>Send Message</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;