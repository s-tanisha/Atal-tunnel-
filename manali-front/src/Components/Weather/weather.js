import React from "react";
import { useState } from "react";
import "./weather.css";

function Weather() {
  const api = {
    key: "6ccbc9bd2bf34768c27898871558f1bd",
    base: "https://api.openweathemap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  console.log(weather, "=========");

  return (
    <div className="weather_main">
      <div className="search_weather">
        
        <input
          className="input_weather"
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.value)}
        />
        <button className="search_butn" onClick={searchPressed}>
          Search
        </button>
      </div>

      {typeof weather.main !== "undefined" ? (
        <>
          <div id="weather_det1">
            <p id="w">{weather.name}</p>

            <p id="w">{weather.main.temp}°C</p>
          
            <p id="w">{weather.weather[0].main}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Weather;
