//functional imports
import React, { useState, useRef, useContext, useEffect } from "react";
import { SpotifyContext } from "../SpotifyContext";

// styling and component imports
import "../CSS/Footer.css";

//import material ui styling
import { Grid } from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

// add popover on top of buttons in player to describe action
// add volume and seek control
function Footer() {
  //sets hooks
  const { currentTrack, setCurrentTrack, currentQueue, playState, setPlayState } = useContext(SpotifyContext);
  const audioElem = useRef();
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  //play or pause based on playstate
  useEffect(() => {
    if (playState) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [playState, currentTrack]);

  //autoplays a newly selected song
  useEffect(() => {
    currentTrack ? setPlayState(true) : setPlayState(false)
  }, [currentTrack]);

  //set state with boolean to play or pause based on click
  function handlePlayPause() {
    setPlayState(!playState)
  };

  //sets previous song in playlist
  function prevSong() {
    let currentSongIndex = currentQueue.findIndex((song) => song.id === currentTrack.id);
    let prev = shuffle ? currentQueue[Math.floor(Math.random() * currentQueue.length)] : currentQueue.indexOf(currentTrack) === 0 ? currentQueue[currentQueue.length - 1] : currentQueue[currentSongIndex - 1]
    setCurrentTrack(prev)
  };

  //set next song in playlist
  function nextSong() {
    let currentSongIndex = currentQueue.findIndex((song) => song.id === currentTrack.id);
    let next = shuffle ? currentQueue[Math.floor(Math.random() * currentQueue.length)] : currentQueue.indexOf(currentTrack) === currentQueue.length - 1 ? currentQueue[0] : currentQueue[currentSongIndex + 1]
    setCurrentTrack(next)
  };

  //handles logic for shuffle button
  function handleShuffle() {
    setShuffle(!shuffle)
  };

  //handles logic for repeat button
  function handleRepeat() {
    setRepeat(!repeat)
  }; 

  // sets play reference to current track to false to end play and display play button
  function trackTime() {
    if (audioElem.current.duration === audioElem.current.currentTime) {
      setPlayState(false)
    }
    if (audioElem.current.duration === audioElem.current.currentTime && repeat) {
      nextSong()
    }
  };

  return (
    <div className='footer'>
      <audio
        src={currentTrack.preview_url}
        ref={audioElem}
        onTimeUpdate={trackTime} />
      <div className='footer__left'>
        {currentTrack ?
          <>
            <img
              className="footer__albumLogo"
              src={currentTrack.album ? currentTrack.album.image_url ? currentTrack.album.image_url : currentTrack.album.images[0].url : currentTrack.url}
              alt={currentTrack.album ? currentTrack.album.name : currentTrack.name} />
            <div className='footer__songInfo'>
              <h4>{currentTrack.name}</h4>
              <p>{currentTrack.featured_artist ? currentTrack.featured_artist : currentTrack.artists[0].name}</p>
            </div>
          </>
          :
          <><p>Choose a song!</p></>
        }
      </div>
      <div className='footer__center'>
        {shuffle ?
          <ShuffleOnIcon className='footer__green' onClick={() => handleShuffle()} />
          :
          <ShuffleIcon className='footer__green' onClick={() => handleShuffle()} />
        }
        <SkipPreviousIcon className='footer__icon' onClick={prevSong} />
        {playState ?
          <PauseCircleOutlineIcon fontSize='large' className='footer__icon' onClick={handlePlayPause} />
          :
          <PlayCircleOutlineIcon fontSize='large' className='footer__icon' onClick={handlePlayPause} />
        }
        <SkipNextIcon className='footer__icon' onClick={nextSong} />
        {repeat ?
          <RepeatOnIcon className='footer__green' onClick={() => handleRepeat()} />
          :
          <RepeatIcon className='footer__green' onClick={() => handleRepeat()} />
        }
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          {/* <Grid item xs>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <VolumeDown />
              <Slider aria-label="Volume"

              size="small"
              value={value} 
              onChange={handleChange} 
              />
              <VolumeUp />
            </Stack>

          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default Footer;