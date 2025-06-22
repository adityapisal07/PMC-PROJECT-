import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OuterNavbar from './components/OuterNavbar';
import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';

import Assignments from './pages/Assignments';
import Profile from './pages/Profile';
import AIBox from './pages/AIBox';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with outer navbar */}
        <Route
          path="/"
          element={
            <>
              <OuterNavbar />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <OuterNavbar />
              <About />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <OuterNavbar />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <OuterNavbar />
              <Signup />
            </>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/groups"
          element={
            <RequireAuth>
              <Groups />
            </RequireAuth>
          }
        />
        
        <Route
          path="/assignments"
          element={
            <RequireAuth>
              <Assignments />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/aibox"
          element={
            <RequireAuth>
              <AIBox />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
