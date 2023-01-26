//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { useNavigate } from 'react-router-dom';

// imports styles and components
import SongResultPlayListForm from './SongResultPlayListForm';

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

function Search() {
  // sets hooks
  const { mainSearch, setMainSearch, setCurrentQueue, setCurrentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const navigate = useNavigate();
  const [results, setResults] = useState({
    artists: [],
    tracks: [],
    albums: [],
    playlists: [],
  });
  const [errors, setErrors] = useState([]);

  //Loads search results when rendered or when the main search field has a new value entered
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

  //send the song and list of songs as queue to the front end
  function sendToPlayer(e, track) {
    e.preventDefault()
    setCurrentTrack(track)
    setCurrentQueue(results.tracks)
  }

  // lists the playlist search results as 10 cards max
  let playlistResults = results.playlists.map((playlist) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <CardActionArea component={Link} to={`/spotify_playlists/${playlist.id}`}>
          <div style={{ marginLeft: '-20px' }}>
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

  // lists the song search results as 10 cards max
  let songResults = results.tracks.map((track) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <div style={{ marginLeft: '-20px' }}>
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
            <Button size="small" onClick={(e) => sendToPlayer(e, track)}>Play</Button>
          </CardActions>
          <CardActions>
            <SongResultPlayListForm track={track} />
          </CardActions>
        </div>
      </Grid>
    )
  });

  // lists the album search results as 10 cards max
  let albumResults = results.albums.map((album) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <div style={{ marginLeft: '-20px' }}>
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

  // lists the artist search results as 10 cards max
  let artistResults = results.artists.map((artist) => {
    return (
      <Grid item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <div style={{ marginLeft: '-20px' }}>
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
      {results.playlists.length === 0 ? 
        <h2 style={{color: 'white', marginLeft: '100px'}}>Submit a search in the bar above! It may take up to a few seconds to return results.</h2> 
        : 
        <></>
      }
      {results.playlists.length > 0 ?
        <>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
            Playlists
          </Typography>
          <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }} >
            {playlistResults}
          </Grid>
          <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
        </>
        :
        <></>
      }

      {results.tracks.length > 0 ?
        <>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
            Songs
          </Typography>
          <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
            {songResults}
          </Grid>
          <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
        </>
        :
        <></>
      }

      {results.albums.length > 0 ?
        <>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
            Albums
          </Typography>
          <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
            {albumResults}
          </Grid>
          <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
        </>
        :
        <></>
      }
      {results.albums.length > 0 ?
        <>
          <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
            Artists
          </Typography>
          <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
            {artistResults}
          </Grid>
          <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
        </>
        :
        <></>
      }
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