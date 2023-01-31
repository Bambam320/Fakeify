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


function CollectionArtistsEachArtist({ playlist }) {


  let artists = [...new Map(playlist.songs.map((song) => [song.artist.name, song])).values()]
  .map((song) => {
    let artist = song.artist
    return (
      <Grid key={artist.spotify_id} item component={Card} xs={2.2} sx={{ margin: '5px' }}>
        <CardActionArea >
          <div style={{ marginLeft: '-20px' }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={artist.image_url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {artist.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Followers: ${artist.followers}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Genres: ${artist.genres.replace(/[\[\]"]+/g, '')}`}
              </Typography>
            </CardContent>

          </div>
        </CardActionArea>
      </Grid>
      )
  })

  return (
    <>
      {artists}
    </>
  )
}

export default CollectionArtistsEachArtist