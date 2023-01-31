//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { Link, Outlet } from 'react-router-dom';

// imports styles and components
import "./Collection.css";
import CollectionAlbumsEachAlbum from "./CollectionAlbumsEachAlbum";

//imports material ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function CollectionAlbums() {
  const { localUser } = useContext(SpotifyContext);

  let localAlbums = localUser.playlists.map((playlist) => {
    return (
      <>
        <Typography key={playlist.name} variant="h6" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px', marginTop: '30px' }}>
          {playlist.songs.length > 0 ? `Playlist: ${playlist.name}` : <></>}
        </Typography>
        <Grid key={playlist.id} container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px' }}>
          <CollectionAlbumsEachAlbum playlist={playlist}/>
        </Grid>
      </>
    )
  });

  return (
    <>
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Albums
      </Typography>
      {localAlbums}
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
    </>
  )
}

export default CollectionAlbums