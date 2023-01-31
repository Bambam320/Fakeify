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

function CollectionAlbumsEachAlbum({playlist}) {

  let albums = [...new Map(playlist.songs.map((song) => [song.album.name, song])).values()]
  .map((song) => {
    let album = song.album
    return (
      <Grid key={album.spotify_id} item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <CardActionArea >
          <div style={{ marginLeft: '-20px' }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={album.image_url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {album.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Artist: ${album.artist_name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Released: ${album.release_date}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Tracks: ${album.total_tracks}`}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Grid>
    )
  });

  return (
    <>
      {albums}
    </>
  )
}

export default CollectionAlbumsEachAlbum