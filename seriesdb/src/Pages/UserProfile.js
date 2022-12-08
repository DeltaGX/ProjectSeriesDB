import NavBar from '../Components/NavBar.js';
import UserPic from '../Img/UserPic.png';
import Favcard from "../Components/FavouriteCard"
import GenreBarChart from "../Components/GenreBarChart"
import React, { useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';

function UserProfile(){
    const {user}=useContext(AuthContext);
    const [users, setusers]= useState();
    const [Favourite, setFavourite] = useState([]);
    const [Usernote, setUsernote] = useState([]);
    // const [noteload, setnoteload] = useState(false);
    // const [pietv, setpietv] = useState([]);
    // const [piemovie, setpiemovie] = useState([]);
    let urlElements = window.location.pathname.split('/');
    // let pietvdata = []
    // let piemoviedata = []
    // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    async function fetchUser() {
        try { 
            const res = await axios.get(`http://localhost:4000/users/${urlElements[2]}`,{withCredentials:true});
            console.log(urlElements[2])
            setusers(res.data);
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
            // CountNote(res.data);
            // setpietv(pietvdata);
            // setpiemovie(piemoviedata);
            const Favouritenote = res.data.filter((element) => {
                                    return element.isFavourite === true;
                                })
            const sorted = Favouritenote.sort((a,b)=> b.UserScore-a.UserScore)
            setFavourite(sorted.slice(0,5));
            // setnoteload(true);
        } catch (err) {
            console.log(err)
        }
    }

    // function CountNote(Usernote){
    //     pietvdata = [
    //     {"name": 'Watching',
    //     "value": Usernote?.filter(data => data.ContType === 'tv' && data.Status === 'Watching' ).length
    //     },
    //     {"name": 'Complete',
    //     "value": Usernote?.filter(data => data.ContType === 'tv' && data.Status === 'Complete').length
    //     },
    //     {"name": 'Onhold',
    //     "value": Usernote?.filter(data => data.ContType === 'tv' && data.Status === 'Onhold').length
    //     },
    //     {"name": 'PlantoWatch',
    //     "value": Usernote?.filter(data => data.ContType === 'tv' && data.Status === 'PlantoWatch').length
    //     },
    //     ]
    //     piemoviedata = [
    //     {"name": 'Watching',
    //     "value": Usernote?.filter(data => data.ContType === 'movie' && data.Status === 'Watching' ).length
    //     },
    //     {"name": 'Complete',
    //     "value": Usernote?.filter(data => data.ContType === 'movie' && data.Status === 'Complete').length
    //     },
    //     {"name": 'Onhold',
    //     "value": Usernote?.filter(data => data.ContType === 'movie' && data.Status === 'Onhold').length
    //     },
    //     {"name": 'PlantoWatch',
    //     "value": Usernote?.filter(data => data.ContType === 'movie' && data.Status === 'PlantoWatch').length
    //     },
    //     ]
    //     return pietvdata, piemoviedata
    // }

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
                <div className=" w-3/4 min-h-screen bg-gray-100 m-auto"> {/* BigSquare */}
                <div className='w-full break-all flex justify-center'>
                        <img alt='' src={UserPic} className='w-48 h-60 my-5 mx-10'/>
                        <div className='h-60 ml-5 mt-10'>
                            <div className='flex'>Email: <p className='ml-14'>{user?.Email}</p></div>
                            <div className='flex'>Username: <p className='ml-6'>{user?.UserName}</p></div>
                            <div className='flex'>Cakeday: <p  className="ml-9"> {user?.entryDate.split('T')[0]}</p></div><br/>
                            <div>
                                {(users?._id === urlElements[2]) &&
                                    <Link to={`/user/${user?._id}/edit`} className='ml-8'>
                                            <button
                                                className='text-blue-500 border-2 px-2 py-1 mx-auto border-blue-400 bg-white rounded-lg '
                                                >Edit Profile{console.log(users)}{console.log(urlElements[2])}
                                            </button>
                                    </Link>  
                                }<br/><br/>
                                <Link to={`/user/${user?._id}/list`} className='ml-10'>
                                            <button
                                                className='text-blue-500 border-2 px-2 py-1 mx-auto border-blue-400 bg-white rounded-lg '
                                                >User List
                                            </button>
                                </Link> 
                            </div> 
                        </div>
                    </div>
                        <div className="min-h-screen pb-20 bg-gray-200 flex flex-wrap space-y-4 w-full"> {/* SmallSquare */}
                        <div className='w-full bg-yellow-100 h-3/4'>
                            <p className='text-4xl pt-4 text-center bg-yellow-200'>Top Favourite</p>
                            <div className="flex justify-center">
                            {Favourite?.map((movie) => {
                                    return <Favcard movieData={movie} key={movie.id} />;
                                })}
                            </div>
                            </div>
                            <div className=' bg-PYellow w-full h-fit'>
                                <div className="text-3xl text-center pb-5">Statistics:</div>
                                <div className='flex pb-10 h-full w-full justify-center '>
                                    <div className='pl-5 pb-36 h-60 w-60 bg-red-200'>
                                        <p className="text-xl">TV Series</p>
                                        <p>In the list: {Usernote.filter(data => data.ContType === 'tv').length}</p>
                                        <p>Watching: {Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Watching' ).length}</p>
                                        <p>Complete: {Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Complete').length}</p>
                                        <p>On-hold: {Usernote.filter(data => data.ContType === 'tv' && data.Status === 'Onhold').length}</p>
                                        <p>PlantoWatch: {Usernote.filter(data => data.ContType === 'tv' && data.Status === 'PlantoWatch').length}</p>
                                        <p>Favourite: {Usernote.filter(data => data.ContType === 'tv' && data.isFavourite === true).length}</p>
                                    </div>
                                    <div className='pl-5 pb-36 h-60 w-60 bg-red-300'>
                                        <p className="text-xl">Movies</p>
                                        <p className="">In the list: {Usernote.filter(data => data.ContType === 'movie').length}</p>
                                        <p>Watching: {Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Watching' ).length}</p>
                                        <p>Complete: {Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Complete').length}</p>
                                        <p>On-hold: {Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Onhold').length}</p>
                                        <p>PlantoWatch:{Usernote.filter(data => data.ContType === 'movie' && data.Status === 'PlantoWatch').length}</p>
                                        <p>Favourite: {Usernote.filter(data => data.ContType === 'movie' && data.isFavourite === true).length}</p>
                                    </div>
                                    <div className='pl-5 pb-36 h-60 w-60 bg-red-200'>
                                        <p className="text-xl">Review</p>
                                        <p className="">ReviewCount: {Usernote.filter(data => data.ContType === 'movie').length}</p>
                                        <p>MovieReview: {Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Watching' ).length}</p>
                                        <p>TVSeriesReview: {Usernote.filter(data => data.ContType === 'movie' && data.Status === 'Complete').length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full text-center'>
                                <div className='font-mono text-3xl'>Watchlist sort by genre</div>
                                {(Usernote !== []) ? <GenreBarChart note={Usernote} /> : ''}
                            </div>
                            </div>
                    </div>
                </div>
    )
}

export default UserProfile;