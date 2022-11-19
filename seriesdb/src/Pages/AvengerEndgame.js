import NavBar from '../Components/NavBar.js';
import Avenger from '../Img/Avenger Poster.png';
import React from 'react';
import { Link } from 'react-router-dom';

function Endgame(){
    return(
        <div>
            <NavBar />
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center"> {/* YellowSquare */}
                    <p className='ml-8 text-xl font-bold'>Avenger: Endgame</p>
                </div>
                <div className="relative w-3/4 h-screen mb-20 bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={Avenger} className='w-48 h-60 ml-5 mt-10'/>
                    <div className='absolute top-72 left-8'>
                        <p className='text-2xl ml-7'>Your Status</p>
                        <p>Status: Complete</p>
                        <p>Ep Seen:1/1</p>
                        <p>Your Score:10/10</p>
                        <p>Your Note: good stuff</p>
                        <p className='text-blue-500 underline' >Edit</p>
                        <p className='text-blue-500 underline'>Add to Favourite</p>
                    </div>
                    <div className='justify-end'>
                        <div className="absolute w-4/5 h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap space-y-4"> {/* SmallSquare */}
                            <p className='relative ml-6 mt-4 h-10 w-full text-xl'>Status and Information:
                                <p className='absolute top-7'>Synopsis:</p>
                                <p className='absolute top-14 w-4/5 h-40 overflow-auto fonts-sans'>Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.
                                (Synopsis from Netflix)</p>
                            </p>
                            <div className='ml-5 mb-36 h-20'>
                                <p className="text-2xl">Information:</p>
                                <p className="">Type: Movies</p>
                                <p className="">Genre: Action, Fantasy, Drama. SuperHeroes</p>
                                <p>Status: Finished</p>
                                <p>Episode: 1</p>
                                <p>Aired: 19 september 2021</p>
                                <p>Source: Marvel Comic</p>
                                <p>Studio: Marvel</p>
                            </div>
                            <div className='pl-24 h-20 ml-2'>
                                <p className='text-2xl'>Score and Link:</p>
                                <p>SeriesDB : 9.9/10</p>
                                <Link to="/imdb/AvengerEndgame">
                                <p className='text-blue-500 underline'>IMDB:9/10</p>
                                </Link>
                                <p className='text-blue-500 underline'>Rotten Tomato : 10/10</p>
                                <p>Rank: 1* (*compare by score of all movies in this site)</p>
                            </div>
                            <div className='ml-5 h-20'>
                                <p className='text-2xl'>Can be watch on:</p>
                                <Link to="/HotStar/AvengerEndgame">
                                <p className='text-blue-500 underline'>Disney Hotstar</p>
                                </Link>
                                <p className='text-blue-500 underline'>Theater</p>
                                <p>Rank: 1* (*compare by score of all movies in this site)</p>
                            </div>
                            <div className='pl-10 h-20'>
                                <p className='text-2xl'>Reviews:</p>
                                <Link to="/Movies/AvengerEndgame/Reviews/Username2">
                                <p className=''>10/10 by Username2 (3000 user agree to this)   
                                <p className=''>Avenger is the series that i always love......</p>
                                <p className='text-blue-500 underline'> (read more)</p>
                                </p>
                                </Link>
                                <Link to="/Movies/AvengerEndgame/Reviews">
                                <p className='text-blue-500 underline text-3xl'>Read All Review Here</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Endgame;