import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartupScreen = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Add error message state

  useEffect(() => {
    if (isLoggedIn) {
      const hasLoggedBefore = sessionStorage.getItem("loggedInBefore");
      if (!hasLoggedBefore) {
        setShowLoginMessage(true);
        sessionStorage.setItem("loggedInBefore", "true");
        setTimeout(() => {
          setShowLoginMessage(false);
        }, 3000);
      }
    }
  }, [isLoggedIn]);

  const handlePlayNow = () => {
    if (isLoggedIn) {
      navigate("/map");
    } else {
      setErrorMessage("Please log in to play!");
      setTimeout(() => {
        setErrorMessage(null);
        navigate("/login");
      }, 1000);
    }
  };

  const handleCreateEvent = () => {
    if (isLoggedIn) {
      navigate("/create-event");
    } else {
      setErrorMessage("Please log in to create an event!");
      setTimeout(() => {
        setErrorMessage(null);
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="bg-container">
      <div className="bg-image"></div>
      {showLoginMessage && (
        <div className="success-popup">
          Logged in successfully!
        </div>
      )}
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}
      <div className="content">
        <img src="/assets/lumscape_logo.png" alt="LUMSCAPE" className="logo" />

        <button className="button" onClick={handlePlayNow}>
          Play Now!
        </button>
        <button className="button">Get Summary</button>

        <button className="button" onClick={handleCreateEvent}>
          Create Event
        </button>

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StartupScreen;