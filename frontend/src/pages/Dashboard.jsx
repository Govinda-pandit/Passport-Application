import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FilePlus, Edit, Eye, Clock, Download, ChevronRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
    const { API_URL, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/applications`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(res.data);
            } catch (err) {
                console.error("Failed to load applications", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, [API_URL]);

    const handleStartNew = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/applications`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate(`/apply/${res.data.id}`);
        } catch (err) {
            console.error(err);
            alert('Failed to start new application');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <div className="flex justify-between items-center mt-8 mb-12">
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name.split(' ')[0]}</h1>
                    <p style={{ fontSize: '1.1rem' }}>Manage and track your passport applications efficiently.</p>
                </div>
                <button onClick={handleStartNew} className="btn btn-primary shadow-glow flex items-center gap-2">
                    <FilePlus size={18} /> Start New Application
                </button>
            </div>

            {loading ? (
                <div className="text-center mt-12 mb-12" style={{ color: 'var(--text-muted)' }}>
                    Loading your applications...
                </div>
            ) : applications.length === 0 ? (
                <div className="card text-center flex-col items-center justify-center animate-fade-in delay-100" style={{ padding: '6rem 2rem', background: 'linear-gradient(to right, white, #f8fafc)' }}>
                    <div style={{ color: 'var(--text-light)', marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--bg-main)', borderRadius: '50%' }}>
                        <FilePlus size={64} />
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No applications yet</h3>
                    <p style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>Start your first passport application today. We guide you step by step.</p>
                    <button onClick={handleStartNew} className="btn btn-primary">
                        Begin Now <ChevronRight size={18} />
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6 animate-fade-in delay-100">
                    {applications.map(app => (
                        <div key={app.id} className="card card-hover flex-col justify-between" style={{ padding: '2rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>File #{app.id.substring(0, 8).toUpperCase()}</h3>
                                        <p style={{ margin: '0.5rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            <Clock size={14} /> Last saved: {new Date(app.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`badge ${app.status === 'draft' ? 'badge-draft' : 'badge-success'}`}>
                                        {app.status === 'draft' ? 'Draft' : 'Submitted'}
                                    </span>
                                </div>
                                
                                {app.status === 'draft' && (
                                    <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Form Progress</span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                {Object.keys(app.formData || {}).length > 0 ? "Saved" : "Started"}
                                            </span>
                                        </div>
                                        <div style={{ width: '100%', height: '4px', background: 'var(--border-light)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: Object.keys(app.formData || {}).length > 2 ? '50%' : '10%', height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                )}

                                {app.status === 'submitted' && (
                                    <div style={{ background: 'var(--success-light)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#065f46' }}>
                                        <CheckCircle size={24} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Ready for physical verification</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex gap-3 mt-4" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                                {app.status === 'draft' ? (
                                    <Link to={`/apply/${app.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                                        <Edit size={16} /> Resume Draft
                                    </Link>
                                ) : (
                                    <>
                                        <Link to={`/confirmation/${app.id}`} className="btn btn-primary" style={{ flex: 1 }}>
                                            <Eye size={16} /> Details
                                        </Link>
                                        <button className="btn btn-secondary" onClick={() => alert('Mock: Downloading Application PDF...')} style={{ flex: 1 }}>
                                            <Download size={16} /> Receipt
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
