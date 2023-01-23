//functional imports
import React, { useContext, useState } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { useNavigate } from 'react-router-dom';

// imports styles and components
import "./Header.css";
import "./Body.css";
import { Avatar } from "@mui/material";

//imports material ui
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Paper from '@mui/material/Paper';


function Header() {
  // setting state for search field
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  // brings state from context
  const { localUser, setLocalUser, setIsAuthenticated, setMainSearch } = useContext(SpotifyContext);

  //updates the search value to state
  function handleChange(e) {
    setSearch(e.target.value)
  }

  //set search state and navigate to /search to display results
  function handleSubmit(e) {
    console.log("submit firing", search)
    e.preventDefault()
    setMainSearch(search)
    navigate("/search")
  }

  //passed back from Navbar and removes the current user for logout
  function handleLogout() {
    fetch("/logout",
      { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setLocalUser({})
          setIsAuthenticated(false)
        }
        setAnchorEl(null)
      })
  }


  
  // styling for the users menu
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
      />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
  // add open and close toggling to the logged in user menu at the top right header
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //handles rendering the profile page
  function handleMyProfile () {
    navigate('/profile')
    setAnchorEl(null);
  }
  

  return (
  
      <div className='header'>
        <div className='header__left'>
          <form onSubmit={handleSubmit}>
            <Paper
              elevation={0}
              sx={{ display: 'flex', alignItems: 'center', width: 500 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for Songs, Artists or Albums"
                type='text'
                name='search'
                value={search}
                onChange={handleChange}
              />
              <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={(e) => handleSubmit(e)}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </form>
        </div>

        <div className='header__right'>

          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{textTransform: 'none'}}
          >
            <Avatar 
              className="Avatar" 
              src= {localUser.avatar_url}
            />
            {localUser.username}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMyProfile} disableRipple>
              <AccountBoxIcon />
              My Profile
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleLogout} disableRipple>
              Log out
            </MenuItem>
          </StyledMenu>
        </div>
      </div>

  );
}

export default Header;
