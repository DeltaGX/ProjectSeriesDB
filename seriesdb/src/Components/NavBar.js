import {useContext} from 'react';
import logo from '../Img/seriesDBLogo.png';
import React from 'react';
import {useNavigate, NavLink} from 'react-router-dom';
import Searchbar from './Searchbar.js';
import TypeDropDown from './TypeDropDown.js';
import MoreDropDown from "../Components/MoreDropDown.js";
// import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import UserDropDown from "./UserDropDown";

const Navbar = () => {
  const { user,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault(); 
    dispatch({ type: "LOGOUT"});
    navigate('/')
  }


  return (
    <div className="w-full bg-Pgreen flex items-center font-mono">
      <NavLink to='/'><img className="h-8 w-40 mx-8" src={logo} alt="SeriesDB Logo" /></NavLink>
      <div className="pl-16 flex flex-none space-x-16 pt-8 pb-4 items-center  bg-Pgreen">
        <div className="ml-4 text-2xl"><NavLink to='/tv'>TV Series</NavLink></div>
        <div className="ml-4 text-2xl"><NavLink to='/movie'>Movies</NavLink></div>
        <div className="ml-4 text-2xl"><NavLink to='/Genre'>By Genre</NavLink></div>
        </div>
        <Searchbar />
        {/* {user ? <div className='text-2xl'><UserDropDown userid={user._id}/></div>: (
        <div><NavLink to='/Login'>Login</NavLink></div>)}  */}
        <div className='space-x-16 ml-16'>
        {user ? <div className='text-2xl'><NavLink to={`/user/${user._id}`}>USER:{user.UserName}</NavLink></div>:(
       <NavLink to='/Login'> <button className='border-2 bg-gray-50'>Login</button></NavLink>
        )}
        {user && (
        <input type='button' className='pt-1'onClick={logout} value='Logout'></input>
        )}
        </div>
    </div>
  );
}

export default Navbar;