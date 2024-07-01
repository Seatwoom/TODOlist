import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: gray;
  }
`;

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
