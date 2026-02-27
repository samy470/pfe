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
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                router.push('/Login');
            } else {
                setError(result.error || 'Registration failed. Please try again.');
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
                <form onSubmit={handleRegister}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>{t(lang, 'username')}</label>
                        <input id="username" type="text" value={data.username} onChange={handleChange} className={styles.inputField} required autoComplete="username" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>{t(lang, 'email')}</label>
                        <input id="email" type="email" value={data.email} onChange={handleChange} className={styles.inputField} required autoComplete="email" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="role" className={styles.label}>{t(lang, 'accountType')}</label>
                        <div className={styles.selectWrapper}>
                            <select
                                id="role"
                                name="role"
                                className={styles.customSelect}
                                value={data.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled hidden>{t(lang, 'selectRole')}</option>
                                <option value="customer">{t(lang, 'customer')}</option>
                                <option value="publisher">{t(lang, 'publisher')}</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>{t(lang, 'password')}</label>
                        <input id="password" type="password" value={data.password} onChange={handleChange} className={styles.inputField} required autoComplete="new-password" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>{t(lang, 'confirmPassword')}</label>
                        <input id="confirmPassword" type="password" value={data.confirmPassword} onChange={handleChange} className={styles.inputField} required autoComplete="new-password" />
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
            </div>
        </main>
    );
};

export default Register;