import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';

const Login = ({ setRole, setToken }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email);
      setRole(response.data.user.role);
      setToken(response.data.token);
      if (response.data.user.role === 'Maintainer') {
        navigate('/maintainer-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid login. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
