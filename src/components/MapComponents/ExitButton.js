import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExitButton.css";

const ExitButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLeave = () => {
    navigate("/");
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button className="exit-button" onClick={handleBackClick}>
        ⬅
      </button>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup">
            <p>Are you sure you want to leave the map?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmLeave}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelLeave}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExitButton;