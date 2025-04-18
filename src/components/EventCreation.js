import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventCreation = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locationMap = {
      "SSE": 1,
      "SDSB": 2,
      "SOE": 3,
      "SAHSOL": 4,
      "HSS": 5,
      "PDC": 6,
    };

    if (eventName && eventLocation && eventDescription && eventDate && eventTime) {
      try {
        const response = await axios.post(
          "https://lums-3d-planner.vercel.app/events",
          {
            eventName,
            eventLocationID: locationMap[eventLocation],
            eventDescription,
            eventDate,
            eventTime,
          }
        );

        if (response.status === 201) {
          setSuccessMessage("Event Created Successfully!");
          setTimeout(() => {
            navigate("/");
            setSuccessMessage(null);
          }, 1000);
        } else {
          setErrorMessage("Failed to create event. Please try again.");
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        console.error("Event creation error:", error);
      }
    } else {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-container">
      {successMessage && <div className="success-popup">{successMessage}</div>}
      {errorMessage && <div className="error-popup">{errorMessage}</div>}
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
          <option value="SSE">SSE</option>
          <option value="SDSB">SDSB</option>
          <option value="SOE">SOE</option>
          <option value="SAHSOL">SAHSOL</option>
          <option value="HSS">HSS</option>
          <option value="PDC">PDC</option>
        </select>

        <textarea
          placeholder="Event Description"
          className="login-input"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        <p className="date-time-p">Select Date:</p>

        <input
          type="date"
          className="date-time-select"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          placeholder="Select Date"
        />

        <p className="date-time-p">Select Time:</p>

        <input
          type="time"
          className="date-time-select"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          placeholder="Select Time"
        />

        <button type="submit" className="login-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreation;