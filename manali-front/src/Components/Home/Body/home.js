import React from "react";
import "../../../css/styles.css";
import "../../../css/main.css";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faSquareInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Header from "../Header/header";
import Weather from "../../Weather/weather";

function Home() {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="home" id="home">
          <img
            src="https://images.unsplash.com/photo-1592058879796-8378fba3961f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a3VsbHUlMjBtYW5hbGl8ZW58MHx8MHx8&w=1000&q=80"
            alt="beautiful"
            className="home__img"
          />

          <div className="home__container container grid">
            <div id="weather"><Weather/></div>
            <div className="home__data" id="homeData">
              <span className="home__data-subtitle">Discover</span>
              <h1 className="home__data-title">
                Explore <b>Manali's</b> <br />
                Best
                <b>
                  Places <br />
                  With Us
                </b>
              </h1>
              <Link to="/auth/discover" id="link" className="button gbutton">
                Explore
              </Link>
            </div>

            <div className="social">
              <FontAwesomeIcon icon={faFacebook} className="social_each" />
              <FontAwesomeIcon icon={faTwitter} className="social_each" />
              <FontAwesomeIcon
                icon={faSquareInstagram}
                className="social_each"
              />
            </div>
            <div className="home__info">
              <div>
                <span className="home__info-title">MapView</span>
                <div>
                  <iframe
                    id="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d107806.31838135142!2d77.12256352016745!3d32.393770358966144!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904812723d6db55%3A0x6d9ec74f9b8c6205!2sAtal%20Tunnel!5e0!3m2!1sen!2sin!4v1716217695795!5m2!1sen!2sin" 
                    width="300"
                    height="190"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div className="home__info-overlay">
                <img
                  src="https://cdn.pixabay.com/photo/2016/12/30/23/07/manali-1941787__340.jpg"
                  alt="home"
                  className="home__info-img"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
