import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <div className="container flex justify-center items-center mt-12 mb-12 animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ maxWidth: '420px', width: '100%', padding: '3rem 2rem' }}>
                <div className="text-center mb-8">
                    <div style={{ 
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
                        width: '64px', height: '64px', 
                        borderRadius: '20px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        margin: '0 auto 1.5rem auto', 
                        color: 'white',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <LogIn size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem' }}>Welcome Back</h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Sign in to continue your application.</p>
                </div>
                
                {error && (
                    <div className="animate-fade-in" style={{ background: 'var(--error-light)', color: 'var(--error)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                        <CheckCircle2 size={18} /> {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex-col gap-6">
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                                <Mail size={20} />
                            </div>
                            <input type="email" id="email" placeholder="e.g. hire-me@anshumat.org" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ paddingLeft: '3rem' }} />
                        </div>
                    </div>

                    <div className="input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Password</label>
                            <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '500' }}>Forgot password?</Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                                <Lock size={20} />
                            </div>
                            <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingLeft: '3rem' }} />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Secure Sign In'}
                    </button>
                    
                    <p className="text-center mt-6" style={{ fontSize: '0.95rem' }}>
                        Don't have an account? <Link to="/signup" style={{ fontWeight: '600', color: 'var(--primary)' }}>Start application</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
