import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { setIsLogin, scheduleMail } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [time, setTime] = useState('');

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        navigate('/login');
    }

    const handleScheduledMail = async (e) => {
        e.preventDefault();
        await scheduleMail(email, subject, body, time);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-green-500 text-white">
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold">Dashboard</div>
                    <nav className="space-x-4">
                        <Link to="/dashboard" className="text-white hover:text-gray-200">Home</Link>
                        <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto py-6 px-4 flex-1">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
                <div className="bg-white shadow-md rounded p-6">
                    <h3 className="text-xl font-semibold mb-4">Schedule a Mail</h3>
                    <form onSubmit={handleScheduledMail} className="space-y-4">
                        <div>
                            <input 
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <input 
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <input 
                                type="text"
                                placeholder="Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <input 
                                type="text"
                                placeholder="Time in words"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
