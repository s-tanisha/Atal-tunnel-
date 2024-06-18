import React from "react";
import "../../css/styles.css";
import "../../css/main.css";
import "./about.css";
import { Link } from "react-router-dom";
import Header from "../Home/Header/header";

function About() {
  return (
    <div>
      <Header />
      <section>
        <img id="img11" src="/img/10.jpg"></img>
        <div id="aa" className="animated-box  id11">
          <h2 class="h211">About Manali</h2>
          <p>
            Manali, nestled in the Himalayas, enthralls with its beauty.
            Snow-capped peaks, meandering rivers, pine forests, and streams
            create a symphony of nature. Whether seeking adventure or
            tranquility, Manali offers something for every soul. In every
            season, it whispers tales of timeless beauty, inviting travelers to
            lose themselves in its embrace.
          </p>
          
        </div>
        <div id="line11" className="animated-line"></div>

        <div id="comb">
          <div id="id22" className="animated-box id11 id22">
            <img id="lead1" src="/img/Lead1.jpeg"></img>
            <h3>
              <b>Meghna</b>
            </h3>
          </div>

          <div id="lead" className="animated-box ">
            <h2 class="h211">How We Lead</h2>
            <p>
              Leading isn't about authority; it's about empowering others and setting an example worth following.
            </p>
          </div>

          <div id="id22" className="animated-box id11 id22">
            <img id="lead2" src="/img/T.jpeg"></img>
            <h3>
              <b>Tanisha</b>
            </h3>
          </div>
        </div>

        <div id="line11" className="animated-line"></div>

        <div class="foot-last1"></div>
        <div class="foot-last2">
          <div class="foot-copyr">© @2024 Juit. All rigths reserved.</div>
          <div class="foot_cont">
            <p>Contact Us : +91 8894423460</p>
            <p>meghnathakur2003@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
