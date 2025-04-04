import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartupScreen = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

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

  return (
    <div className="bg-container">
      <div className="bg-image"></div>
      {showLoginMessage && (
        <div className="success-popup">
          Logged in successfully!
        </div>
      )}
      <div className="content">
        <img src="/assets/lumscape_logo.png" alt="LUMSCAPE" className="logo" />

        <button className="button" onClick={() => navigate(isLoggedIn ? "/map" : "/login")}>
          Play Now!
        </button>
        <button className="button">Get Summary</button>

        <button className="button" onClick={() => navigate(isLoggedIn ? "/create-event" : "/login")}>
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