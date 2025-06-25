import React from "react";
import "./styles.css";

export default function Card({ front, back, isFlipped, onFlip }) {
  return (
    <div className="card-container" onClick={onFlip}>
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <h2>{front}</h2>
        </div>
        <div className="card-back">
          <h2>{back}</h2>
        </div>
      </div>
    </div>
  );
}
