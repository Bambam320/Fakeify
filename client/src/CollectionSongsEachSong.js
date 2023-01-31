//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { Link, Outlet } from 'react-router-dom';

// imports styles and components
import "./Collection.css";

//imports material ui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function CollectionSongsEachSong({ playlist }) {
  const {setCurrentTrack} = useContext(SpotifyContext);

  let songs = playlist.songs.map((song) => {
    return (
      <Grid key={song.id} item component={Card} xs={2.2} sx={{ margin: '5px' }}>
      <CardActionArea >
        <div style={{ marginLeft: '-20px' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={song.cover_art}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {song.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {song.release_date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {song.featured_artist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {song.album.name}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
        <Button 
          onClick={() => {setCurrentTrack(song)}}
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginLeft: '25px',
            marginBottom: '5px',
            fontSize: '16px',
            transition: '200ms color ease-in',
          }}
        >
        <PlayCircleIcon sx={{marginRight: '5px'}}/>
          <h4>Track</h4>
        </Button>
    </Grid>
      )
  })

  return (
    <>
      {songs}
    </>
  )
}

export default CollectionSongsEachSong;