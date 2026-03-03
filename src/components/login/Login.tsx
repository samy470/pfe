'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnoAI from '@/components/AnimatedBackground';
import FlipTextReveal from '@/components/FlipText/FlipTextReveal';
import styles from './Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { t } from '@/lib/i18n';
import type { AppDispatch } from '@/redux/store';

const Login = ({ onLogin }: { onLogin?: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const lang = useSelector((state: RootState) => state.language.lang);
  const dir = useSelector((state: RootState) => state.language.dir);

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('role', result.user.role);
        dispatch(setUser({ role: result.role, username: result.username }));
        onLogin?.();
        window.location.href = '/'
      } else {
        setError(result.message || 'Invalid username or password');
      }
    } catch (err) {
      setError("Cannot connect to backend.");
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
      <FlipTextReveal word="CONNECT" />

      <div className={styles.loginCard}>
        <h2 className={styles.cardTitle}>{t(lang, 'login')}</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>{t(lang, 'username')}</label>
            <input
              id="username"
              type="text"
              value={data.username}
              onChange={handleChange}
              className={styles.inputField}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>{t(lang, 'password')}</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={handleChange}
              className={styles.inputField}
              required
              autoComplete="current-password"
            />
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
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? '...' : t(lang, 'signIn')}
          </button>

          <div className={styles.registerSection}>
            <p>{t(lang, 'noAccount')}</p>
            <Link
              href="/Registration"
              className={styles.registerLink}
            >
              {t(lang, 'registerHere')}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
