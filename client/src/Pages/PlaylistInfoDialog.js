//functional imports
import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import { SpotifyContext } from "../SpotifyContext";

// css and component imports
import "../CSS/Body.css";
import "../CSS/App.css";

//material ui imports
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function PlaylistInfoDialog({ open, setOpen, handleClose, form, setForm, setErrors }) {
  // sets state, params, navigate and context
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(SpotifyContext);
  const params = useParams();

  //active storage update
  const [playlistCover, setPlaylistCover] = useState(null)

  console.log("cover", playlistCover)

  // sends the updates attributes of the playlist to the backend and updates state with the updated playlist
  function handleSave(e) {
    e.preventDefault()
    // active storage update
    const imageUpload = new FormData()
    imageUpload.append('cover_blob', playlistCover)
    
    fetch(`/playlists/${currentPlaylist.id}`, {


      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        image: form.image
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedPlaylist) => {
          setCurrentPlaylist(updatedPlaylist)
          let updatedPlaylists = localUser.playlists.map((pl) => {
            if (params.id === pl.id.toString()) {
              return updatedPlaylist
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
        });
      } else {
        res.json().then((err) => {
          setErrors(err.error)
        });
      }
    })
    setOpen(false);
  };

  //updates the form in state with the changed input values from the form
  function handleDialogUpdate(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  };



  // clear input value in update form in dialog
  const handleFormNameClear = (val) => {
    setForm({ ...form, [val]: '' })
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: 'transparent' }}
    >
      <DialogTitle
        sx={{ backgroundColor: '#3b3637', color: 'white' }}
      >Edit and update the details</DialogTitle>
      <DialogContent
        sx={{ backgroundColor: '#3b3637' }}
      >
        <DialogContentText
          sx={{ color: 'white' }}
        >
          Change the information below and click save to update your playlist!
        </DialogContentText>
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="name"
          fullWidth
          variant="standard"
          onChange={handleDialogUpdate}
          value={form.name}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('name') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="description"
          fullWidth
          variant="standard"
          onChange={handleDialogUpdate}
          value={form.description}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('description') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        <TextField
          sx={{ input: { color: 'white' } }}
          margin="dense"
          name="image"
          fullWidth
          variant="standard"
          onChange={handleDialogUpdate}
          value={form.image}
          InputProps={{
            endAdornment: (
              <div >
                <InputAdornment position="start">
                  <IconButton onClick={() => { handleFormNameClear('image') }}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
        {/* active storage update */}
        <Button
          variant="contained"
          component="label"
        >
          Upload An Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => { setPlaylistCover(e.target.files[0]) }}
            hidden
          />
        </Button>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: '#3b3637' }}
      >
        <Button onClick={handleClose}
          sx={{ color: 'white' }}
        >Cancel</Button>
        <Button onClick={handleSave}
          sx={{ color: 'white' }}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistInfoDialog;