import { React, useState } from "react";
import "../../css/styles.css";
import "../../css/main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Api/api";
import UseApi from "../Hook/UseApi";

function SignUp() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleUserSignup = async () => {
    try {
      const url = api.signup();
      const userLoginResponse = await UseApi(url, "post", {
        email: userEmail,
        name: name,
        password: password || "",
        type: "signup",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="shortcut icon"
          href="assets/img/favicon.png"
          type="image/png"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="assets/css/styles.css" />
        <link rel="stylesheet" href="assets/css/main.css" />
        <title>Sign Up with Us</title>
      </head>
      <body>
        <img
          src="https://images.unsplash.com/photo-1592058879796-8378fba3961f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a3VsbHUlMjBtYW5hbGl8ZW58MHx8MHx8&w=1000&q=80"
          alt=""
          className="home_img"
        />
        <div className="home_container container grid">
          <div className="home__data">
            <div className="flex items-center h-screen w-full">
              <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <h1 className="block w-full text-center text-grey-darkest mb-6">
                  Sign Up
                </h1>
                <form className="mb-4 md:flex md:flex-wrap md:justify-between">
                  <div className="field-group mb-4 md:w-1/2">
                    <label className="field-label" htmlFor="first_name">
                      Name
                    </label>
                    <input
                      className="field md:mr-2"
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="on"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="field-group mb-4 md:w-full">
                    <label className="field-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="field"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="field-group mb-6 md:w-full">
                    <label className="field-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="field"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="on"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-teal mx-auto"
                    type="button"
                    onClick={handleUserSignup}
                  >
                    Create Account
                  </button>
                  <button
                    className="btn btn-teal mx-auto"
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <script src="assets/js/scrollreveal.min.js"></script>
        <script src="assets/js/swiper-bundle.min.js"></script>
        <script src="assets/js/form.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="assets/js/main.js"></script>
      </body>
    </html>
  );
}

export default SignUp;
