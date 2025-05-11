import React, { useState } from 'react';
import './AuthPage.css';
import FloatingShapes from './FloatingShapes';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", username);
    window.location.href = "/products";
  };

  return (
    <div className="auth__split">
      {/* LEFT - Animated side */}
      <div className="auth__left">
        <FloatingShapes />
        <div className="auth__branding">
          <h1>Bid Items</h1>
          <p>Explore, bid, and win in real-time auctions.</p>
        </div>
      </div>

      {/* RIGHT - Login/Signup */}
      <div className="auth__right">
        <div className="auth__tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <form className="auth__form" onSubmit={handleAuth}>
          <label>{activeTab === 'login' ? 'Username' : 'Create Username'}</label>
          <input
            type="text"
            required
            minLength={6}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button type="submit">{activeTab === 'login' ? 'Login' : 'Create Account'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;