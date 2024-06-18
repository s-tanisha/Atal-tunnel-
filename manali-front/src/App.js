import React, { useState } from "react";
import Login from "./Components/Login/login";
import SignUp from "./Components/SignUp/signup";
// import Profile from './Components/Profile/profile';
import Profile from "./Components/Profile/profile";
import Header from "./Components/Home/Header/header";
import Home from "./Components/Home/Body/home";
import Book from "./Components/BookNow/book";
import About from "./Components/About/about";
import Discover from "./Components/Discover/discover";
import Routes from "./Components/Routes/routes";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;

{
  /* <div>
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="discover" element={<Discover />} />
            <Route path="book" element={<Book />} />
          </Routes>
        </>
      )}
    </div> */
}
