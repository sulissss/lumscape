import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCreation = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTiming, setEventTiming] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (eventName && eventLocation && eventDescription && eventTiming) {
      setSuccessMessage("Event Created Successfully!");

      setTimeout(() => {
        navigate("/");
        setSuccessMessage(null);
      }, 1000);
    } else {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-container">
      {successMessage && (
        <div className="success-popup">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}
      <div className="bg-login-image"></div>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>
      <form className="login-content" onSubmit={handleSubmit}>
        <h1 className="account-title">Event Creation</h1>

        <input
          type="text"
          placeholder="Event Name"
          className="login-input"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <select
          className="event-select"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        >
          <option value="">Select Event Location</option>
          <option value="Library">Library</option>
          <option value="Auditorium">Auditorium</option>
          <option value="Sports Complex">Sports Complex</option>
        </select>

        <textarea
          placeholder="Event Description"
          className="login-input"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        <select
          className="event-select"
          value={eventTiming}
          onChange={(e) => setEventTiming(e.target.value)}
        >
          <option value="">Select Event Timing</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <button type="submit" className="login-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreation;