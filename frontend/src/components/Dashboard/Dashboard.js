import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import UserCard from '../UserCard/UserCard';
import { getUserData, getAllUsers } from '../../api/api';

const Dashboard = ({ role, token, setRole, setToken }) => {
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user's data
    const fetchUserData = async () => {
      try {
        const response = await getUserData(token);
        setUserData(response?.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch all users if role allows
    const fetchAllUsers = async () => {
      if (role !== 'Cool Kid') {
        try {
          const response = await getAllUsers(token);
          setAllUsers(response?.data || []);
        } catch (error) {
          console.error('Error fetching all users:', error);
        }
      }
    };

    fetchUserData();
    fetchAllUsers();
  }, [token, role]);

  const handleLogout = () => {
    setRole(null);
    setToken("");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{role} Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {userData && (
        <div className="user-section">
          {/* <h2>Welcome, {userData.first_name}</h2> */}
          <UserCard user={userData} />
        </div>
      )}

      {role !== 'Cool Kid' && (
        <div className="users-section">
          <h2>Registered Users</h2>
          <div className="user-cards">
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))
            ) : (
              <p>No other users available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



