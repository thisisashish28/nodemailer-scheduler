import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setIsLogin(true);
        }
    },[])

    const login = async (email,password) => {
        try {
            const res = await axios.post('http://localhost:5000/login', {email,password});
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            setIsLogin(true);
        }
        catch(error){
            console.error("error in login", error);
        }
    };
    const signup = async (email, password) => {
        try{
            const res = await axios.post('http://localhost:5000/signup', {email,password});
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            setIsLogin(true);
        }
        catch(err){
            console.error('signup error useAuth',err)
        }
    }
    const scheduleMail = async (to, subject, text, scheduleTime) => {
        const token = localStorage.getItem('token');
        // email,subject,body,time
        try {
            const res = await axios.post('http://localhost:5000/schedule-mail', {
                to,
                subject,
                text,
                scheduleTime
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
        } catch (err) {
            console.error("scheduling error", err);
        }
    };
    

    return (
        <AuthContext.Provider value = {{login,signup, scheduleMail,setIsLogin,isLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);