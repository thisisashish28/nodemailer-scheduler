import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "./Dashboard";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLogin, signup } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate('/dashboard');
        }
    }, [isLogin, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(email, password);
        await signup(email, password);
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Signup</h1>
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Signup
                    </button>
                </form>
            </div>
            <div className="mt-4">
                <span>Already a user? </span>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </div>
        </div>
    );
};

export default Signup;
