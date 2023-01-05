import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
function Header() {
  return (
    <div className='header'>
      <div className='header__left'>
      <SearchIcon />
      <input placeholder='Search for Artists, Songs, or Artists' type='text' />
      </div>
      
      <div className='header__right'>
        <Avatar src='' alt='omar' />
        <h4>Omar</h4>
      </div>
    </div>
  );
}

export default Header;
