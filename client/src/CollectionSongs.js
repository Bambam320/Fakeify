//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { Link, Outlet } from 'react-router-dom';

// imports styles and components
import "./Collection.css";
import CollectionLinks from "./CollectionLinks";

//imports material ui
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PeopleIcon from '@mui/icons-material/People';

function CollectionSongs() {
  const { localUser } = useContext(SpotifyContext);

  let localPlaylists = localUser.playlists.map((playlist) => {
    return (
      <Grid key={playlist.id} container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
        {localSongs(playlist)}
      </Grid>
    )
  })

  function localSongs(playlist) {
    playlist.songs.map((song) => {
      console.log("songs", song)
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
        </Grid>
      )
    });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Songs
      </Typography>
      {localPlaylists}
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
    </>
  )
}

export default CollectionSongs