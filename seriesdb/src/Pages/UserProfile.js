import NavBar from '../Components/NavBar.js';
import Next from '../Img/Next.JPG';
import UserPic from '../Img/UserPic.png';
import Avenger from '../Img/Avenger Poster.png';
import Jumanji from '../Img/Jumanji.png';
import React, { useContext,useState,useEffect } from 'react';
// import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';

function UserProfile(){
    const {user}=useContext(AuthContext);

    return(
        <div className='bg-Lightblue min-h-full'>
            <NavBar/>
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center"> {/* YellowSquare */}
                    <p className='ml-8 text-xl font-bold'>{user ? user.UserName:'tester' } Profile {console.log(user)}
                    </p>
                    {/* <div className='justify-end'>
                         <p className='text-blue-500 underline ml-5'>Edit Profile</p>
                    </div> */}
                </div>
                <div className="relative w-3/4 min-h-screen mb-20 bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={UserPic} className='w-48 h-60 ml-5 mt-10'/>
                    <div className='absolute top-72 left-8 w-30'>
                        <p className='text-2xl ml-7 pb-4'>Your Status</p>
                        <p>Email: {user.Email}</p>
                        <p>UserName: {user.UserName}</p>
                        <div className='flex'>Cakeday: <p  className="w-25 overflow-auto pl-2"> {user.entryDate}</p></div>
                    </div>
                    <div className='justify-end'>
                        <div className="absolute w-4/5 h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap space-y-4"> {/* SmallSquare */}
                        <div className='w-full bg-yellow-100'>
                            <p className='text-4xl pt-4 ml-4 '>Favourite</p>
                            <div className="flex items-center">
                            <Link to='/Movies/AvengerEndgame' className='relative'>
                            <img alt='' src={Avenger} className='w-48 h-60 ml-4 mt-4'/>
                            <p className='text-center'>Avenger Endgame</p>
                             </Link>
                            <Link to='/Movies/Jumanji-The-Next-Level' className='relative'>
                                   <img alt='' src={Jumanji} className='w-48 h-60 ml-4 mt-4'/>
                            <p className='text-center'>Jumanji: The Next Level</p>
                            </Link>
                            </div>
                            </div>
                            <div className='flex bg-PYellow w-full'>
                            <div className='pl-5 pb-36 h-max w-60'>
                            <p className="text-2xl">Statistics:</p>
                                <p className="text-xl">TV Series</p>
                                <p className="">In the list:4</p>
                                <p>Watching:1</p>
                                <p>Complete:0</p>
                                <p>On-hold:0</p>
                                <p>Plan to watch:2</p>
                                <p>Favourite:0</p>
                                </div>
                            <div className='pl-5 pb-36 h-max w-60'>
                                <p className='text-2xl'>.</p>
                                <p className="text-xl">Movies</p>
                                <p className="">In the list:4</p>
                                <p>Watching:1</p>
                                <p>Complete:1</p>
                                <p>On-hold:0</p>
                                <p>Plan to watch:2</p>
                                <p>Favourite:2</p>
                            </div>
                            {/* <div className='pl-5 pb-36 h-max w-60'>
                                <p className='text-2xl'>.</p>
                                <p className="text-xl">Comics and Novel</p>
                                <p className="">In the list:5</p>
                                <p>Watching:1</p>
                                <p>Complete:1</p>
                                <p>On-hold:0</p>
                                <p>Plant to watch:2</p>
                                <p>Favourite:0</p>
                            </div> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default UserProfile;