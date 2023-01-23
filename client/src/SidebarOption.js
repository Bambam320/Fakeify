import React from "react";
import "./SidebarOption.css";

function SidebarOption({ title }) {
  return (
    <div className='sidebarOption'>
      <p>{title}</p>
    </div>
  );
}

export default SidebarOption;
