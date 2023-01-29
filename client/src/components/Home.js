//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import axios from 'axios';

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

  // add song artists to songs sent from search results in playlist and from search and from Home
  // get songs to play on the first playlist render in Home
  // add playlist name to the top of the songs in Home
  // figure out why playlists are not being cycled through

function Home() {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const { setCurrentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState({ id: '' });
  const [track, setTrack] = useState();
  const [requestRefresh, setRequestRefresh] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const domRef = useRef(null);
  
  //bring in featured songs from the spotify_api
  useEffect(() => {
    console.log("useeffect is firing")
    const retrieveRecommendedSongs = async () => {
      try {
        setLoader(true);
        const data = await axios
          .get(`/spotify_api/show_featured`)
          .then((res) => {
            setFeaturedSongs(res.data);
          });
          setLoader(false);
      } catch (err) {
        console.log("error", err)
      }
    }
    retrieveRecommendedSongs()
  }, [requestRefresh])

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


  //send the song to the player
  function sendToPlayer(e, track) {
    e.preventDefault()
    console.log("track", track)
    setCurrentTrack(track)
  }



  return (
    <div >
      <Grid container>
        <Box sx={{ width: '100%', maxWidth: 600 }} >
          <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px', marginTop: '-25px' }}>
            Hover over the song to listen.
          </Typography>
          <Typography variant="p" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px' }}>
            Click on the song to add to the selected playlist.
          </Typography>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '25px' }} >
            Enjoy the featured recommendations:
          </Typography>
        </Box>
        <FormControl variant="outlined" style={{ minWidth: 150, marginLeft: '-85px' }}
          sx={{
            "& .MuiInputLabel-root": { color: 'white' },
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
        <img src="/Infinity.gif" alt="infinity loader" style={{marginLeft: '250px'}}></img>
        :
        <Grid container spacing={4} width='1000px' sx={{ marginLeft: '35px', marginTop: '35px', marginBottom: '30px' }}>
          {featuredSongs.map((song) => {
            return (
              <Grid item >
                <div  >
                  <Card
                    onClick={(e) => console.log(e)}
                    onMouseEnter={(e) => sendToPlayer(e, song)}
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={song.album.images[0].url}
                    />
                  </Card>
                </div>
              </Grid>
            )
          })}
        </Grid>
      }
    </div>
  )
}

export default Home;