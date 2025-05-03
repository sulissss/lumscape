import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../style/map/SettingsButton.css";
import HowToPlay from "../Main/HowToPlay";

const SettingsButton = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [loadingHowToPlay, setLoadingHowToPlay] = useState(false);
  const [howToPlayInstructions, setHowToPlayInstructions] = useState("");
  const [howToPlayError, setHowToPlayError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const navigate = useNavigate();

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
    navigate("/map");
    setShowSettings(false);
  };

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="settings-button"
      ></button>

      {showSettings && !showHowToPlay && (
        <>
          <div className="settings-overlay"></div>

          <div className="settings-panel">
            <h3>Settings</h3>

            <div className="setting-item">
              <label>Game Instructions:</label>
              <button
                className="fullscreen-button"
                onClick={async () => {
                  setLoadingHowToPlay(true);
                  setShowHowToPlay(true);
                  setShowSettings(false);
                  setHowToPlayError(null);
                  try {
                    const res = await fetch(process.env.INSTRUCTIONS_PATH);
                    if (!res.ok) throw new Error('Failed to fetch instructions');
                    const text = await res.text();
                    setHowToPlayInstructions(text);
                  } catch (err) {
                    setHowToPlayInstructions('');
                    setHowToPlayError('Could not load instructions.');
                  } finally {
                    setLoadingHowToPlay(false);
                  }
                }}
              >
                How to Play?
              </button>
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

            <div className= "setting-item">
              <label>Back to Map:</label>
              <button 
                className="fullscreen-button"
                onClick={handleBackToMap}>
                Close Menu
              </button>
            </div>


          </div>
        </>
      )}

      {showHowToPlay && (
        <HowToPlay
          instructions={loadingHowToPlay ? 'Loading...' : howToPlayInstructions}
          onClose={() => {
            setShowHowToPlay(false);
            navigate('/map');
          }}
          origin="settings"
        />
      )}
    </>
  );
};

export default SettingsButton;