//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { useNavigate } from 'react-router-dom';

//imports material ui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

function Home() {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const { setCurrentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const [errors, setErrors] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '' });
  const [track, setTrack] = useState();

  //bring in featured songs from the spotify_api
  useEffect(() => {
    fetch(`/spotify_api/show_featured`)
      .then((res) => {
        if (res.ok) {
          res.json().then((songs) => {
            setFeaturedSongs(songs)
          })
        }
      })
  }, [])

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

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddSongToPlaylist() {
    console.log("track", track)
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotify_album_id: track.album.id,
        playlist_id: selectedPlaylist.id,
        spotify_artist_id: track.artists[0].id,
        featured_artist: track.artists[0].name,
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        preview_url: track.preview_url,
        cover_art: track.album.images[0].url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSong) => {
          console.log("newsong", newSong)
          let updatedPlaylists = localUser.playlists.map((pl) => {
            console.log("selectedplaylist", selectedPlaylist)
            console.log("pl", pl)
            if (selectedPlaylist.id === pl.id) {
              pl.songs.push(newSong)
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    })
  }

  console.log("featuredPlaylists", featuredPlaylists)

  return (
    <>
      <Grid container>
        <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
          Enjoy the featured recommendations:
        </Typography>
        <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
          Hover over the song to listen to it or click to add them to the selected. Playlist.
        </Typography>
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
      </Grid>
      <Grid container >
          { featuredSongs.map((song) => {
            return (
              <Grid item component={Card}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={playlist.images.length > 0 ? 
                  playlist.images[0].url
                :
                  "data:image/jpeg;base64,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"
                }
              />
              </Grid>
            )
          })}
      </Grid>
    </>
  )
}

export default Home;