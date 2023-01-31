//functional imports
import React, { useState } from "react";

//css and component imports
import '../CSS/SongRow.css'

//imports material ui
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function HomeSong({ song, onAddSong, playSong }) {
  // sets state hooks
  const [popoverOpen, setPopoverOpen] = useState(false);

  // opens popover and provides element to hook pop up to.
  function handlePopoverOpen(e) {
    setPopoverOpen(e.currentTarget);
  };

  // closes popover by taking away element to hook popover to and sets to null
  function handlePopoverClose() {
    setPopoverOpen(null);
  };

  return (
    <Grid item >
      <div  >
        <Card
          onClick={() => onAddSong(song)}
          onMouseEnter={(e) => {
            playSong(e, song)
            handlePopoverOpen(e)
          }}
          onMouseLeave={handlePopoverClose}
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
            anchorEl={popoverOpen}
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