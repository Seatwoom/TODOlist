import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/auth/privateRoute";
import Tasks from "./components/views/Tasks";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Cat from "./components/views/Cat";
import CatDetailed from "./components/views/CatDetailed";
import Session from "./components/views/Session";
import { SESSION_TIMEOUT } from "./config";

import "./index.css";

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
