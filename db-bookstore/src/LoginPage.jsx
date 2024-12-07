import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5001/userAccounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userAccount = await response.json();
        console.log(userAccount);
        sessionStorage.setItem('userId', userAccount.UserID);
        sessionStorage.setItem('username', userAccount.Username);
        navigate('/homepage'); // Navigate to the homepage on successful login
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1>Online Bookstore</h1>
      </header>
      <main className="main-content">
        <section className="login-section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button" onClick={() => navigate("/homepage")}  >Login</button>
          </form>
          {showErrorMessage && <p className="error-message">Invalid username or password</p>}
          <button className="link-btn" onClick={() => navigate("/adminpage")}>Admin</button>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;