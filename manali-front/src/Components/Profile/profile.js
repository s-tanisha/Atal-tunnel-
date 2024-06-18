import React, { useState, useEffect } from "react";
import "./profile.css";
import $ from "jquery";
import { api } from "../Api/api";
import UseApi from "../Hook/UseApi";
import { handleLogout } from "../helper/handleLogout";

function Profile() {
  const [toggled, setToggled] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [bookingDetails, setBookingDetails] = useState();

  console.log(userDetails, bookingDetails);

  const getUserDetails = async () => {
    const url = api?.userDetails();
    const userDetailsResponse = await UseApi(url, "get");
    console.log(userDetailsResponse, "this is the reponse xxxxxxxxxxxx");
    setUserDetails(userDetailsResponse?.data[0]);
  };

  const getBookingDetails = async () => {
    const url = api.getBookingDetails();
    const bookingDetailsResponse = await UseApi(url, "get");
    console.log(bookingDetailsResponse, "this is the reponse xxxxxxxxxxxx");
    setBookingDetails(bookingDetailsResponse?.data);
  };

  useEffect(() => {
    getUserDetails();
    getBookingDetails();
  }, []);


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Responsive sidebar template with sliding effect and dropdown menu based on bootstrap 3"
        />
        <title>Sidebar template</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
          rel="stylesheet"
        />
        <link href="index.css" rel="stylesheet" />
      </head>
      <body>
        <div
          className={`page-wrapper chiller-theme ${toggled ? "toggled" : ""}`}
        >
          <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
            <i className="fas fa-bars"></i>
          </a>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-brand">
                <a href="#">Profile</a>
                <div id="close-sidebar">
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="sidebar-header">
                <div className="user-pic">
                  <img src="/img/bckg111.webp" alt="User picture" />
                </div>
                <div className="user-info">
                  <span className="user-name">{userDetails?.name}</span>
                  <span className="user-role"> {userDetails?.email}</span>
                  <span className="user-status">
                    <i className="fa fa-circle"></i>
                    <span>Online</span>
                  </span>
                </div>
              </div>
              <div className="sidebar-search">
                <div>
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text">Booking Details</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar-menu">
                <ul>
                  <li className="header-menu">
                    <span>General</span>
                  </li>
                  <div className="sidebar-footer">
                    <a href="#"></a>
                    <a href="#"></a>
                    <button id="butt" onClick={handleLogout}>
                      Logout
                    </button>
                    <a href="#"></a>
                    <a href="#"></a>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <script src="index.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}

export default Profile;
