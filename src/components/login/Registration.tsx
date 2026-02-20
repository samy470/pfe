'use client'
import { LogIn } from 'lucide-react'; 
import AnoAI from '@/components/AnimatedBackground';
import FlipTextReveal from '@/components/FlipText/FlipTextReveal';
import styles from '../login/Login.module.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
            setError("Could not connect to server. Make sure the backend is running.");
        }
    };

    return (
        <main className={styles.pageWrapper}>
            <AnoAI />
            <FlipTextReveal word="JOIN US" />
            
            <div className={styles.loginCard}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>Register</h2>
                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input id="username" type="text" value={data.username} onChange={handleChange} style={inputStyle} required />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input id="email" type="email" value={data.email} onChange={handleChange} style={inputStyle} required />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input id="password" type="password" value={data.password} onChange={handleChange} style={inputStyle} required />
                    </div>

                    {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                    <button type="submit" className={styles.loginBtn}>Create Account</button>

                    <div className={styles.registerSection}>
                        <p>Already have an account? Login here</p>
                        <button 
                            type="button"
                            className={styles.iconButton} 
                            onClick={() => router.push("/Login")}
                        >
                            <LogIn size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', background: '#000', border: '1px solid #333', color: '#fff' };

export default Register;