//functional imports
import React, { useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { useNavigate } from 'react-router-dom';

// imports styles and components

//imports material ui
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Search() {
  // sets hooks
  const { mainSearch, setMainSearch, setCurrentQueue, setCurrentTrack } = useContext(SpotifyContext);
  const navigate = useNavigate();
  const [results, setResults] = useState({
    artists: [],
    tracks: [],
    albums: [],
    playlists: [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (mainSearch.length > 0) {
      fetch(`/spotify_api/browse?term=${mainSearch}`).then((response) => {
        if (response.ok) {
          response.json().then((results) => {
            setResults(results)
            setMainSearch('')
          });
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }, [mainSearch])

  function setToPlayer(e, track) {
    e.preventDefault()
    setCurrentTrack(track)
    setCurrentQueue(results.tracks)
  }

  console.log("results", results)

  let playlistResults = results.playlists.map((playlist) => {
    return (
      <Grid item xs={2.2}>
        <Card sx={{ maxWidth: 250 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={playlist.images[0].url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {playlist.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Owned by: ${playlist.owner.display_name}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  });

  let songResults = results.tracks.map((track) => {
    return (
      <Grid item xs={2.2}>
        <Card sx={{ maxWidth: 250 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={track.album.images[0].url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Name: ${track.name}`}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {`Artist: ${track.artists[0].name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Album: ${track.album.name}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(e) => setToPlayer(e, track)}>Play</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  });
  
  
  let albumResults = results.albums.map((album) => {
    return (
      <Grid item xs={2.2}>
        <Card sx={{ maxWidth: 250 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={album.images[0].url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Name: ${album.name}`}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {`Artist: ${album.artists[0].name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Released on: ${album.release_date}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  });

  // image={artist.images ? artist.images[0].url : "data:image/jpeg;base64,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"}
  
  let artistResults = results.artists.map((artist) => {
    return (
      <Grid item xs={2.2}>
        <Card sx={{ maxWidth: 250 }}>
          <CardMedia
            component="img"
            height="140"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Name: ${artist.name}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  });

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Playlists
      </Typography>
      <Grid container spacing={2} maxWidth='1100px' sx={{ marginLeft: '30px' }}>
        {playlistResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Songs
      </Typography>
      <Grid container spacing={2} maxWidth='1100px' sx={{ marginLeft: '30px' }}>
        {songResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Albums
      </Typography>
      <Grid container spacing={2} maxWidth='1100px' sx={{ marginLeft: '30px' }}>
        {albumResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Artists
      </Typography>
      <Grid container spacing={2} maxWidth='1100px' sx={{ marginLeft: '30px' }}>
        {artistResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      {/* {errors.map((error) => {
          return (
            <span key={error} className='error'>
              {error}
            </span>
          );
        })} */}
    </div>

  )
}

export default Search;