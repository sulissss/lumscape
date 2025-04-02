import React from "react";
import { useNavigate } from "react-router-dom";

const StartupScreen = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-container">
      <div className="bg-image"></div>

      <div className="content">
        <img src="/assets/lumscape_logo.png" alt="LUMSCAPE" className="logo" />

        <button className="button">Play Now!</button>
        <button className="button">Get Summary</button>
        <button className="button">Create Event</button>

        {!isLoggedIn ? (
          <div className="flex gap-4">
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        ) : (
          <p className="success-message">Logged in successfully!</p>
        )}
      </div>
    </div>
  );
};

export default StartupScreen;