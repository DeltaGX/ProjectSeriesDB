import logo from '../Img/seriesDBLogo.png';
import React, { useContext } from 'react';
import { NavLink} from 'react-router-dom';
import Searchbar from './Searchbar.js';
// import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import UserDropDown from "./UserDropDown";

const Navbar = () => {
const {user} = useContext(AuthContext);
  return (
    <div className="w-full bg-Pgreen flex items-center font-mono fixed z-50">
      <NavLink to='/'><img className="h-8 w-40 mx-8" src={logo} alt="SeriesDB Logo" /></NavLink>
      <div className="pl-16 flex flex-none space-x-16 pt-8 pb-4 items-center  bg-Pgreen ">
        <div className="ml-4 text-2xl hover:bg-sky-700"><NavLink to='/tv'>TV Series</NavLink></div>
        <div className="ml-4 text-2xl hover:bg-sky-700"><NavLink to='/movie'>Movies</NavLink></div>
        <div className="ml-4 text-2xl hover:bg-sky-700"><NavLink to='/Genre'>By Genre</NavLink></div>
      </div>
        <Searchbar />
        {user ? <div className='text-2xl'><UserDropDown user={user}/></div>: (
        <NavLink to='/Login'> <button className='border-2 ml-10 bg-gray-50'>Login</button></NavLink>)} 
        <div className='space-x-16 ml-16'>

        </div>
     </div>
  );
}

export default Navbar;