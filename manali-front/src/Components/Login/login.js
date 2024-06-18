import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/styles.css";
import "../../css/main.css";
import { api } from "../Api/api";
import UseApi from "../Hook/UseApi";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async () => {
    try {
      const url = api.login();
      const userLoginResponse = await UseApi(url, "post", {
        email: userEmail,
        name: "",
        password: password || "",
        type: "login",
      });

      if (userLoginResponse?.status === 400) {
        console.log(userLoginResponse?.data?.message);
        alert(`${userLoginResponse?.data?.message}`);
        return toast.error(`hello`);
      }
      localStorage.setItem("isLoggedIn", true);
      // alert(`${userLoginResponse?.message}`);
      window.location.reload();
      navigate("/auth/home");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1592058879796-8378fba3961f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a3VsbHUlMjBtYW5hbGl8ZW58MHx8MHx8&w=1000&q=80"
        alt=""
        className="home_img"
      />
      <div className="flex items-center h-screen w-full bg-teal-lighter">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <h1 className="block w-full text-center text-grey-darkest mb-6">
            Login
          </h1>
          <form className="mb-4 md:flex md:flex-wrap md:justify-between">
            <div className="field-group mb-4 md:w-1/2">
              <label className="field-label" htmlFor="user_name">
                Email
              </label>
              <input
                className="field md:mr-2"
                type="text"
                name="user_name"
                id="user_name"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="field-group mb-6 md:w-full">
              <label className="field-label" htmlFor="pass_word">
                Password
              </label>
              <input
                className="field"
                type="password"
                name="password"
                id="pass_word"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-teal mx-auto"
              type="button"
              onClick={handleUserLogin}
            >
              LOGIN
            </button>
            <button
              className="btn btn-teal mx-auto"
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
