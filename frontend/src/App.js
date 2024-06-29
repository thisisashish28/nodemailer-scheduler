import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { useAuth } from './hooks/useAuth';

function App() {
  const {isLogin} = useAuth();

  return (
      <Routes>
      <Route path='/login' element={isLogin ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path='/dashboard' element={isLogin ? <Dashboard /> : <Navigate to ='/' />} />
      <Route path='/' element={isLogin ? <Navigate to="/dashboard" /> : <Signup />} />
    </Routes>
  );
}

export default App;
