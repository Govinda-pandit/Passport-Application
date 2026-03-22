import { Link } from 'react-router-dom';
import { FileText, CalendarCheck, ShieldCheck, ArrowRight, Shield, Globe2, Compass } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{ 
                position: 'relative',
                padding: '6rem 2rem', 
                background: 'linear-gradient(145deg, #eef2ff 0%, #f0fdf4 100%)', 
                borderRadius: '0 0 var(--radius-xl) var(--radius-xl)', 
                marginBottom: '5rem', 
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
            }}>
                {/* Abstract floating shapes */}
                <div className="animate-float" style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.1 }}>
                    <Globe2 size={120} color="var(--primary)" />
                </div>
                <div className="animate-float delay-200" style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.1 }}>
                    <Compass size={150} color="var(--accent)" />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontWeight: '600', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)', fontSize: '0.875rem' }}>
                        <Shield size={16} /> Official Passport Seva Portal Redesigned
                    </div>
                
                    <h1 style={{ color: '#0f172a', fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                        Passport Application, <br/>
                        <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Simplified & Fast.
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto', color: '#475569', lineHeight: '1.6' }}>
                        Experience a stress-free passport application. Guided modern forms, auto-saving drafts, and a seamless appointment scheduling process designed for you.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {user ? (
                            <Link to="/dashboard" className="btn btn-primary card-hover" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                                Go to Dashboard <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="btn btn-primary card-hover" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                                    Start New Application
                                </Link>
                                <Link to="/login" className="btn btn-secondary card-hover" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                                    Resume Draft
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="container" style={{ marginBottom: '6rem' }}>
                <div className="text-center mb-12">
                    <h2 style={{ fontSize: '2.5rem' }}>How it works</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>Getting your passport is now a straightforward 3-step digital journey without the confusion.</p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    
                    <div className="card card-hover text-center" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, #eef2ff 0%, #c7d2fe 100%)', 
                            width: '80px', height: '80px', 
                            borderRadius: '24px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            margin: '0 auto 2rem auto', 
                            color: 'var(--primary)',
                            transform: 'rotate(-5deg)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <FileText size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Smart Form</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Our intuitive form guides you step-by-step. Don't worry if you get interrupted, we automatically save your progress securely in the cloud.</p>
                    </div>

                    <div className="card card-hover text-center delay-100" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', 
                            width: '80px', height: '80px', 
                            borderRadius: '24px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            margin: '0 auto 2rem auto', 
                            color: 'var(--accent)',
                            transform: 'rotate(5deg)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <CalendarCheck size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Book Slot</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Choose a convenient date and time at your nearest Passport Seva Kendra directly from our dashboard.</p>
                    </div>

                    <div className="card card-hover text-center delay-200" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', 
                            width: '80px', height: '80px', 
                            borderRadius: '24px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            margin: '0 auto 2rem auto', 
                            color: 'var(--success)',
                            transform: 'rotate(-5deg)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <ShieldCheck size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Verify & Submit</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Upload required documents for pre-verification. Submit your digital application securely and get an instant receipt.</p>
                    </div>

                </div>
            </section>
        </div>
    );
}
