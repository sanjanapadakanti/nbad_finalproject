import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Menu from './Menu/Menu';
import Home from './Home/Home';

import Help from './Help/Help';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import AddBudget from './AddBudget/AddBudget';
import RemoveBudget from './RemoveBudget/RemoveBudget';
function App() {
  return (
    <Router>
      <Menu />
      <div className="mainContainer">
        <Routes>
          <Route path="/Help" element={<Help />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/AddBudget" element={<AddBudget />} />
          <Route path="/RemoveBudget" element={<RemoveBudget />} />
          <Route path="/login" element={<LoginPage />} />
        
          <Route
            path="/"
            element={<Navigate to="/login" />} // Update this based on your authentication logic
          />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
