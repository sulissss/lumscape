import React from "react";
import "./UnityMap.css";
import ExitButton from "./ExitButton";
import SettingsButton from "./SettingsButton";

const UnityMap = () => {
  return (
    <div className="unity-map-container">
      <iframe
        src="/unityBuild/index.html"
        title="Unity Map"
        className="unity-map-iframe"
      ></iframe>

      <ExitButton />
      <SettingsButton />
    </div>
  );
};

export default UnityMap;