import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import MaintainerDashboard from './components/MaintainerDashboard/MaintainerDashboard';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Save role and token to localStorage when they change
  useEffect(() => {
    if (role && token) {
      localStorage.setItem('role', role);
      localStorage.setItem('token', token);
    }
  }, [role, token]);


  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole(null);
    setToken(null);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={<Home setRole={setRole} setToken={setToken} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setRole={setRole} setToken={setToken} />}
        />

        <Route
          path="/dashboard"
          element={
            role ? (
              <Dashboard
                role={role}
                setRole={setRole}
                token={token}
                onLogout={handleLogout}
                setToken={setToken}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/maintainer-dashboard"
          element={
            role === 'Maintainer' ? (
              <MaintainerDashboard
                token={token}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
