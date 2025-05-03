import React from "react";
import "../../style/map/UnityMap.css";
import ExitButton from "./ExitButton";
import SettingsButton from "./SettingsButton";

const UnityMap = () => {
  return (
    <div className="unity-map-container">
      <iframe
        src={process.env.UNITY_MAP_URL}
        title="Unity Map"
        className="unity-map-iframe"
      ></iframe>

      <ExitButton />
      <SettingsButton />
    </div>
  );
};

export default UnityMap;
