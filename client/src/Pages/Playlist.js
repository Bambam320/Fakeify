//functional imports
import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { SpotifyContext } from "../SpotifyContext";

// css and component imports
import "../CSS/Body.css";
import "../CSS/App.css";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistSongRow from "./PlaylistSongRow";
import SongRow from "./SongRow";

//material ui imports
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

// break this down into smaller components
// send the image, text and dialog to the next child
// send the search bar to the next child
function Playlist() {
  // sets state, params, navigate and context
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(SpotifyContext);
  const navigate = useNavigate();
  const params = useParams();
  const addPlaylistMessage = useRef('');
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(currentPlaylist);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [snackOpen, setSnackOpen] = useState({
    severity: null,
    bool: false
  });
  const [tracks, setTracks] = useState([]);

  // sets the playlist from the id in the url
  useEffect(() => {
    if (params.id.length < 20) {
      let thisPagesPlaylist = localUser.playlists.find((playlist) => {
        if (playlist.id.toString() === params.id) {
          return playlist
        }
      })
      setCurrentPlaylist(thisPagesPlaylist)
    }
  }, [params, localUser])

  //sets the form in state used in updating from the currentplaylist
  useEffect(() => {
    setForm(currentPlaylist)
  }, [currentPlaylist]);

  // sends the updates attributes of the playlist to the backend and updates state with the updated playlist
  function handleSave(e) {
    e.preventDefault()
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

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddTrack(track, e) {
    e.preventDefault()
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotify_id: track.id,
        spotify_album_id: track.album.id,
        playlist_id: currentPlaylist.id,
        spotify_artist_id: track.artists[0].id,
        featured_artist: track.artists[0].name,
        release_date: track.album.release_date,
        name: track.name,
        genre: songGenre,
        preview_url: track.preview_url,
        cover_art: track.album.images[0].url,
      })
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSong) => {
          let updatedPlaylists = localUser.playlists.map((pl) => {
            if (params.id === pl.id.toString()) {
              pl.songs.push(newSong)
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
        });
      } else {
        res.json().then((err) => setErrors(err.error))
      }
    })
  };

  // removes a track from the currentplaylist
  function handleDeleteTrack(song, e) {
    e.preventDefault()
    fetch(`/songs/${song.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.ok) {
        let updatedPlaylists = localUser.playlists.map((pl) => {
          if (params.id === pl.id.toString()) {
            pl.songs = pl.songs.filter((ele) => ele.id !== song.id)
            return pl
          } else {
            return pl
          }
        })
        setLocalUser({ ...localUser, playlists: updatedPlaylists })
        let updatedSongs = currentPlaylist.songs.filter((ele) => ele.id !== song.id)
        setCurrentPlaylist({ ...currentPlaylist, songs: updatedSongs })
      } else {
        res.json().then((err) => setErrors(err.error))
      }
    })
  };

  // deletes the current playlist and updates states by removing it
  function handleDeletePlaylist(e) {
    e.preventDefault()
    fetch(`/playlists/${currentPlaylist.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.ok) {
        let updatedPlaylists = localUser.playlists.filter((pl) => currentPlaylist.id !== pl.id)
        setLocalUser({ ...localUser, playlists: updatedPlaylists })
        setCurrentPlaylist({})
        navigate("/home")
      } else {
        res.json().then((err) => {
          setErrors(err.errors)
        });
      }
    })
    handleCloseDeleteMenu()
  };

  //handles the search submit 
  function handleSearchSubmit(e) {
    e.preventDefault()
    fetch(`/spotify_api/songs/${search}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((tracks) => {
            setTracks(tracks)
          })
        } else {
          res.json().then((err) => {
            setErrors(err.error)
          });
        }
      })
    setSearch('')
  };

  // sends request to spotify to save the playlist and its contents to the logged in spotify account
  function handleAddPlaylistToSpotify() {
    let updatePackage = { ...localUser, playlists: currentPlaylist }
    fetch(`/spotify_api/save_playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePackage)
    }).then((res) => {
      if (res.ok) {
        res.json().then((message) => {
          setSnackOpen({ severity: true, bool: true })
          addPlaylistMessage.current = message.message
        })
      } else {
        res.json().then((error) => {
          setSnackOpen({ severity: false, bool: true })
          addPlaylistMessage.current = error.error
        })
      };
    });
  };

  //updates the form in state with the changed input values from the form
  function handleDialogUpdate(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  //handles opening and closing the form
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForm(currentPlaylist)
  };

  //updates state held search value for song search input
  function handleSearchInputChange(e) {
    setSearch(e.target.value)
  };

  //menu open and close handling for the delete threedot button
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const openDeletePlaylist = Boolean(deleteAnchorEl);
  const handleOpenDeleteMenu = (event) => {
    setTimeout(handleCloseDeleteMenu, 15000)
    setDeleteAnchorEl(event.currentTarget);
  };
  const handleCloseDeleteMenu = () => {
    setDeleteAnchorEl(null);
  };

  //menu open and close handling for the add to playlist plus button
  const [addPlaylistAnchorEl, setAddPlaylistAnchorEl] = useState(null);
  const openAddToPlaylist = Boolean(addPlaylistAnchorEl);
  const handleOpenAddToPlaylistMenu = (event) => {
    setTimeout(handleCloseAddToPlaylistMenu, 15000)
    setAddPlaylistAnchorEl(event.currentTarget);
  };
  const handleCloseAddToPlaylistMenu = () => {
    setAddPlaylistAnchorEl(null);
  };

  // clear input value in update form in dialog
  const handleFormNameClear = (val) => {
    setForm({ ...form, [val]: '' })
  };

  // closes the snackbar after a song has been added
  function handleSnackClose() {
    setSnackOpen({
      severity: null,
      bool: false
    })
  }

  return (
    <>
      {/* playlist information */}
      <Grid container className="body">
        <div className="body__info">
          <div className='errordiv' style={{ marginLeft: '10em' }}>
            {errors.map((error) => {
              return <p key={error} className='error'>{error}</p>;
            })}
          </div>
          <div onClick={handleClickOpen} >
            <img className="image_class" src={currentPlaylist.image} alt={currentPlaylist.name} />
          </div>
          <div>

            {/* delete icon and menu */}
            <div style={{ marginTop: '-10px', marginBottom: '10px' }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openDeletePlaylist ? 'long-menu' : undefined}
                aria-expanded={openDeletePlaylist ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleOpenDeleteMenu}
              >
                <MoreHorizIcon
                  sx={{
                    marginLeft: '-10px',
                    // height: '40px',
                    marginBottom: '-20px',
                    color: 'white',
                  }}
                />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={deleteAnchorEl}
                open={openDeletePlaylist}
                onClose={handleCloseDeleteMenu}
              >
                <MenuItem onClick={handleDeletePlaylist}>
                  Delete Playlist
                </MenuItem>
              </Menu>
            </div>

            {/* add icon and add to spotify menu */}
            {localUser.spotify_token ?
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openAddToPlaylist ? 'long-menu' : undefined}
                  aria-expanded={openAddToPlaylist ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleOpenAddToPlaylistMenu}
                >
                  <AddBoxIcon
                    sx={{
                      marginLeft: '-10px',
                      // height: '40px',
                      marginBottom: '-20px',
                      color: 'white',
                    }}
                  />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={addPlaylistAnchorEl}
                  open={openAddToPlaylist}
                  onClose={handleCloseAddToPlaylistMenu}
                >
                  <MenuItem onClick={handleAddPlaylistToSpotify}>
                    Add Playlist To Spotify Account
                  </MenuItem>
                </Menu>
              </div>
              :
              <p>Login with Spotify to save this playlist to your account!</p>
            }

            {/* playlist information */}
            <div className="body__infoText" onClick={handleClickOpen}>
              <h4>{currentPlaylist.name}</h4>
              <p>{currentPlaylist.description}</p>
              <p>{`${localUser.username}'s playlist`}</p>
              <p>{`${ currentPlaylist.songs ? currentPlaylist.songs.length : 0 } songs`}</p>
            </div>
          </div>

          {/* dialog for update menu */}
          <div>
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
          </div>
        </div>
      </Grid>

      {/* list songs that belong to playlist */}
      <div style={{ marginBottom: '30px' }} >
        {currentPlaylist.songs ?
          currentPlaylist.songs.map((song) => {
            return (
              <PlaylistSongRow
                key={song.spotify_id}
                song={song}
                queue={currentPlaylist.songs}
                handleDeleteTrack={handleDeleteTrack}
              />
            )
          })
          :
          <></>
        }
      </div>
      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '20px' }} />

      {/* search menu in playlist page to list songs to add */}
      <Grid container>
        <Grid item>
          <Paper
            component="form"
            onSubmit={(e) => handleSearchSubmit(e)}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 450,
              marginLeft: '2em',
              marginBottom: '8em',
              backgroundColor: 'grey'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Songs, Artists or Albums"
              type='text'
              name='search'
              value={search}
              onChange={handleSearchInputChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => handleSearchSubmit(e)}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {/* List songs from search results */}
      <div style={{ marginTop: '-120px', marginBottom: '125px' }}>
        {tracks.length > 0 ?
          tracks.map((track) => {
            return (
              <SongRow
                track={track}
                key={track.id}
                handleAddTrack={handleAddTrack}
                queue={tracks}
              />
            )
          })
          :
          <></>
        }
      </div>

      {/* sets alert to open when playlist is added to spotify account  */}
      <Snackbar open={snackOpen.bool} autoHideDuration={8000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity={snackOpen.severity ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {snackOpen.bool ?
            `${addPlaylistMessage.current}`
            :
            ''
          }
        </Alert>
      </Snackbar>
    </>
  )
}

export default Playlist;