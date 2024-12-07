import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage'; // Import the Login component
import HomePage from './HomePage'; // Import the Home component
import AdminPage from './AdminPage'; // Import the Admin component

function App() {
  const [currentForm, setCurrentForm] = useState('loginpage'); // Set the default form to loginpage

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;