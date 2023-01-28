//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { useNavigate } from 'react-router-dom';

//css and component imports
import '../SongRow.css'

//imports material ui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

function Home() {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const { setCurrentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const [errors, setErrors] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '' });
  const [track, setTrack] = useState();
  const [requestRefresh, setRequestRefresh] = useState(false);

  //bring in featured songs from the spotify_api
  useEffect(() => {
  }, [requestRefresh])

  function check () {
    fetch(`/spotify_api/show_featured`)
      .then((res) => {
        if (res.ok) {
          res.json().then((songs) => {
            setFeaturedSongs(songs)
          })
        }
      })
    }





  //sets the playlist that the local user wants to add a song to
  function handleLocalPlaylistSelect(e) {
    let thisPlaylist = localUser.playlists.find((playlist) => playlist.id === e.target.value)
    setSelectedPlaylist(thisPlaylist)
  }

  //sets the selected playlist to an empty string so the value returns to null
  function handleLocalPlaylistDeselect() {
    setSelectedPlaylist({ id: '' })
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

  console.log("featuredSongs", featuredSongs)

  return (
    <>
      <Grid container>
        <Box sx={{ width: '100%', maxWidth: 600}}>
          <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px', marginTop: '-25px'}}>
            Hover over the song to listen. 
          </Typography>
          <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px'}}>
            Click to add to the selected playlist.
          </Typography>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px'}}>
            Enjoy the featured recommendations:
          </Typography>
        </Box>
        <FormControl variant="outlined" style={{ minWidth: 150, marginLeft: '-15px' }}
          sx={{
            "& .MuiInputLabel-root": {color: 'white'},
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "white",
                color: "orange"
              }
            }
          }}
        >
          <InputLabel id="playlist-select">Select Playlist</InputLabel>
          <Select
            labelId="playlist-select"
            id="playlist-select"
            value={selectedPlaylist.id}
            onChange={handleLocalPlaylistSelect}
            label="selectedPlaylist"
            sx={{backgroundColor: '#a7a7a8'}}
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
        <Button 
          onClick={() => {
            check()
            setRequestRefresh(!requestRefresh)}}
          className='sidebarOption'
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginLeft: '50px',
            marginTop: '10px',
            fontSize: '16px',
          }}
        > 
          <RefreshIcon sx={{marginRight: '5px'}} />
          <h4> Refresh recommended playlist </h4>
        </Button>
      </Grid>
      <Grid container >
          { featuredSongs.map((song) => {
            return (
              <Grid item component={Card}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                // image={song.images}
              />
              </Grid>
            )
          })}
      </Grid>
    </>
  )
}

export default Home;