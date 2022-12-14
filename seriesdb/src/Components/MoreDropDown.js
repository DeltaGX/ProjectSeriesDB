
import React, { useState } from 'react';

const MoreDropDown = ()=>{
const [showOptions, setshowOptions] = useState(false);
return(
    <div className="relative inline-block text-left">
  <div>
    <button onClick = {() => setshowOptions(!showOptions)} type="button" className="inline-flex justify-center w-full ml-8 rounded-md border-0 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
      More
      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
    {showOptions && (
  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
    <div className="py-1" role="none">
      <a href="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">About</a>
      <a href="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Community</a>
      <a href="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
    </div>
  </div>
  
)} 
 </div>
</div>)}
export default MoreDropDown