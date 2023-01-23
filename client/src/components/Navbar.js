//functional imports
import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { Link, useNavigate } from 'react-router-dom';

// material ui components
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";

// css and component imports
import "../Header.css";
import "../Sidebar.css";
import "../SidebarOption.css";
import Header from '../Header';
import Playlist from '../Playlist';
import SidebarOption from "../SidebarOption";


function Navbar() {
  //sets state, context and navigate hooks
  const [errors, setErrors] = useState([])
  const { setCurrentPlaylist, localUser, setLocalUser } = useContext(SpotifyContext);
  const navigate = useNavigate();

  // creates and sets a brand new playlist with default values and sets state with the new playlist
  function handleCreateAndRouteToPlaylist() {
    fetch('/playlists', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instructions: "Make a new playlist, bitch!" })
    }).then((response) => {
      if (response.ok) {
        response.json().then((newPlaylist) => {
          setCurrentPlaylist(newPlaylist)
          setLocalUser({...localUser, playlists: [...localUser.playlists, newPlaylist]})
          setTimeout(navigate(`/playlists/${newPlaylist.id}`), 1000)
        });
      } else {
        response.json().then((err) => setErrors(err.errors));
      }
    })
  }

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
  }

  function reload() {
    navigate("/")
    window.location.reload();
  }

  return (
    <div className='sidebar'>
      <h1 
        className='logo' 
        onClick={() => {reload()}} 
        style={{cursor: 'pointer'}}
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
      <a component='a' href="http://localhost:3000/auth/spotify" className='sidebarOption' onClick={() => {console.log("a link is being fired")}}>
        <LoginIcon className="sidebarOption_icon" />
        <h4>Sign in with Spotify</h4>
      </a>
      <Button className='sidebarOption'
        sx={{
          color: 'grey',
          textTransform: 'none',
          height: '30px',
          marginLeft: '-8px',
          fontSize: '16px',
        }}
        onClick={handleCreateAndRouteToPlaylist}
      >
        <AddBoxIcon
          className="sidebarOption_icon"
        />
        <h4 >Create A Playlist</h4>
      </Button>

      <Typography variant="h6" className='sidebar_title' sx={{ marginTop: '2em', color: 'grey' }}>
        My Playlists
      </Typography>
      <hr />
      <ListUserPlaylists />
    </div>
  )
}

export default Navbar;