// Card.js

import React from 'react';
import "./card.css";

function Card(props) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.src} alt="Avatar" style={{ width: '200px', height: '200px' , borderRadius:'100px'}} />
        </div>
        <div className="flip-card-back">
          <h1>{props.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
