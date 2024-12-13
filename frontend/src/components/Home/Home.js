import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ setRole, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'Cool') navigate('/dashboard');
    else if (role === 'Maintainer') navigate('/maintainer-dashboard');
  }, [navigate]);

  return (
    <div className="home">
      <h1>Welcome to Cool Kids Network</h1>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
      <button onClick={() => navigate('/login')}>Log In</button>
    </div>
  );
};

export default Home;

