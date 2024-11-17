import React from 'react';
import Nav from '../components/Nav';
import UserProfile from '../components/UserProfile';
import '../styles/dashboard.css';
import Posts from '../components/Posts';
const Dashboard = () => {
  return (
    <div>
      <Nav />
      <div className="main-section">
        <UserProfile />
        <Posts />
      </div>
    </div>
  );
};

export default Dashboard;
