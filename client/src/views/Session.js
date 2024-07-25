import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SESSION_TIMEOUT } from "../config";
import { ModalContent, ModalOverlay, Button } from "../styles/styles";

const Session = ({ timeout = SESSION_TIMEOUT }) => {
  const [modal, setModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let timeoutId = null;

  useEffect(() => {
    if (modal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modal]);

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authenticated");
    navigate("/login");
  }, [navigate]);

  const handleActivity = () => {
    if (modal || !initialized) return;
    resetTimeout();
  };

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setModal(true);
      localStorage.removeItem("authenticated");
    }, timeout);
  };

  useEffect(() => {
    const handleResetSession = () => {
      setModal(false);
      setInitialized(false);
      clearTimeout(timeoutId);
    };

    const events = ["keydown", "click"];
    if (location.pathname === "/login" || location.pathname === "/register") {
      return;
    }

    window.addEventListener("resetSession", handleResetSession);
    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      window.removeEventListener("resetSession", handleResetSession);
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
    if (location.pathname === "/login" || location.pathname === "/register") {
      setModal(false);
      setInitialized(false);
      clearTimeout(timeoutId);
    }
  }, [location.pathname]);

  if (
    modal ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return (
      <>
        {modal && (
          <ModalOverlay>
            <ModalContent>
              <p>Your session has expired. Please log in again.</p>
              <Button onClick={handleClose}>Login</Button>
            </ModalContent>
          </ModalOverlay>
        )}
      </>
    );
  }

  return null;
};

export default Session;
