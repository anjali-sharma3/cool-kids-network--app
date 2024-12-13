import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      {user?.first_name && user?.last_name ? <h2>{`${user.first_name} ${user.last_name}`}</h2> : ""}
      {user.country && <p><strong>Country:</strong> {user.country}</p>}
      {user.email && <p><strong>Email:</strong> {user.email}</p>}
      {user.role && <p><strong>Role:</strong> {user.role}</p>}
    </div>
  );
};

export default UserCard;
