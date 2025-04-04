import React, { useState } from "react";

const EventCreation = ({ onBack }) => {
//   const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTiming, setEventTiming] = useState("");

  const handleSubmit = () => {
    alert("Event Created Successfully!");
    // navigate("/");
    // Here, you can add logic to save the event to a database
  };

  return (
    <div className="bg-container">
      {/* Background */}
      <div className="bg-login-image"></div>

      {/* Back Button */}
      <button className="back-button" onClick={onBack}>← Back</button>

      {/* Event Creation Form */}
      <div className="login-content">
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

        <button className="login-button" onClick={handleSubmit}>Create Event</button>
      </div>
    </div>
  );
};

export default EventCreation;
