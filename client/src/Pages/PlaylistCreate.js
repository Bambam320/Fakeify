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

    //active storage update
    const [playlistCover, setPlaylistCover] = useState(null)

    console.log('file for creating playlist', playlistCover)

  // creates and sets a brand new playlist with default values and sets state with the new playlist
  function handleCreateAndRouteToPlaylist() {
    // send an actual image file uploaded from react and create a playlist with a
    // blob in the backend
    // then try updating it and make sure it can be read after create and update
    // then try sending a new file and creating the blob
    // then try making a blob, then a file from the blob, then sending it
    console.log('create a playlist')
    // const image = new File([defaultImage], 'add_button.png', {type: 'image/*'})
    const newPlaylistForm = new FormData()
    newPlaylistForm.append('cover_blob', playlistCover)
    fetch('/playlists', {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: newPlaylistForm,
    }).then((response) => {
      if (response.ok) {
        response.json().then((newPlaylist) => {
          console.log('create successful', newPlaylist)
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
    <>
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
    <Button
          variant="contained"
          component="label"
        >
          Select An Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => { setPlaylistCover(e.target.files[0]) }}
            hidden
          />
        </Button>
    </>
  )
}

export default PlaylistCreate