import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a reset link
    setSubmitted(true);
  };

  return (
    <div className="auth__container">
      <div className="auth__left">
        <div className="auth__branding">
          <h1>🏷️ <span className="highlight">Online Auction</span></h1>
          <h2>Password Recovery</h2>
          <p>Enter your registered email address to receive reset instructions.</p>
        </div>
      </div>

      <div className="auth__right">
        <div className="auth__box">
          <h2>Forgot Password</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="yourname@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="primary-btn">Send Reset Link</button>
            </form>
          ) : (
            <div>
              <p>A reset link has been sent to <strong>{email}</strong> (simulated).</p>
              <button className="primary-btn" onClick={() => navigate('/login')}>Back to Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
