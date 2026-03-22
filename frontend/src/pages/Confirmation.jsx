import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Download, Share2, MapPin, Calendar, Clock, ArrowLeft, ShieldCheck, Printer } from 'lucide-react';

export default function Confirmation() {
    const { id } = useParams();
    const { API_URL } = useContext(AuthContext);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplication(res.data);
            } catch (err) {
                console.error("Failed to load application confirmation", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApp();
    }, [id, API_URL]);

    if (loading) return <div className="container text-center mt-12 mb-12" style={{ color: 'var(--text-muted)' }}>Fetching receipt details...</div>;
    if (!application) return <div className="container text-center mt-12 mb-12 text-error">Application record not found.</div>;

    const data = application.formData || {};

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '850px', paddingBottom: '5rem' }}>
            
            <Link to="/dashboard" className="btn btn-secondary flex items-center gap-2 mb-8" style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <div className="card text-center relative overflow-hidden mb-8" style={{ borderTop: '8px solid var(--success)', paddingTop: '4rem', paddingBottom: '4rem' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.03, transform: 'scale(1.5)' }}>
                    <ShieldCheck size={300} />
                </div>
                
                <div style={{ background: 'var(--success-light)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--success)', boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}>
                    <CheckCircle size={56} />
                </div>
                
                <h1 style={{ color: '#065f46', fontSize: '3rem', marginBottom: '0.5rem' }}>Application Submitted</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your passport request is now in our system.</p>
                
                <div style={{ background: '#f8fafc', display: 'inline-block', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', border: '2px dashed var(--border-light)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Application Reference No.</span>
                    <span style={{ fontWeight: '700', fontSize: '1.75rem', color: 'var(--text-main)', fontFamily: 'monospace', letterSpacing: '2px' }}>
                        {id.substring(0,12).toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                        <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
                            <Calendar size={22} />
                        </div>
                        Appointment Details
                    </h3>
                    
                    {data.appointmentDate ? (
                        <div className="flex-col gap-6">
                            <div>
                                <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>Location / PSK Center</span>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1.1rem' }}>
                                    <MapPin size={20} style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} /> 
                                    <span>{data.appointmentCenter || 'Not specified'}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>Date</span>
                                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <Calendar size={18} style={{ color: 'var(--accent)' }} /> 
                                        <span>{new Date(data.appointmentDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>Time Slot</span>
                                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <Clock size={18} style={{ color: 'var(--warning)' }} /> 
                                        <span>{data.appointmentTime || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No appointment scheduled yet. You can book this later via dashboard.</p>
                    )}
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)', border: '1px solid var(--primary-light)' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Next Steps Checklist</h3>
                    <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Please bring the following original documents to the PSK.</p>
                    
                    <ul className="flex-col gap-4">
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ background: 'white', border: '2px solid var(--primary)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                                <Printer size={14} />
                            </div>
                            <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Printed copy of this application receipt.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ background: 'white', border: '2px solid var(--text-light)', width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}></div>
                            <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Original Proof of Address (e.g. Aadhar)</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{ background: 'white', border: '2px solid var(--text-light)', width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}></div>
                            <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>Original Proof of Birth (e.g. PAN)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex gap-4 justify-center mt-12">
                <button className="btn btn-primary flex items-center gap-2 card-hover" onClick={() => alert('Mock: Generating PDF Receipt for Download...')} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    <Download size={20} /> Download PDF Receipt
                </button>
                <button className="btn btn-secondary flex items-center gap-2 card-hover" onClick={() => alert('Mock: Copied tracking link to clipboard.')} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    <Share2 size={20} /> Share via Web
                </button>
            </div>
            
        </div>
    );
}
