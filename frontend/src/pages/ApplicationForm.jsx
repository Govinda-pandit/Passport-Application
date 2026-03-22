import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Check, CheckCircle2, ChevronRight, ChevronLeft, Cloud, Loader2, UploadCloud, MapPin, Calendar, Camera, CreditCard, ShieldCheck } from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Basics' },
    { id: 2, title: 'Address' },
    { id: 3, title: 'Documents' },
    { id: 4, title: 'Schedule' },
];

export default function ApplicationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { API_URL } = useContext(AuthContext);
    
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        surname: '',
        givenName: '',
        dob: '',
        birthPlace: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        aadharUploaded: false,
        panUploaded: false,
        appointmentDate: '',
        appointmentTime: '',
        appointmentCenter: ''
    });

    const [syncStatus, setSyncStatus] = useState('saved'); // 'saved', 'saving', 'error'
    const [lastSaved, setLastSaved] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/applications/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.status === 'submitted') {
                    navigate(`/confirmation/${id}`);
                }
                if (res.data.formData) {
                    setFormData(res.data.formData);
                }
                setLastSaved(new Date(res.data.updatedAt));
            } catch (error) {
                console.error("Error fetching application", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApp();
    }, [id, API_URL, navigate]);

    // Autosave mechanism
    const handleSave = useCallback(async (dataToSave, isFinal = false) => {
        setSyncStatus('saving');
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/applications/${id}`, {
                formData: dataToSave,
                status: isFinal ? 'submitted' : 'draft'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSyncStatus('saved');
            setLastSaved(new Date());
            if (isFinal) navigate(`/confirmation/${id}`);
        } catch (error) {
            console.error(error);
            setSyncStatus('error');
        }
    }, [id, API_URL, navigate]);

    // Debounce save when form data changes
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                handleSave(formData);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [formData, loading, handleSave]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSyncStatus('saving');
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSave(formData, true);
    };

    if (loading) return <div className="container text-center mt-12 mb-12">Loading Application...</div>;

    const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 bg-white" style={{ position: 'sticky', top: 80, zIndex: 100, padding: '1rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', marginTop: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Application Draft</h1>
                    <p style={{ fontSize: '0.9rem', margin: 0, fontFamily: 'monospace', color: 'var(--text-muted)' }}>ID: {id.toUpperCase()}</p>
                </div>
                
                <div className="sync-indicator bg-white" style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-main)' }}>
                    {syncStatus === 'saving' && <><Loader2 size={16} className="sync-saving" style={{ animation: 'spin 1s linear infinite' }}/> <span className="sync-saving">Saving draft...</span></>}
                    {syncStatus === 'saved' && <><Cloud size={16} className="sync-saved" /> <span className="sync-saved">Saved at {lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></>}
                    {syncStatus === 'error' && <span className="sync-error">Save failed (No connection)</span>}
                </div>
            </div>

            {/* Stepper Wizard */}
            <div style={{ maxWidth: '800px', margin: '0 auto 3.5rem auto', position: 'relative', padding: '0 2rem' }}>
                <div className="stepper-line" />
                <div className="stepper-progress" style={{ width: `${progressPercentage}%` }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    {STEPS.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;
                        let className = 'step-circle pending';
                        if (isCompleted) className = 'step-circle completed';
                        else if (isActive) className = 'step-circle active';
                        
                        return (
                            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: isCompleted ? 'pointer' : 'default' }} onClick={() => isCompleted && setCurrentStep(step.id)}>
                                <div className={className}>
                                    {isCompleted ? <Check size={20} /> : step.id}
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: isActive || isCompleted ? '600' : '500', color: isActive || isCompleted ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Area */}
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3.5rem' }}>
                
                <div className="form-content mb-8 relative" style={{ minHeight: '350px' }}>
                    
                    {/* Step 1 */}
                    {currentStep === 1 && (
                        <div className="animate-fade-in flex-col gap-6">
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Applicant Details</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Enter your name exactly as it should appear on your passport to avoid processing delays.</p>
                            
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div className="input-group">
                                    <label>Given Name</label>
                                    <input type="text" name="givenName" value={formData.givenName} onChange={handleChange} placeholder="First and Middle name" />
                                </div>
                                <div className="input-group">
                                    <label>Surname</label>
                                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Last name" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mt-2">
                                <div className="input-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Place of Birth</label>
                                    <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleChange} placeholder="City or Village" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {currentStep === 2 && (
                        <div className="animate-slide-right flex-col gap-6">
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Residential Address</h2>
                            <p style={{ color: 'var(--text-muted)' }}>This address will be physically verified by your local police station.</p>
                            
                            <div className="input-group mt-6">
                                <label>House No. & Street Name</label>
                                <textarea name="address" value={formData.address} onChange={handleChange} rows="4" placeholder="Enter complete home address"></textarea>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6 mt-2">
                                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                    <label>City/Town/Village</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>State</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} />
                                </div>
                            </div>
                            
                            <div className="input-group mt-2">
                                <label>Pincode / Postal Code</label>
                                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} style={{ maxWidth: '250px' }} placeholder="6-digit code"/>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {currentStep === 3 && (
                        <div className="animate-slide-right flex-col gap-6">
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Document Hub</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Upload scanned copies to expedite your physical verification process. Ensure corners are visible.</p>
                            
                            <div className="flex-col gap-6 mt-6">
                                
                                <div style={{ 
                                    border: `2px dashed ${formData.aadharUploaded ? 'var(--success)' : 'var(--border-light)'}`, 
                                    background: formData.aadharUploaded ? 'var(--success-light)' : 'var(--bg-main)',
                                    borderRadius: 'var(--radius-xl)', 
                                    padding: '2rem', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    transition: 'all 0.3s'
                                }}>
                                    <div className="flex gap-4 items-center">
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', color: formData.aadharUploaded ? 'var(--success)' : 'var(--primary)', boxShadow: 'var(--shadow-sm)' }}>
                                            <MapPin size={28} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.25rem' }}>Proof of Address</h4>
                                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Aadhar Card, Utility Bill, or Rent Agreement</p>
                                        </div>
                                    </div>
                                    
                                    {formData.aadharUploaded ? (
                                        <span style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
                                            <CheckCircle2 size={18} /> Verified
                                        </span>
                                    ) : (
                                        <button className="btn btn-outline" onClick={() => { setFormData(p => ({...p, aadharUploaded: true})); setSyncStatus('saving'); }}>
                                            Select File
                                        </button>
                                    )}
                                </div>

                                <div style={{ 
                                    border: `2px dashed ${formData.panUploaded ? 'var(--success)' : 'var(--border-light)'}`, 
                                    background: formData.panUploaded ? 'var(--success-light)' : 'var(--bg-main)',
                                    borderRadius: 'var(--radius-xl)', 
                                    padding: '2rem', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    transition: 'all 0.3s'
                                }}>
                                    <div className="flex gap-4 items-center">
                                        <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', color: formData.panUploaded ? 'var(--success)' : 'var(--accent)', boxShadow: 'var(--shadow-sm)' }}>
                                            <Calendar size={28} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.25rem' }}>Proof of Birth</h4>
                                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>PAN Card, Birth Certificate, or School Leaving Cert</p>
                                        </div>
                                    </div>
                                    
                                    {formData.panUploaded ? (
                                        <span style={{ color: '#065f46', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
                                            <CheckCircle2 size={18} /> Verified
                                        </span>
                                    ) : (
                                        <button className="btn btn-outline" onClick={() => { setFormData(p => ({...p, panUploaded: true})); setSyncStatus('saving'); }}>
                                            Select File
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Step 4 */}
                    {currentStep === 4 && (
                        <div className="animate-slide-right flex-col gap-6">
                            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Schedule Appointment</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Select a Passport Seva Kendra (PSK) to appear physically for biometrics and document validation.</p>
                            
                            <div className="input-group mt-6">
                                <label>Passport Seva Kendra</label>
                                <select name="appointmentCenter" value={formData.appointmentCenter} onChange={handleChange} style={{ height: '3.5rem', background: 'white', fontWeight: '500' }}>
                                    <option value="" disabled>Select your nearest PSK</option>
                                    <option value="PSK New Delhi (ITO)">PSK New Delhi (ITO)</option>
                                    <option value="PSK Mumbai (Andheri)">PSK Mumbai (Andheri)</option>
                                    <option value="PSK Bangalore (Lalbagh)">PSK Bangalore (Lalbagh)</option>
                                    <option value="PSK Chennai (Saligramam)">PSK Chennai (Saligramam)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-4">
                                <div className="input-group">
                                    <label>Appointment Date</label>
                                    <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} style={{ height: '3.5rem' }} />
                                </div>
                                <div className="input-group">
                                    <label>Time Slot</label>
                                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} style={{ height: '3.5rem' }}>
                                        <option value="" disabled>Select available slot</option>
                                        <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                                        <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                                        <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style={{ background: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'flex-start', gap: '1rem', marginTop: '1rem' }}>
                                <ShieldCheck size={28} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>Final Step Reminder</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--primary-hover)', margin: 0, marginTop: '0.25rem' }}>Submitting will lock your form and generate a receipt required for entry at the PSK.</p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem', marginTop: 'auto' }}>
                    
                    <button type="button" className="btn btn-secondary" onClick={handlePrev} style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}>
                        <ChevronLeft size={18} /> Previous Step
                    </button>
                    
                    {currentStep < 4 ? (
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                            Save & Continue <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={handleSubmit} style={{ background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)' }}>
                            Confirm & Submit Application <Check size={18} />
                        </button>
                    )}
                </div>
            </div>
            
            <style>
                {`
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
}
