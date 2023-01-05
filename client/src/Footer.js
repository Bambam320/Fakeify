import React from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from "@mui/material";

// ************Asks us to be premium users*****************
//  import SpotifyPlayer from 'react-spotify-web-playback';
// <SpotifyPlayer
// token=""
// uris={['spotify:artist:3mvkWMe6swnknwscwvGCHO']}
// />
// ********************************************************
// May be a possibility
function Footer() {
  return (
    <div className='footer'>
      <div className='footer__left'>
        <img className="footer__albumLogo" src='https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Phobia-Breaking_Benjamin_album.jpg/220px-Phobia-Breaking_Benjamin_album.jpg' alt="Phobia"/>
        <div className='footer__songInfo'>
          <h4>The Diary of Jane</h4>
          <p>Breaking Benjamin</p>
        </div>
      </div>
      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon className='footer__icon' />
        <PlayCircleOutlineIcon fontSize='large' className='footer__icon' />
        <SkipNextIcon className='footer__icon' />
        <RepeatIcon className='footer__green' />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby='continuous-slider' />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
