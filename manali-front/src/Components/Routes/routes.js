import { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/login";
import Home from "../Home/Body/home";
import Book from "../BookNow/book";
import About from "../About/about";
import Discover from "../Discover/discover";
import SignUp from "../SignUp/signup";

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: isAuthenticated ? <Home /> : <Login />,
        },
        {
          path: "signup",
          element: isAuthenticated ? <Home /> : <SignUp />,
        },

        {
          path: "/auth",
          children: [
            {
              path: "home",
              element: isAuthenticated ? <Home /> : <Login />,
            },

            {
              path: "book",
              element: isAuthenticated ? <Book /> : <Login />,
            },
            {
              path: "about",
              element: isAuthenticated ? <About /> : <Login />,
            },
            {
              path: "discover",
              element: isAuthenticated ? <Discover /> : <Login />,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    // Get the token from the local storage
    let authCheck = localStorage.getItem("isLoggedIn");
    if (authCheck) {
      setIsAuthenticated(true);
      return;
    }
    // Set the value of isAuthenticated to the token if it's not null, or an empty string otherwise
  }, [localStorage.getItem("isLoggedIn")]);

  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default Routes;
