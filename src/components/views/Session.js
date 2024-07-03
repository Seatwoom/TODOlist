import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ModalContent, ModalOverlay, Button } from "../../styles/styles";

const Session = ({ timeout = 300000 }) => {
  const [modal, setModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authenticated");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const events = ["keydown", "click"];
    let timeoutId;

    const resetTimeout = () => {
      if (!modal && initialized) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setModal(true), timeout);
      }
    };

    const handleActivity = () => {
      if (!modal && initialized) {
        resetTimeout();
      }
    };
    if (location.pathname === "/login" || location.pathname === "/register") {
      return;
    }

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [modal, timeout, initialized, location.pathname]);
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      const initTimeoutId = setTimeout(() => {
        setInitialized(true);
      }, 1000);

      return () => clearTimeout(initTimeoutId);
    }
  }, [location.pathname]);
  const handleClose = () => {
    logout();
  };
  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      setModal(false);
      setInitialized(false);
    }
  }, [location.pathname]);
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    modal && (
      <ModalOverlay onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <p>Your session has expired. Please log in again.</p>
          <Button onClick={handleClose}>Login</Button>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default Session;
