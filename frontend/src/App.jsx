import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import Confirmation from './pages/Confirmation';

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) return <div className="container text-center mt-8">Loading...</div>;
    
    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    
                    <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="apply" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
                    <Route path="apply/:id" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
                    <Route path="confirmation/:id" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
