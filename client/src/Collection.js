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

function Collection() {
  // sets hooks
  const { mainSearch, setMainSearch, setCurrentQueue, setCurrentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const [errors, setErrors] = useState([]);

  console.log('localuser', localUser)
  
  return (
    <div>
      <CollectionLinks />
  
      <div className='errordiv'>
        {errors.map((error) => {
          return <p key={error} className='error'>{error}</p>;
        })}
      </div>
      <Outlet />
    </div>

  )
}

export default Collection