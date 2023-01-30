//functional imports
import React from "react";
import { Link } from 'react-router-dom';

// imports styles and components
import "./Collection.css";

//imports material ui
import Grid from '@mui/material/Grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import PeopleIcon from '@mui/icons-material/People';

function CollectionLinks() {
  return (
    <Grid container sx={{ marginLeft: '10em', marginBottom: '4em' }} spacing={10} width='600'>
      <Grid item>
        <Link to="/collection/playlists" className='collectionLink' >
          <FeaturedPlayListIcon className="collectionLink_icon" />
          <h4> Playlists </h4>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/collection/songs" className='collectionLink' >
          <MusicNoteIcon className="collectionLink_icon" />
          <h4> Songs </h4>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/collection/artists" className='collectionLink' >
          <PeopleIcon className="collectionLink_icon" />
          <h4> Artists </h4>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/collection/albums" className='collectionLink' >
          <AlbumIcon className="collectionLink_icon" />
          <h4> Albums </h4>
        </Link>
      </Grid>
    </Grid>
  )
}

export default CollectionLinks;