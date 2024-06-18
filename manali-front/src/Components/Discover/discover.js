import React from "react";
import "./discover.css";
import Card from "../Card/card";
import Header from "../Home/Header/header";

function Discover() {
  
  return (
    <>
    <Header/>
      <section className="discover section" id="discover">
        <img
          className="disc_img"
          src="/img/About_bck.jpg"
          alt="Background"
        ></img>
        <h2 className="heading_disc">
          <b>DISCOVER</b>
        </h2>
      </section>
      <div className="card1">
        <div className="cardcomm">
          <Card name="TEMPLES" src="/img/1.jpg" />
          <div className="connector"></div>
            <a id="button1" href="https://traveltriangle.com/blog/temples-in-manali/">Go</a>
        </div>
        <div className="cardcomm">
          <Card name="TREK" src="/img/4.jpg" />
          <div className="connector"></div>
          <a id="button1" href="https://www.advenchar.com/trekking-in-manali/">Go</a>
        </div>
        <div className="cardcomm">
          <Card name="ADVENTURE" src="/img/Advent.avif" />
          <div className="connector"></div>
          <a id="button1" href="https://traveltriangle.com/blog/adventure-sports-in-manali/">Go</a>
        </div>
      </div>
    </>
  );
}

export default Discover;
