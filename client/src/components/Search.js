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
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link"

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
      <Grid item component={Card} xs={2.2} sx={{margin: '5px'}}>
           <CardActionArea component={Link} to={`/spotify_playlists/${playlist.id}`}>

        <div style={{marginLeft: '-20px'}}>
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
            </div>
            </CardActionArea>
      </Grid>
    )
  });

  let songResults = results.tracks.map((track) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{margin: '5px'}}>
        <div style={{marginLeft: '-20px'}}>
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
          </div>
      </Grid>
    )
  });
  
  
  let albumResults = results.albums.map((album) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{margin: '5px'}}>
        <div style={{marginLeft: '-20px'}}>
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
          </div>
      </Grid>
    )
  });

  
  let artistResults = results.artists.map((artist) => {
    console.log("artistf from search", artist)
    return (
      <Grid item component={Card} xs={2.2} sx={{margin: '5px'}}>
        <div style={{marginLeft: '-20px'}}>
          <CardMedia
            component="img"
            height="140"
            image={artist.images.length > 0 ? artist.images[0].url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Name: ${artist.name}`}
            </Typography>
          </CardContent>
          </div>
      </Grid>
    )
  });

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Playlists
      </Typography>
      <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }} >
        {playlistResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Songs
      </Typography>
      <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
        {songResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Albums
      </Typography>
      <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
        {albumResults}
      </Grid>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Artists
      </Typography>
      <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px'}}>
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