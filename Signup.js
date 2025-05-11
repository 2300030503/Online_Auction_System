// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingShapes from './FloatingShapes';
import './AuthPage.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Signup successful!");
        alert("Signup successful! Redirecting to login.");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Signup failed. Please try again later.");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://accounts.google.com/signup";
  };

  const handleSocialSignup = (platform) => {
    const urls = {
      LinkedIn: "https://www.linkedin.com/signup",
      GitHub: "https://github.com/signup",
      Facebook: "https://www.facebook.com/r.php",
    };
    window.location.href = urls[platform];
  };

  return (
    <div className="auth__container">
      <div className="auth__left">
        <FloatingShapes />
        <div className="auth__branding">
          <h1>🏷 <span className="highlight">Online Auction</span></h1>
          <h2>Welcome to</h2>
          <h1>Real Bidding Platform</h1>
          <p>Experience live, competitive online bidding</p>
        </div>
      </div>
      <div className="auth__right">
        <div className="auth__box">
          <h2>Join us</h2>
          <p>Create your account to start bidding</p>

          {errorMessage && <p className="auth__error">{errorMessage}</p>}
          {successMessage && <p className="auth__success">{successMessage}</p>}

          <form onSubmit={handleSignup}>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>
              <input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy.
            </label>
            <button type="submit">Sign up</button>
          </form>

          <div className="auth__divider">or</div>

          <button className="google-btn" onClick={handleGoogleSignup}>
            Continue with Google
          </button>

          <div className="auth__social">
            <button onClick={() => handleSocialSignup("LinkedIn")}>LinkedIn</button>
            <button onClick={() => handleSocialSignup("GitHub")}>GitHub</button>
            <button onClick={() => handleSocialSignup("Facebook")}>Facebook</button>
          </div>

          <p className="auth__bottom">
            Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;