//functional imports
import React, { useContext, useState } from "react";
import { SpotifyContext } from "../SpotifyContext";

//imports material ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardActionArea from "@mui/material/CardActionArea";
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar';

function SongResultPlayListForm({ track }) {
  // sets hooks for state and from context
  const { localUser, setLocalUser } = useContext(SpotifyContext);
  const [addToPlaylist, setAddToPlaylist] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '' });
  const [successOpen, setSuccessOpen] = useState(false);

  //sets the playlist that the local user wants to add a song to
  function handleLocalPlaylistSelect(e) {
    let thisPlaylist = localUser.playlists.find((playlist) => playlist.id === e.target.value)
    setSelectedPlaylist(thisPlaylist)
  }

  //sets the selected playlist to an empty string so the value returns to null
  function handleLocalPlaylistDeselect() {
    setSelectedPlaylist({ id: '' })
  }

  //boolean to display playlist select menu
  function handleDisplayAddToPlaylistSelect() {
    setAddToPlaylist(!addToPlaylist)
  }

    //handle closing of success message
    function handleSuccessClose() {
      setSuccessOpen(false);
    };

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddSongToPlaylist() {
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotify_id: track.id,
        spotify_album_id: track.album.id,
        playlist_id: selectedPlaylist.id,
        spotify_artist_id: track.artists[0].id,
        featured_artist: track.artists[0].name,
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        preview_url: track.preview_url,
        image_url: track.album.images[0].url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSong) => {
          let updatedPlaylists = localUser.playlists.map((pl) => {
            if (selectedPlaylist.id === pl.id) {
              pl.songs.push(newSong)
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
          setSuccessOpen(true);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    })
  }

  return (
    <>
      <CardActions>
        <Button size="small" onClick={() => handleDisplayAddToPlaylistSelect()}>Add to playlist...</Button>
      </CardActions>
      <CardActionArea sx={{ marginLeft: '10px' }}>
        {addToPlaylist ?
          <FormControl variant="outlined" style={{ minWidth: 150, marginLeft: '-15px' }} >
            <InputLabel id="playlist-select">Select Playlist</InputLabel>
            <Select
              labelId="playlist-select"
              id="playlist-select"
              value={selectedPlaylist.id}
              onChange={handleLocalPlaylistSelect}
              label="selectedPlaylist"
            >
              <MenuItem value={selectedPlaylist.id} onClick={(e) => handleLocalPlaylistDeselect(track, e)}> Select A Playlist </MenuItem>
              {localUser.playlists.map((playlist) => {
                let id = playlist.id
                return (
                  <MenuItem key={id} value={id} >{`${playlist.name}`}</MenuItem>
                )
              })}
            </Select>
          </FormControl >
          :
          <></>
        }
      </CardActionArea>
      {addToPlaylist ?
        <Button
          size="small"
          onClick={handleAddSongToPlaylist}
          sx={{ marginLeft: '10px', marginBottom: '10px' }}
        >Add Song</Button>
        :
        <></>
      }
      <Snackbar open={successOpen} autoHideDuration={1000} onClose={handleSuccessClose}>
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successOpen ?
            `You have successfully added "${track.name}" to ${selectedPlaylist.name}`
            :
            ''
          }
        </Alert>
      </Snackbar>
      <div className='errordiv'>
        {errors.map((error) => {
          return <p key={error} className='error'>{error}</p>;
        })}
      </div>
    </>
  );
};

export default SongResultPlayListForm;