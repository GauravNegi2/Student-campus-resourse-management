// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import RoomBooking from './components/RoomBooking/RoomBooking';
import InventoryTracker from './components/InventoryTracker/InventoryTracker';
import MaintenanceRequests from './components/MaintenanceRequests/MaintenanceRequests';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {
        setIsAuthenticated(true);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/room-booking">Room Booking</Link>
            <Link to="/inventory-tracker">Inventory Tracker</Link>
            <Link to="/maintenance-requests">Maintenance Requests</Link>
          </nav>
        )}
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/room-booking">
            {isAuthenticated ? <RoomBooking /> : <Redirect to="/login" />}
          </Route>
          <Route path="/inventory-tracker">
            {isAuthenticated ? <InventoryTracker /> : <Redirect to="/login" />}
          </Route>
          <Route path="/maintenance-requests">
            {isAuthenticated ? <MaintenanceRequests /> : <Redirect to="/login" />}
          </Route>
          <Route path="/" exact>
            {isAuthenticated ? (
              <>
                <h2>Welcome to the Smart Campus Resource Management System</h2>
                <p>Select a feature from the navigation menu.</p>
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;