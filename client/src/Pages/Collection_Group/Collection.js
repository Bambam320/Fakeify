//functional imports
import React from "react";
import { Outlet } from 'react-router-dom';

// imports styles and components
import "../../CSS/Collection.css";
import CollectionLinks from "./CollectionLinks";

function Collection() {

  return (
    <div>
      <CollectionLinks />
      <Outlet />
    </div>
  )
}

export default Collection;