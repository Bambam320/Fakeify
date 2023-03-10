//functional imports
import React, { useState, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";

//css and component imports
import '../CSS/SongRow.css'

//imports material ui
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function HomeSong({ song, onAddSong, playSong }) {
  // sets state and context hooks
  const { setPlayState } = useContext(SpotifyContext);
  const [anchorSong, setAnchorSong] = useState();
  const [popoverOpen, setPopoverOpen] = useState(false);

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
          >
            {/* Try to set spotify external URL */}
            <Typography sx={{ p: 1 }}>{`name: ${song.name}`}</Typography>
            <Typography sx={{ p: 1 }}>{`album: ${song.album.name}, track ${song.track_number}`}</Typography>
            <Typography sx={{ p: 1 }}>{`artist: ${song.artists[0].name}`}</Typography>
            {/* <a href={`${song.external_urls[0].spotify}`} target="_blank">From Spotify</a> */}
          </Popover>
        </div>
      </div>
    </Grid>
  )
}

export default HomeSong;