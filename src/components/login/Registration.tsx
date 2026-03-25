'use client';
import Link from 'next/link';
import { LogIn, ArrowLeft } from 'lucide-react';
import AnoAI from '@/components/AnimatedBackground';
import FlipTextReveal from '@/components/FlipText/FlipTextReveal';
import styles from '../login/Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { t } from '@/lib/i18n';

const Register = () => {
    const router = useRouter();
    const lang = useSelector((state: RootState) => state.language.lang);
    const dir = useSelector((state: RootState) => state.language.dir);
    const [selectedRole, setSelectedRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://pfe-back-1.onrender.com/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setSuccess(true);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Could not connect to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.pageWrapper} dir={dir}>
            <Link href="/" className={styles.backArrow} aria-label="Back to home">
                <ArrowLeft size={24} />
            </Link>
            <AnoAI />
            <FlipTextReveal word="JOIN US" />

            <div className={styles.loginCard}>
                <h2 className={styles.cardTitle}>{t(lang, 'register2')}</h2>
                {success ? (
  <div className="text-center p-4 bg-green-100 text-green-700 rounded">
    Registration successful! Please check your email to verify your account.
  </div>
) : (
  <form onSubmit={handleRegister}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>{t(lang, 'username')}</label>
                        <input id="username" type="text" value={data.username} onChange={handleChange} className={styles.inputField} required autoComplete="username" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>{t(lang, 'email')}</label>
                        <input id="email" type="email" value={data.email} onChange={handleChange} className={styles.inputField} required autoComplete="email" />
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-600 text-center">Choose your Role</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => { setData(prev => ({ ...prev, role: 'admin' })); setSelectedRole('admin'); }}
                                className={`py-2 rounded-xl text-[10px] font-black transition-all ${selectedRole === 'admin' ? 'bg-[#6366f1] text-white' : 'bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white'}`}
                            >
                                {t(lang, 'Admin')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setData(prev => ({ ...prev, role: 'publisher' })); setSelectedRole('publisher'); }}
                                className={`py-2 rounded-xl text-[10px] font-black transition-all ${selectedRole === 'publisher' ? 'bg-[#6366f1] text-white' : 'bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white'}`}
                            >
                                {t(lang, 'Publisher')}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setData(prev => ({ ...prev, role: 'customer' })); setSelectedRole('customer'); }}
                                className={`py-2 rounded-xl text-[10px] font-black transition-all ${selectedRole === 'customer' ? 'bg-[#6366f1] text-white' : 'bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1] hover:text-white'}`}
                            >
                                {t(lang, 'Customer')}
                            </button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>{t(lang, 'password')}</label>
                        <input id="password" type={showPassword ? 'text' : 'password'} value={data.password} onChange={handleChange} className={styles.inputField} required autoComplete="new-password" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>{t(lang, 'confirmPassword')}</label>
                        <input id="confirmPassword" type={showPassword ? 'text' : 'password'} value={data.confirmPassword} onChange={handleChange} className={styles.inputField} required autoComplete="new-password" />
                    </div>

                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="showPassword"
                            className={styles.customCheckbox}
                            checked={showPassword}
                            onChange={() => setShowPassword((v) => !v)}
                        />
                        <label htmlFor="showPassword" className={styles.checkboxLabel}>
                            {t(lang, 'showPassword')}
                        </label>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.loginBtn} disabled={loading}>
                        {loading ? '...' : t(lang, 'createAccount')}
                    </button>

                    <div className={styles.registerSection}>
                        <p>{t(lang, 'alreadyAccount')}</p>
                        <button
                            type="button"
                            className={styles.iconButton}
                            onClick={() => router.push('/Login')}
                            aria-label="Go to login"
                        >
                            <LogIn size={18} />
                        </button>
                    </div>
                </form>
)}
                
            </div>
        </main>
    );
};

export default Register;
