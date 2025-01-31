import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaCog } from 'react-icons/fa'; // Icons
import '../../styles/navigation/Navigation.css';

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav className={`navigation ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      {/* Navigation Menu */}
      <ul>
        <li><FaHome className="icon" /> {!isCollapsed && 'Home'}</li>
        <li><FaUser className="icon" /> {!isCollapsed && 'Profile'}</li>
        <li><FaCog className="icon" /> {!isCollapsed && 'Settings'}</li>
      </ul>
    </nav>
  );
};

export default Navigation;
