import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Plane, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ 
            background: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)', 
            padding: '1.25rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
        }}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3" style={{ color: 'var(--text-main)', fontWeight: '800', fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', padding: '0.4rem', borderRadius: '12px', color: 'white' }}>
                        <Plane size={24} />
                    </div>
                    Passport<span style={{ color: 'var(--primary)' }}>Seva</span>
                </Link>
                
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link" style={{ fontFamily: 'Outfit, sans-serif' }}>Dashboard</Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem', borderRight: '1px solid var(--border-light)' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--accent-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                    <User size={18} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1' }}>Applicant</div>
                                    <div style={{ fontWeight: '600', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif', lineHeight: '1.2' }}>{user.name}</div>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="btn btn-outline flex items-center gap-2" style={{ padding: '0.5rem 1rem', borderRadius: '12px' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem' }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Start Application</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
