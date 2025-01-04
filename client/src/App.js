import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from './components/auth/privateRoute';
import Tasks from './views/Tasks';
import Login from './views/Login';
import Register from './views/Register';
import Cat from './views/Cat';
import CatDetailed from './views/CatDetailed';
import Session from './views/Session';
import { SESSION_TIMEOUT } from './config';

import './index.css';

function App() {
  return (
    <Router>
      <Session timeout={SESSION_TIMEOUT} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/cats"
          element={
            <PrivateRoute>
              <Cat />
            </PrivateRoute>
          }
        />
        <Route
          path="/cat/:id"
          element={
            <PrivateRoute>
              <CatDetailed />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
