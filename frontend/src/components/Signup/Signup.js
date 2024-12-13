import React, { useState } from 'react';
import { signUp } from '../../api/api';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signUp(email);
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignup}>Confirm</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
