import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsButton.css";

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="settings-button"
      >
        {/* No content here, image is in CSS */}
      </button>

      {showSettings && (
        <div className="settings-panel">
          <h3>Settings</h3>
          <button
            onClick={() => navigate("/")}
            className="back-to-menu-button"
          >
            ⬅ Back to Main Menu
          </button>
        </div>
      )}
    </>
  );
};

export default SettingsButton;