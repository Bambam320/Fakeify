import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotifyContext } from "./SpotifyContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => {
  //         setIsAuthenticated(true);
  //         setUser(user);
  //       });
  //     }
  //   });
  // }, []);

  console.log("usefr", user)
  console.log("auth", isAuthenticated)

  // Reroute user to <Login /> Component if not authenticated
  if (!isAuthenticated) return (
    <SpotifyContext.Provider value={{ setUser, setIsAuthenticated }} >
      <Login />;
    </SpotifyContext.Provider>
  )

  return (
    <Router>
      <SpotifyContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
      >
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
        


        </Routes>
      </SpotifyContext.Provider>
    </Router>
  );
};

export default App;
