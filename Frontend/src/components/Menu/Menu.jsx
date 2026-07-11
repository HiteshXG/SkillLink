import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from "../../features/auth/hooks/useAuth"
import './menu.scss';
import { RiMenuLine, RiHome4Line, RiTodoLine, RiLogoutBoxLine } from '@remixicon/react';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleInterviewPlanClick = () => {
    navigate('/interview-plans');
    setIsOpen(false);
  };

    const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
    setIsOpen(false);
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <button 
        className={`menu-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="menu-icon"><RiMenuLine /></span>
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-item" onClick={handleHomeClick}>
            <span className="menu-item-icon"><RiHome4Line /></span>
            Home
          </div>
          <div className="menu-item" onClick={handleInterviewPlanClick}>
            <span className="menu-item-icon"><RiTodoLine /></span>
            Interview Plan
          </div>
          <div className="menu-item logout" onClick={handleLogoutClick}>
            <span className="menu-item-icon"><RiLogoutBoxLine /></span>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;