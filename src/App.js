import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupScreen from "./components/StartupScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventCreation from "./components/EventCreation";
import UnityMap from "./components/MapComponents/UnityMap"; // Import Unity Map component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupScreen isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/map" element={<UnityMap />} /> {/* Route for Unity map */}
      </Routes>
    </Router>
  );
};

export default App;
