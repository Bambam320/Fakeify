// importing hooks, route components and context
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotifyContext } from "../SpotifyContext";

// importing components from nodes
import { HelmetProvider } from "react-helmet-async";
import Grid from '@mui/material/Grid';

// importing components and css
import "../CSS/Body.css";
import Collection from "../Pages/Collection_Group/Collection";
import CollectionPlaylists from "../Pages/Collection_Group/CollectionPlaylists";
import CollectionAlbums from "../Pages/Collection_Group/CollectionAlbums";
import CollectionArtists from "../Pages/Collection_Group/CollectionArtists";
import CollectionSongs from "../Pages/Collection_Group/CollectionSongs";
import Footer from "./Footer";
import Header from "./Header";
import Helmetcode from "./Helmetcode";
import Home from "../Pages/Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Playlist from "../Pages/Playlist";
import Profile from "../Pages/Profile";
import Search from "../Pages/Search";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localUser, setLocalUser] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [currentTrack, setCurrentTrack] = useState();
  const [currentQueue, setCurrentQueue] = useState([]);
  const [mainSearch, setMainSearch] = useState('');
  const [autoLoginError, setAutoLoginError] = useState([]);
  const [playState, setPlayState] = useState(false);

  // checks the browser session for a logged in user and automatically
  // logs them in, sets localuser, set login error for login component
  // , sets authenticated to allow routes
  useEffect(() => {
    (async () => {
      const response = await fetch("/me");
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setLocalUser(data);
      } else {
        setAutoLoginError(data.errors)
      };
    })();
  }, []);

  // display login/signup if no user is logged in
  ////////////////// Add this to protected routes in the future so that helmet will work without the component route error
  if (!isAuthenticated)
    return (
      <SpotifyContext.Provider value={{ setIsAuthenticated, setLocalUser, autoLoginError }}>
        <HelmetProvider>
          <Helmetcode />
          <Login />
        </HelmetProvider>
      </SpotifyContext.Provider>
    );

  return (
    <Router>
      <SpotifyContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          localUser,
          setLocalUser,
          currentPlaylist,
          setCurrentPlaylist,
          currentTrack,
          setCurrentTrack,
          currentQueue,
          setCurrentQueue,
          mainSearch,
          setMainSearch,
          playState,
          setPlayState
        }}
      >
        <Helmetcode />
        <Grid container>
          <Grid item >
            <Navbar />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path="/playlists/:id" element={<Playlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/collection/' element={<Collection />}>
                <Route path='playlists' element={<CollectionPlaylists />} />
                <Route path='songs' element={<CollectionSongs />} />
                <Route path='albums' element={<CollectionAlbums />} />
                <Route path='artists' element={<CollectionArtists />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
        {currentTrack ? <Footer /> : <></>}
      </SpotifyContext.Provider>
    </Router>
  );
};

export default App;