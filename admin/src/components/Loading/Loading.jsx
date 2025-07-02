import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="tomato-loader-container">
      <div className="tomato-loader"></div>
      <span className="tomato-loading-text">Loading...</span>
    </div>
  );
}

export default Loading;
