import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupScreen from "./components/Main/StartupScreen";
import Login from "./components/Main/Login";
import Signup from "./components/Main/Signup";
import EventCreation from "./components/Main/EventCreation";
import UnityMap from "./components/Map/UnityMap";

import { useEffect } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userScope, setUserScope] = useState(localStorage.getItem('userScope') || null);

  useEffect(() => {
    fetch("https://lums-3d-planner-sigma.vercel.app" + "/events").catch(() => {});
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userScope={userScope} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserScope={setUserScope} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} setUserScope={setUserScope} />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/map" element={<UnityMap />} />
      </Routes>
    </Router>
  );
};



export default App;
