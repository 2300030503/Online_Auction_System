import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingShapes from './FloatingShapes';
import './AuthPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Save user email to localStorage
    localStorage.setItem('userEmail', email);

    // Redirect to products page
    navigate('/products');
  };

  const handleGoogleLogin = () => {
    alert('Google login clicked');
  };

  const handleSocialClick = (platform) => {
    alert(`${platform} login clicked`);
  };

  return (
    <div className="auth__container">
      {/* Left Branding Area */}
      <div className="auth__left">
        <FloatingShapes />
        <div className="auth__branding">
          <h1>🏷 <span className="highlight">Online Auction</span></h1>
          <h2>Welcome to</h2>
          <h1>Real Bidding Platform</h1>
          <p>Experience live, competitive online bidding</p>
        </div>
      </div>

      {/* Right Login Form Area */}
      <div className="auth__right">
        <div className="auth__box">
          <h2>Welcome back!</h2>
          <p>Login to your account</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <div className="checkbox-row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span
                className="auth__link"
                onClick={() => alert('Forgot password clicked')}
              >
                Forgot password?
              </span>
            </div>

            <button type="submit" className="primary-btn">Log In</button>
          </form>

          <div className="auth__divider">or</div>

          <button className="google-btn" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <div className="auth__social">
            <button onClick={() => handleSocialClick('LinkedIn')}>LinkedIn</button>
            <button onClick={() => handleSocialClick('GitHub')}>GitHub</button>
            <button onClick={() => handleSocialClick('Facebook')}>Facebook</button>
          </div>

          <p className="auth__bottom">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="auth__link"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
