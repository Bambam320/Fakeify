//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import axios from 'axios';

//css and component imports
import "../CSS/Body.css";
import '../CSS/SongRow.css'
import HomeSong from "./HomeSong";

//imports material ui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

function Home() {
  // sets context, state and ref hooks
  const { setCurrentTrack, setCurrentQueue, localUser, setLocalUser } = useContext(SpotifyContext);
  const snackbarInfo = useRef(null);
  const [errors, setErrors] = useState([]);
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState({
    name: '',
    description: ''
  });
  const [requestRefresh, setRequestRefresh] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '', name: '' });
  const [successOpen, setSuccessOpen] = useState(false);
  const [track, setTrack] = useState();

  //bring in featured songs from the spotify_api
  useEffect(() => {
    const retrieveRecommendedSongs = async () => {
      try {
        setLoader(true);
        const data = await axios
          .get(`/spotify_api/show_featured`)
          .then((res) => {
            setFeaturedSongs(res.data.songs);
            setPlaylistInfo(res.data.playlist_info)
          });
        setLoader(false);
        setErrors([])
      } catch (err) {
        setErrors(err.errors);
      }
    }
    retrieveRecommendedSongs()
  }, [requestRefresh])

  //sets the playlist that the local user wants to add a song to
  function handleLocalPlaylistSelect(e) {
    let thisPlaylist = localUser.playlists.find((playlist) => playlist.id === e.target.value)
    setSelectedPlaylist(thisPlaylist)
    setErrors([])
  }

  //sets the selected playlist to an empty string so the value returns to null
  function handleLocalPlaylistDeselect() {
    setSelectedPlaylist({ id: '' })
  }

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddSongToPlaylist(track) {
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
        cover_art: track.album.images[0].url,
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
          snackbarInfo.current = track.name
          setSuccessOpen(true);
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      };
    });
  };

  //send the song and entire playlist to the player
  function sendToPlayer(e, track) {
    e.preventDefault()
    setCurrentQueue(featuredSongs)
    setCurrentTrack(track)
  };

  //handle closing of success message
  function handleSuccessClose() {
    setSuccessOpen(false);
  };

  return (
    <div >
      <Grid container>
        <Box sx={{ width: '100%', maxWidth: 350 }} >
          <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px', marginTop: '-25px', marginBottom: '25px' }}>
            Hover to listen. Click to add.
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px' }} >
            Choose a Playlist first:
          </Typography>
          <div className='errordiv' style={{ marginLeft: '10em' }}>
            {errors.map((error) => {
              return <p key={error} className='error'>{error}</p>;
            })}
          </div>
        </Box>
        <FormControl variant="outlined" style={{ minWidth: 150 }}
          sx={{
            "& .MuiInputLabel-root": { color: 'white' },
            '&.Mui-focused .MuiInputLabel-root': {
              color: 'white',
            },
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
            sx={{ backgroundColor: '#a7a7a8' }}
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
            setRequestRefresh(!requestRefresh)
          }}
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
          <RefreshIcon sx={{ marginRight: '5px' }} />
          <h4> Recommend A Playlist </h4>
        </Button>
      </Grid>
      {loader ?
        <img src="/Infinity.gif" alt="infinity loader" style={{ marginLeft: '250px' }}></img>
        :
        <>
          <Grid container>
            <Box sx={{ width: '100%', maxWidth: 600 }} >
              <Typography variant="h4" component="div" sx={{ color: 'white', marginLeft: '25px', marginTop: '25px' }}>
                {playlistInfo.name}
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'purple', marginLeft: '25px' }}>
                {playlistInfo.description}
              </Typography>
            </Box>
          </Grid>
          <Grid container spacing={4} width='1000px' sx={{ marginLeft: '35px', marginTop: '35px', marginBottom: '125px' }}>
            {featuredSongs.map((song) => {
              return (
                <HomeSong
                  key={song.id}
                  song={song}
                  onAddSong={handleAddSongToPlaylist}
                  playSong={sendToPlayer}
                />
              )
            })}
          </Grid>
        </>
      }
      <Grid>
        <Grid item>
          <div />
        </Grid>
      </Grid>
      <Snackbar open={successOpen} autoHideDuration={1000} onClose={handleSuccessClose}>
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successOpen ?
            `You have successfully added "${snackbarInfo.current}" to ${selectedPlaylist.name}`
            :
            ''
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Home;