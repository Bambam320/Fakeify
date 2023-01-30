//functional imports
import React, { useContext, useEffect, useState, useRef } from "react";
import { SpotifyContext } from "../SpotifyContext";
import axios from 'axios';

//css and component imports
import '../SongRow.css'

//imports material ui
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from "@mui/material/CardActionArea";
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

function HomeSong({ song, onAddSong, playSong }) {
  const { setCurrentTrack, currentTrack, localUser, setLocalUser } = useContext(SpotifyContext);
  const [popoverOpen, setPopoverOpen] = useState(false);

  function handlePopoverOpen (e) {
    setPopoverOpen(e.currentTarget);
  };

  function handlePopoverClose () {
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

export default HomeSong