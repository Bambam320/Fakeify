//functional imports
import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { useNavigate } from 'react-router-dom';

// file imports
import defaultImage from "../images/add_image.png";

// material ui components
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

function PlaylistCreate() {
  //sets state, context and navigate hooks
  const { setCurrentPlaylist, localUser, setLocalUser } = useContext(SpotifyContext);
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  // creates and sets a brand new playlist with default values and sets state with the new playlist
  function handleCreateAndRouteToPlaylist() {
    const image = new File([defaultImage], 'add_button.png', {type: 'image/*'})
    fetch('/playlists', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instructions: "Make a new playlist" })
    }).then((response) => {
      if (response.ok) {
        response.json().then((newPlaylist) => {
          setCurrentPlaylist(newPlaylist)
          setLocalUser({ ...localUser, playlists: [...localUser.playlists, newPlaylist] })
          setTimeout(navigate(`/playlists/${newPlaylist.id}`), 1000)
        });
      } else {
        response.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
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
  )
}

export default PlaylistCreate