import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from './components/Home';
import Player from './Player'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotifyContext } from "./SpotifyContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

console.log("isauthenticated from app", isAuthenticated)

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

console.log("user", user)
console.log("auth", isAuthenticated)

  if (!isAuthenticated) return (<Login /> );

  return (
    <Router>
        <SpotifyContext.Provider
          value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
        >
        <Routes>
          <Route path="/" element={<Player />}/>
          <Route path='/login' element={ <Login/> } />


        </Routes>
    </SpotifyContext.Provider>
      </Router>
  );
};

export default App;
