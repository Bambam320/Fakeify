//functional imports
import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { Link, useNavigate } from 'react-router-dom';

// css and component imports
import "../CSS/Header.css";
import "../CSS/Sidebar.css";
import "../CSS/SidebarOption.css";
import PlaylistCreate from "../Pages/PlaylistCreate";

// material ui components
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  //sets state, context and navigate hooks
  const { localUser } = useContext(SpotifyContext);
  const navigate = useNavigate();

  //sort and map over users playlists and list them as links
  const ListUserPlaylists = () => {
    let updatedPlaylistLinks = localUser.playlists
      .sort((a, b) => a.id - b.id)
      .map((playlist) => {
        return (
          <Link
            to={`playlists/${playlist.id}`}
            className='sidebarPlaylists'
            key={playlist.name}
          >
            <Avatar
              src={playlist.image}
              className="sidebarOption_icon"
            />
            <h4>{playlist.name}</h4>
          </Link>
        )
      })
    return updatedPlaylistLinks
  };

  // reloads the window when the icon at the top left is clicked
  function reload() {
    navigate("/")
    window.location.reload();
  };

  return (
    <div className='sidebar'>
      <h1
        className='logo'
        onClick={() => { reload() }}
        style={{ cursor: 'pointer' }}
      >
        🎶Fakeify&reg;
      </h1>
      <Link to="/home" className='sidebarOption'>
        <HomeIcon className="sidebarOption_icon" />
        <h4>Home</h4>
      </Link>
      <Link to="/search" className='sidebarOption'>
        <SearchIcon className="sidebarOption_icon" />
        <h4>Search</h4>
      </Link>
      <Link to="/collection" className='sidebarOption'>
        <LibraryMusicIcon className="sidebarOption_icon" />
        <h4>My Library</h4>
      </Link>
      <a component='a' href="https://spotify-app-8rdu.onrender.com/auth/spotify" className='sidebarOption' onClick={() => { }}>
        <LoginIcon className="sidebarOption_icon" />
        <h4>Sign in with Spotify</h4>
      </a>
      <PlaylistCreate />
      <Typography variant="h6" className='sidebar_title' sx={{ marginTop: '2em', color: 'grey' }}>
        My Playlists
      </Typography>
      <hr />
      <ListUserPlaylists />
    </div>
  );
};

export default Navbar;