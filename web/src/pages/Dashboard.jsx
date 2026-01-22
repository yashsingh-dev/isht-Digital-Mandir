import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-orange-50/50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, {user?.name || 'Admin'}!</p>
                    </div>
                    <Button variant="secondary" onClick={logout} className="flex items-center gap-2">
                        <LogOut size={18} />
                        Sign Out
                    </Button>
                </header>

                <div className="bg-white border border-orange-100 rounded-3xl p-12 text-center shadow-lg shadow-orange-500/5">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange-50 mb-6 text-orange-500">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Dashboard Content</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        This area is ready for dashboard widgets and content.
                        Integration will be handled in the next phase.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
