import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import HowToPlay from "./HowToPlay";
import Summary from "./Summary";
import "../../style/main/StartupScreen.css";

const StartupScreen = ({ isLoggedIn, setIsLoggedIn, userScope }) => {
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // How to Play modal state
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [loadingHowToPlay, setLoadingHowToPlay] = useState(false);
  const [howToPlayInstructions, setHowToPlayInstructions] = useState("");
  const [howToPlayError, setHowToPlayError] = useState(null);
  
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);

  const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    const now = Date.now();
    const numHours = process.env.CACHE_VALIDITY_HOURS;
    return now - timestamp < numHours * 60 * 60 * 1000;
  };

  useEffect(() => {
    const cached = localStorage.getItem("lumscape_events_cache");
    const cachedTime = localStorage.getItem("lumscape_events_cache_time");
    if (cached && isCacheValid(Number(cachedTime))) {
      setEvents(JSON.parse(cached));
    } else {
      fetch(process.env.BACKEND_ENDPOINT + '/events')
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch events");
          return response.json();
        })
        .then((data) => {
          setEvents(data);
          localStorage.setItem("lumscape_events_cache", JSON.stringify(data));
          localStorage.setItem("lumscape_events_cache_time", Date.now().toString());
        })
        .catch(() => {
          setEvents([]);
        });
    }
  }, []);

  const handleGetSummary = async () => {
    if (isLoggedIn) {
      setLoadingSummary(true);
      setSummaryError(null);
      try {
        const cached = localStorage.getItem("lumscape_events_cache");
        if (cached) {
          setEvents(JSON.parse(cached));
          setShowSummary(true);
        } else {
          throw new Error("No events cached");
        }
      } catch (err) {
        setSummaryError("Could not load event summaries. Please try again later.");
      } finally {
        setLoadingSummary(false);
      }
    } else {
      setErrorMessage("Please log in to get event summaries!");
      setTimeout(() => {
        setErrorMessage(null);
        navigate("/login");
      }, 1000);
    }
  };

  const handleCloseSummary = () => setShowSummary(false);

  useEffect(() => {
    if (isLoggedIn) {
      const hasLoggedBefore = sessionStorage.getItem("loggedInBefore");
      if (!hasLoggedBefore) {
        setShowLoginMessage(true);
        sessionStorage.setItem("loggedInBefore", "true");
        setTimeout(() => {
          setShowLoginMessage(false);
        }, 3000);
      }
    }
  }, [isLoggedIn]);

  const handlePlayNow = () => {
    if (isLoggedIn) {
      navigate("/map");
    } else {
      setErrorMessage("Please log in to play!");
      setTimeout(() => {
        setErrorMessage(null);
        navigate("/login");
      }, 1000);
    }
  };

  const handleCreateEvent = () => {
    if (isLoggedIn) {
      navigate("/create-event");
    } else {
      setErrorMessage("Please log in to create an event!");
      setTimeout(() => {
        setErrorMessage(null);
        navigate("/login");
      }, 1000);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    if (typeof setIsLoggedIn === 'function') setIsLoggedIn(false);
    sessionStorage.removeItem("loggedInBefore");
    navigate("/");
  };

  const handleToggleSound = () => {
    setSoundOn((prev) => {
      const newState = !prev;
      if (audioRef.current) {
        if (newState) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      return newState;
    });
  };

  return (
    <div className="bg-container">
      <button
        className="sound-toggle-btn"
        onClick={handleToggleSound}
        style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
        aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      >
        {soundOn ? <img src="/assets/sound-on.png" alt="Sound On"  className="sound-icon" /> 
                  : <img src="/assets/sound-off.png" alt="Sound Off" className="sound-icon"  />}
      </button>
      <audio
        ref={audioRef}
        src="/assets/background_music.mp3"
        loop
        autoPlay
        style={{ display: "none" }}
      />

      <div className="bg-image"></div>
      
      {showLoginMessage && (
        <div className="success-popup">
          Logged in successfully!
        </div>
      )}
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}
      {showLogoutConfirm && (
        <div className="logout-confirmation">
          <div className="logout-confirmation-text">Are you sure you want to log out?</div>
          <button className="logout-confirm-btn" onClick={handleLogout}>Yes</button>
          <button className="logout-cancel-btn" onClick={() => setShowLogoutConfirm(false)}>No</button>
        </div>
      )}
      <div className="content">
        <img src="/assets/lumscape_logo.png" alt="LUMSCAPE" className="logo" />

        <button className="button" onClick={handlePlayNow}>
          Play Now!
        </button>

        <button className="button" onClick={handleGetSummary}>
          {loadingSummary ? "Loading..." : "Get Summary"}
        </button>
        {summaryError && <div className="error-popup">{summaryError}</div>}
        {showSummary && (
          <Summary events={events} onClose={handleCloseSummary} />
        )}
        {showHowToPlay && (
          <HowToPlay
            instructions={loadingHowToPlay ? 'Loading...' : howToPlayInstructions}
            onClose={() => setShowHowToPlay(false)}
          />
        )}

        {(
          <button className="button" onClick={handleCreateEvent}>
            Create Event
          </button>
        )}

        <button className="button" onClick={async () => {
          setLoadingHowToPlay(true);
          setShowHowToPlay(true);
          setHowToPlayError(null);
          try {
            const res = await fetch('/how_to_play.txt');
            if (!res.ok) throw new Error('Failed to fetch instructions');
            const text = await res.text();
            setHowToPlayInstructions(text);
          } catch (err) {
            setHowToPlayInstructions('');
            setHowToPlayError('Could not load instructions.');
          } finally {
            setLoadingHowToPlay(false);
          }
        }}>
          How to Play?
        </button>
        {isLoggedIn && (
          <button className="logout-button" onClick={() => setShowLogoutConfirm(true)}>
            Logout
          </button>
        )}
        {!isLoggedIn && (
          <div className="flex gap-4">
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="button" style={{ width: "120px" }} onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupScreen;
