import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <Outlet />
            </main>
            <footer style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                &copy; {new Date().getFullYear()} Anshumat Foundation. All rights reserved.
            </footer>
        </div>
    );
}
