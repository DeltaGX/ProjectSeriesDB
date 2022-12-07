import NavBar from '../Components/NavBar.js';
import UserPic from '../Img/UserPic.png';
import Favcard from "../Components/FavouriteCard"
import React, { useContext, useEffect, useState} from 'react';
// import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import {Link} from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';

function UserProfile(){
    // const {user}=useContext(AuthContext);
    const [user, setuser]= useState();
    const [Favourite, setFavourite] = useState([]);
    const [Usernote, setUsernote] = useState([]);
    let urlElements = window.location.pathname.split('/');
    
    async function fetchUser() {
        try { 
            const res = await axios.get(`http://localhost:4000/users/${urlElements[2]}`,{withCredentials:true});
            console.log(urlElements[2])
            setuser(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    // async function fetchUsernote() {
    //     try { 
    //      const res = await axios.get(`http://localhost:4000/users/${urlElements[2]}/Usernote`, { withCredentials: true });
         
    //     } catch (err) {
    //      console.log(err)
    //     }
    //   }

    async function fetchFavourite() {
        try { 
            const res = await axios.get(`http://localhost:4000/users/${urlElements[2]}/Usernote`, { withCredentials: true });
            setUsernote(res.data);
            const Favouritenote = res.data.filter((element) => {
                                    return element.isFavourite === true;
                                })
            const sorted = Favouritenote.sort((a,b)=> b.UserScore-a.UserScore)
            setFavourite(sorted.slice(0,4));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
    let setLoading = true;
    if(setLoading){
        fetchUser();
        fetchFavourite();
    }
    return() => {
        setLoading = false  
    }
        },[urlElements[2]]);


    return(
        <div className='bg-Lightblue min-h-screen'>
            <NavBar/>
                <div className="w-3/4 h-20 bg-PYellow m-auto pt-36 flex items-center"> {/* YellowSquare */}
                    <p className='text-xl font-bold mx-auto pb-16'>{user?.UserName} Profile {console.log(Favourite)}
                    </p>
                </div>
                <div className="relative w-3/4 min-h-screen bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={UserPic} className='w-48 h-60 ml-5 mt-10'/>
                    <div className='absolute top-72 left-8 w-40 break-all'>
                        <p className='text-2xl text-center pb-4'>Profile</p>
                        <div>Email: <br/>{user?.Email}</div>
                        <div>UserName: <br/>{user?.UserName}</div>
                        <div className='flex'>Cakeday: <p  className="w-25 overflow-auto pl-2"> {user?.entryDate.split('T')[0]}</p></div>
                        {(user?._id === urlElements[2]) &&
                            <Link to={`/user/${user?._id}/edit`} className='ml-8'>
                                    <button
                                        className='text-blue-500 border-2 px-2 py-1 mx-auto border-blue-400 bg-white rounded-lg '
                                        >Edit Profile
                                    </button>
                            </Link>  
                        }
                        <Link to={`/user/${user?._id}/list`} className='ml-10'>
                                    <button
                                        className='text-blue-500 border-2 px-2 py-1 mx-auto border-blue-400 bg-white rounded-lg '
                                        >User List
                                    </button>
                            </Link>  
                    </div>
                    <div className='justify-end'>
                        <div className="absolute w-4/5 h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap space-y-4"> {/* SmallSquare */}
                        <div className='w-full bg-yellow-100'>
                            <p className='text-4xl pt-4 ml-4 '>Top Favourite</p>
                            <div className="flex items-center">
                            {Favourite?.map((movie) => {
                                    return <Favcard movieData={movie} key={movie.id} />;
                                })}
                            </div>
                            </div>
                            <div className='flex bg-PYellow w-full'>
                            <div className='pl-5 pb-36 h-max w-60'>
                            <p className="text-2xl">Statistics:</p>
                                <p className="text-xl">TV Series</p>
                                <p className="">In the list: {Usernote.filter(data => data.ContType === 'tv').length}</p>
                                <p>Watching:{Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Watching' ).length}</p>
                                <p>Complete:{Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Complete').length}</p>
                                <p>On-hold:{Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Onhold').length}</p>
                                <p>Plan to watch:{Usernote.filter(data => data.ContType === 'tv' && data.Status === 'PlantoWatch').length}</p>
                                <p>Favourite:{Usernote.filter(data => data.ContType === 'tv' && data.isFavourite === true).length}</p>
                                </div>
                            <div className='pl-5 pb-36 h-max w-60'>
                                <p className='text-2xl'>.</p>
                                <p className="text-xl">Movies</p>
                                <p className="">In the list: {Usernote.filter(data => data.ContType === 'movie').length}</p>
                                <p>Watching:{Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Watching' ).length}</p>
                                <p>Complete:{Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Complete').length}</p>
                                <p>On-hold:{Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Onhold').length}</p>
                                <p>Plan to watch:{Usernote.filter(data => data.ContType === 'movie' && data.Status === 'PlantoWatch').length}</p>
                                <p>Favourite:{Usernote.filter(data => data.ContType === 'movie' && data.isFavourite === true).length}</p>
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