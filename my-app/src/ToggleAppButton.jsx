import React, { useState } from "react";
import App from "./App";

const ToggleAppButton = () => {
  const [showApp, setShowApp] = useState(false);

  const handleToggleApp = () => {
    setShowApp(!showApp);
  };

  return (
    <div>
      <button onClick={handleToggleApp}>
        {showApp ? "Hide App" : "Show App"}
      </button>
      {showApp && <App />}
    </div>
  );
};

export default ToggleAppButton;
