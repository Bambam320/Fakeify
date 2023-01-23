//functional imports
import React, { useContext } from 'react'
import { SpotifyContext } from "./SpotifyContext";

//css and component imports
import './SongRow.css'
import './SidebarOption'

//material ui imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function PlaylistSongRow({song, queue, handleDeleteTrack}) {
    //set state from context
    const { setCurrentTrack, setCurrentQueue } = useContext(SpotifyContext);

  function handlePlayTrack (e) {
    setCurrentTrack(song)
    setCurrentQueue(queue)
  }

  return (
    <Grid container className="songRow" width="700px">

        <Grid item xs={1}>
        <img src={song.cover_art} alt={song.name} className="songRow__album" />
        </Grid>

        <Grid item xs={5}>
        <div className="songRow__info">
          <h1>{song.name}</h1>
          <p>
            {song.featured_artist}
          </p>
        </div>
        </Grid>

      <Grid item xs={3}>
        <Button 
          onClick={(e) => {handlePlayTrack(e)}}
          className='sidebarOption'
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginRight: '50px',
            fontSize: '16px',
          }}
        >
        <PlayCircleIcon sx={{marginRight: '5px'}}/>
          <h4>Track</h4>
        </Button>
        </Grid>
        <Grid item xs={3}>
        <Button 
          onClick={(e) => {handleDeleteTrack(song, e)}}
          className='sidebarOption'
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginRight: '50px',
            fontSize: '16px',
          }}
        >
        <RemoveCircleIcon sx={{marginRight: '5px'}}/>
          <h4>Remove</h4>
        </Button>
        </Grid>
    </Grid>
  )
}

export default PlaylistSongRow;