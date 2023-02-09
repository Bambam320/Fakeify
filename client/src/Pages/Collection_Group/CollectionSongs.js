//functional imports
import React, { useContext } from "react";
import { SpotifyContext } from "../../SpotifyContext";

// imports styles and components
import "../../CSS/Collection.css";
import CollectionSongsEachSong from "./CollectionSongsEachSong";

//imports material ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function CollectionSongs() {
  const { localUser } = useContext(SpotifyContext);

  console.log("localUser", localUser)

  let localPlaylists = localUser.playlists.map((playlist) => {
    return (
      <React.Fragment key={playlist.id}>
        <Typography variant="h6" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px', marginTop: '30px' }}>
          {playlist.songs.length > 0 ? `Playlist: ${playlist.name}` : <></>}
        </Typography>
        <Grid container spacing={2} maxWidth='900px' sx={{ marginLeft: '30px', marginBottom: '60px' }}>
          <CollectionSongsEachSong playlist={playlist} />
        </Grid>
      </React.Fragment>
    )
  })

  return (
    <>
      <Typography variant="h5" component="div" sx={{ color: '#a7b2c4', marginLeft: '100px', marginBottom: '40px' }}>
        Songs
      </Typography>
        {localPlaylists}
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '30px', marginTop: '30px' }} />
    </>
  )
}

export default CollectionSongs;