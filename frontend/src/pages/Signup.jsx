import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight, ShieldCheck, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function Signup() {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Steps: 1. Basic Info -> 2. Password & Confirm
    const [step, setStep] = useState(1);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNext = (e) => {
        e.preventDefault();
        if(name && email) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signup(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to sign up');
            setLoading(false);
        }
    };

    return (
        <div className="container flex justify-center mt-12 mb-12 animate-fade-in" style={{ alignItems: 'flex-start' }}>
            <div className="grid grid-cols-2 gap-8" style={{ width: '100%', maxWidth: '1000px', alignItems: 'center' }}>
                
                {/* Visual Side */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2' }}>Your gateway to the world.</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Create an account securely to start your passport application process in minutes.</p>
                    </div>
                    
                    <div className="card" style={{ padding: '1.5rem', border: 'none', background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ color: 'var(--success)' }}>
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontFamily: 'Outfit' }}>Secure Data</h4>
                                <p style={{ fontSize: '0.875rem', margin: 0 }}>All your personal information is encrypted and securely stored.</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ color: 'var(--success)' }}>
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontFamily: 'Outfit' }}>Auto Save</h4>
                                <p style={{ fontSize: '0.875rem', margin: 0 }}>Never lose your progress with our automatic draft saving.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="card" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="text-center mb-6">
                        <div style={{ 
                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
                            width: '64px', height: '64px', 
                            borderRadius: '20px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            margin: '0 auto 1.5rem auto', 
                            color: 'white',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <UserPlus size={32} />
                        </div>
                        <h2 style={{ fontSize: '2rem' }}>Create Account</h2>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Step {step} of 2</p>
                    </div>
                    
                    {error && (
                        <div className="animate-fade-in" style={{ background: 'var(--error-light)', color: 'var(--error)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                            <CheckCircle2 size={18} /> {error}
                        </div>
                    )}
                    
                    <form onSubmit={step === 1 ? handleNext : handleSubmit} className="flex-col gap-6">
                        
                        {step === 1 && (
                            <div className="animate-slide-right flex-col gap-4">
                                <div className="input-group">
                                    <label htmlFor="name">Full Name (as per documents)</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                                            <User size={20} />
                                        </div>
                                        <input type="text" id="name" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} required style={{ paddingLeft: '3rem' }} />
                                    </div>
                                </div>
                                
                                <div className="input-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                                            <Mail size={20} />
                                        </div>
                                        <input type="email" id="email" placeholder="e.g. yourname@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ paddingLeft: '3rem' }} />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%' }}>
                                    Continue <ArrowRight size={18} />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-slide-right flex-col gap-4">
                                <div className="input-group">
                                    <label htmlFor="password">Create Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
                                            <Lock size={20} />
                                        </div>
                                        <input type="password" id="password" placeholder="Must be at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingLeft: '3rem' }} />
                                    </div>
                                </div>

                                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success-light)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--success)' }}>
                                    <ShieldCheck size={24} />
                                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Your connection is secure and encrypted.</span>
                                </div>
                                
                                <div className="flex gap-4 mt-4">
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                        {loading ? 'Creating...' : 'Create Account'}
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        <p className="text-center mt-6" style={{ fontSize: '0.95rem' }}>
                            Already have an account? <Link to="/login" style={{ fontWeight: '600', color: 'var(--primary)' }}>Login securely</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
