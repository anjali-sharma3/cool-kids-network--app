import React, { useState, useEffect } from 'react';
import './MaintainerDashboard.css';
import { getAllUsers, updateUserRole } from '../../api/api';
import Modal from 'react-modal';

const MaintainerDashboard = ({ token, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers(token);;
      setUsers(response?.data || []);
    };
    fetchUsers();
  }, [token]);

  const handleRoleChange = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleUpdateRole = async () => {
    await updateUserRole(selectedUserId, newRole, token);
    const response = await getAllUsers(token);
    setUsers(response?.data || []);
    setIsModalOpen(false);
    setNewRole('');
  };

  return (
    <div className="maintainer-dashboard-container">
      <div className="dashboard-header">
        <h1>Maintainer Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <p>Here you can manage user roles.</p>

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleRoleChange(user.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating user role */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update User Role"
      >
        <h2>Update User Role</h2>
        <div>
          <label htmlFor="role">Select Role</label>
          <select
            id="role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="">--Select Role--</option>
            <option value="Cool Kid">Cool</option>
            <option value="Cooler Kid">Cooler</option>
            <option value="Coolest Kid">Coolest</option>
          </select>
        </div>
        <div>
          <button onClick={handleUpdateRole}>Update</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default MaintainerDashboard;
