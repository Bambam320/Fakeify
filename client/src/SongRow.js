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

function SongRow({ track, handleAddTrack }) {
  //set state from context
  const { setCurrentTrack } = useContext(SpotifyContext);


  return (
    <Grid container className="songRow" width="1200px">

        <Grid item xs={1}>
        <img src={track.album.images[0].url} alt={track.album.name} className="songRow__album" />
        </Grid>

        <Grid item xs={8}>
        <div className="songRow__info">
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.album.name}
          </p>
        </div>
        </Grid>

      <Grid item xs={3}>
        <Button 
          onClick={() => {setCurrentTrack(track)}}
          className='sidebarOption'
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginLeft: '-8px',
            fontSize: '16px',
          }}
        >
        <PlayCircleIcon sx={{marginRight: '5px'}}/>
          <h4>Track</h4>
        </Button>
        <Button 
          onClick={(e) => {handleAddTrack(track, e)}} 
          className='sidebarOption'
          sx={{
            color: 'grey',
            textTransform: 'none',
            height: '30px',
            marginLeft: '-8px',
            fontSize: '16px',
          }}
        >
          <AddIcon sx={{marginRight: '5px'}} />
          <h4>To Playlist</h4>
        </Button>
      </Grid>

    </Grid>


  );
}

export default SongRow
