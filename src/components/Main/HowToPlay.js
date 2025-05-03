import React from "react";
import "../../style/main/HowToPlay.css";

const HowToPlay = ({ instructions, onClose, origin }) => {
  return (
    <div className={origin === 'settings' ? 'htp-modal-overlay-settings' : 'htp-modal-overlay'}>
      <div className="htp-modal-content">
        <button className="htp-close-btn" onClick={onClose}>&times;</button>
        <h2>How to Play?</h2>
        <div className="htp-modal-scroll">
          {instructions ? (
            <pre className="how-to-play-text">{instructions}</pre>
          ) : (
            <div className="empty-message">No instructions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
