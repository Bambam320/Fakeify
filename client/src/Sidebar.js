import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="logo">🎶Fakeify&reg;</h1>
      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption Icon={SearchIcon} title="Search" />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      <br />
      <strong className='sidebar_title'>PLAYLISTS</strong>
      <hr/>
      {/* {playlists?.items?.map(playlist =>(
        <sidebarOption title={playlist.name}/>
      ))} */}

      {/* Hardcoded for now 👇*/}
      <SidebarOption title='Hip Hop'/>
      <SidebarOption title='Rock'/>
      <SidebarOption title='Rnb'/>
      </div>
  )
}

export default Sidebar