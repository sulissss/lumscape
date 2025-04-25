import React from "react";
import "../../style/main/Summary.css";

const Summary = ({ events, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Event Summaries</h2>
        <div className="modal-scroll">
          {events.length === 0 ? (
            <div className="empty-message">No events found.</div>
          ) : (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-title">{event.eventName || event.Name}</div>
                <div className="event-desc">{event.eventDescription || ''}</div>
                <div className="event-datetime">{event.eventDate && event.eventTime ? `${event.eventDate} @ ${event.eventTime}` : ''}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
