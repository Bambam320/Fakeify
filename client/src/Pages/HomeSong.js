//functional imports
import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";

//css and component imports
import '../CSS/SongRow.css';
import '../CSS/HomeSong.css';

//imports material ui
import AddCircle from '@mui/icons-material/AddCircle';
import Album from '@mui/icons-material/Album';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Face from '@mui/icons-material/Face';
import Grid from '@mui/material/Grid';
import MusicNote from '@mui/icons-material/MusicNote';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function HomeSong({ song, onAddSong, playSong }) {
  // sets state and context hooks
  const { setPlayState } = useContext(SpotifyContext);
  const [anchorSong, setAnchorSong] = useState();
  const [popoverOpen, setPopoverOpen] = useState(false);


  console.log("songgggggggggggggggggg", song)
  // opens popover and provides element to hook pop up to.
  function handlePopoverOpen() {
    setPopoverOpen(true)
  };
  
  // sets the anchor element for the popover to display against the song being hovered over
  function handleAnchorSongElementSelect (e) {
    setAnchorSong(e.currentTarget);
  };

  // closes popover by taking away element to hook popover to and sets to null
  function handlePopoverClose() {
    setPopoverOpen(false);
  };

  // make the popover backlit when that song is playing
  return (
    <Grid item >
      <div  >
        <Card
          onClick={() => onAddSong(song)}
          onMouseEnter={(e) => {
            playSong(e, song)
            handlePopoverOpen(e)
            handleAnchorSongElementSelect(e)
          }}
          onMouseLeave={(e) => {
            handlePopoverClose(e)
            setPlayState(false)
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={song.album.images[0].url}
          />
        </Card>
        <div>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={popoverOpen}
            anchorEl={anchorSong}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            className='parent_popover'
          >
            {/* Try to set spotify external URL */}
            <div className='popover' ><MusicNote></MusicNote><Typography> {song.name}</Typography></div>
            <div className='popover' ><Album></Album><Typography> {song.album.name}</Typography></div>
            <div className='popover' ><Face></Face><Typography> {song.artists[0].name}</Typography></div>
            <div className='popover' ><AddCircle></AddCircle><Typography> Click on artwork to add to playlist </Typography></div>
            <a href={`${song.external_urls.spotify}`} target="_blank">From Spotify</a>
          </Popover>
        </div>
      </div>
    </Grid>
  )
}

export default HomeSong;