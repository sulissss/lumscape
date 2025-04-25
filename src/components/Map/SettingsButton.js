import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../style/map/SettingsButton.css";

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [musicVolume, setMusicVolume] = useState(1);
  const [graphicsQuality, setGraphicsQuality] = useState("High");
  const [fullscreen, setFullscreen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMusicVolumeChange = (e) => {
    setMusicVolume(parseFloat(e.target.value));
    // Implement your music volume logic here
  };

  const handleGraphicsQualityChange = (e) => {
    setGraphicsQuality(e.target.value);
    // Implement your graphics quality logic here
  };

  const handleFullscreenToggle = () => {
    if (!fullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  const handleBackToMap = () => {
    navigate("/map"); // Navigate to the map route
    setShowSettings(false); // Close the settings panel
  };

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="settings-button"
      >
        {/* Settings Icon (image from CSS) */}
      </button>

      {showSettings && (
        <>
          <div className="settings-overlay"></div>

          <div className="settings-panel">
            <h3>Settings</h3>

            <div className= "setting-item">
              <label>Back to Map:</label>
              <button 
                className="fullscreen-button"
              onClick={handleBackToMap}>
                Close Menu
              </button>
            </div>
            

            <div className="setting-item">
              <label>Music Volume:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={musicVolume}
                onChange={handleMusicVolumeChange}
              />
            </div>

            <div className="setting-item">
              <label>Graphics Quality:</label>
              <select
                value={graphicsQuality}
                onChange={handleGraphicsQualityChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Fullscreen:</label>
              <button
                className="fullscreen-button"
                onClick={handleFullscreenToggle}
              >
                {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </button>
            </div>

            
          </div>
        </>
      )}
    </>
  );
};

export default SettingsButton;