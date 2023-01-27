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
  // add songs to be played from playlist
  let playlistResults = results.playlists.map((playlist) => {
    console.log(playlist)
    return (
      <Grid item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <CardActionArea component={Link} to={`/spotify_playlists/${playlist.id}`}>
          <div style={{ marginLeft: '-20px' }}>
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
          <CardActions>
            <Button size="small" onClick={(e) => sendToPlayer(e, track)}>Play</Button>
          </CardActions>
            <SongResultPlayListForm track={track} />
          </CardContent>
        </div>
      </Grid>
    )
  });

  // lists the album search results as 10 cards max
  // add songs from album to be played
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
  // add albums and their songs for previews
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