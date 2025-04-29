import React from "react";
// import "../../style/main/Summary.css";
import "../../style/main/HowToPlay.css";

const HowToPlay = ({ instructions, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>How to Play?</h2>
        <div className="modal-scroll">
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
