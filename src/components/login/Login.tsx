'use client'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnoAI from '@/components/AnimatedBackground';
import FlipTextReveal from '@/components/FlipText/FlipTextReveal';
import styles from './Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Login = ({ onLogin }: { onLogin: () => void }) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e: any) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      }),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.username);
      onLogin();
      router.push("/");
    } else {
      setError(result.error || "Invalid username or password");
    }
  } catch (error) {
    console.error('Connection error:', error);
    setError("Backend is running but React can't connect. Check console.");
  }
};

    return (
    <main className={styles.pageWrapper}>
      <Link href="/" className={styles.backArrow} aria-label="Back to home">
        <ArrowLeft size={24} />
      </Link>
      <AnoAI />

      
      <FlipTextReveal word="CONNECT" />
      
      <div className={styles.loginCard}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>Login</h2>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '5px', background: '#000', border: '1px solid #333', color: '#fff' }} />
          </div>
          <div className={styles.inputGroup}>
    <label className={styles.label}>Password</label>
    <input 
        id="password"
        type={showPassword ? 'text' : 'password'} 
        value={data.password} 
        onChange={handleChange} 
        className={styles.inputField} 
        required 
    />
    
    <div className={styles.checkboxContainer}>
        <input 
            type="checkbox" 
            id="showPassword" 
            className={styles.customCheckbox}
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} 
        />
        <label htmlFor="showPassword" className={styles.checkboxLabel}>
            Show Password
        </label>
    </div>

    {error && <p className={styles.errorMessage}>{error}</p>}
</div>

         <button type="submit" className={styles.loginBtn}>Sign In</button>

        <div className={styles.registerSection}>
  <p>Dont have an account?</p>
  <Link 
    href="/Registration" 
    className={styles.registerLink} 
    style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'none', marginLeft: '5px' }}
  >
    Register here
  </Link>
</div>
       
        </form>
      </div>
    </main>
    )
}
export default Login;