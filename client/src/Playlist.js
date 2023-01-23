//functional imports
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { SpotifyContext } from "./SpotifyContext";

// css and component imports
import "./Body.css";
import "./App.css";
import SongRow from "./SongRow";
import PlaylistSongRow from "./PlaylistSongRow";

//material ui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

function Playlist() {
  // sets state, params, navigate and context
  const { currentPlaylist, setCurrentPlaylist, localUser, setLocalUser } = useContext(SpotifyContext);
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(currentPlaylist);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

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
  }, [currentPlaylist])

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
  }

  // adds track to currentplaylist then updates state with the updated playlist from the backend
  function handleAddTrack(track, e) {
    //do not sent track from songrow and try to get it from the array insteaed, submits do not pass more than one argument back
    console.log("e", e)
    console.log("track", track)
    e.preventDefault()
    let songGenre = track.album.genres === null ? null : track.album.genres[0]
    fetch(`/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          setCurrentPlaylist({ ...currentPlaylist, songs: [...currentPlaylist.songs, newSong] })
        });
      }
    })
  }

  // removes a track from the currentplaylist
  function handleDeleteTrack(song, e) {
    console.log("handledeletetrack is firing", song)
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
              pl.songs = pl.songs.filter((ele) => ele.id !== song.id )
              return pl
            } else {
              return pl
            }
          })
          setLocalUser({ ...localUser, playlists: updatedPlaylists })
          let updatedSongs = currentPlaylist.songs.filter((ele) => ele.id !== song.id)
          setCurrentPlaylist({ ...currentPlaylist, songs: updatedSongs })
  
      }
    })
  }

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
  }

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
  }

  //updates the form in state with the changed input values from the form
  function handleDialogUpdate(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
  }

  //menu open and close handling for the delete threedot button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDeletePlaylist = Boolean(anchorEl);
  const handleOpenDeleteMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };

  // clear input value in update form in dialog
  const handleFormNameClear = (val) => {
    setForm({ ...form, [val]: '' })
  }



  return (
    <>
      {/* playlist information */}
      <Grid container className="body">
        <div className="body__info">
          {errors.map((error) => {
            return (
              <span key={error} className='error'>
                {error}
              </span>
            );
          })}





          <div onClick={handleClickOpen} >
            <img className="image_class" src={currentPlaylist.image} alt={currentPlaylist.name} />
          </div>






          <div>


            {/* delete icon and menu */}
            <div>
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
                anchorEl={anchorEl}
                open={openDeletePlaylist}
                onClose={handleCloseDeleteMenu}
              >
                <MenuItem onClick={handleDeletePlaylist}>
                  Delete Playlist
                </MenuItem>
              </Menu>
            </div>

            <div className="body__infoText" onClick={handleClickOpen}>
              <h4>{currentPlaylist.name}</h4>
              <p>{currentPlaylist.description}</p>
              <p>{`${localUser.username}'s playlist`}</p>
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
                        <InputAdornment>
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
                        <InputAdornment>
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
                        <InputAdornment>
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
      <div>
        {currentPlaylist.songs ?
          currentPlaylist.songs.map((song) => {
            return <PlaylistSongRow song={song} key={song.id} queue={currentPlaylist.songs} handleDeleteTrack={handleDeleteTrack}/>
          })
          :
          <></>
        }
      </div>


      <Divider variant="middle" sx={{ bgcolor: 'white', marginTop: '-20px', marginBottom: '20px' }} />

      <Grid container>
        <Grid item>


          {/* search menu in playlist page to list songs to add */}
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
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon onClick={(e) => handleSearchSubmit(e)} />
            </IconButton>
          </Paper>
        </Grid>


      </Grid>


      {/* List songs from search results */}
      <div>
        {tracks.length > 0 ?
          tracks.map((track) => {
            return <SongRow track={track} key={track.id} handleAddTrack={handleAddTrack} />
          })
          :
          <></>
        }
      </div>


    </>
  )
}

export default Playlist;