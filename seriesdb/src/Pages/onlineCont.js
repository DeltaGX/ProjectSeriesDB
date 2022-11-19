import NavBar from '../Components/NavBar.js';
import React,{useState, useContext,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusDrop from '../Components/StatusDropDown';
import StatusDrop2 from '../Components/newStatusDropDown.js';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';
import { API_KEY,TMDB_BASE_URL } from "../Utils/constant";

export default (function OnlineCont({ }) {
        const navigate = useNavigate();
        const type = localStorage.getItem('contenttype');
        const [AvailableAt,setAvailableAt] = useState();
        const [movieInfo, setmovieInfo] = useState([]);
        const [Usernote, setUsernote] = useState([]);
        const [saveerror, setsaveerror] = useState([]);
        // const [saveNote, setsaveNote] = useState({
        //          "Contid":movieInfo.id,
        //          "ContType":type,
        //          "Note":undefined,
        //          "EPseen":undefined,
        //          "UserScore":undefined,
        //          "isFavourite":false,
        // });
        const { user } = useContext(AuthContext);

        async function fetchContent() {
             try {  
              const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}?api_key=${API_KEY}&language=en-US`);
              console.log(res.data);
              setmovieInfo(res.data);
             } catch (err) {
              console.log(err)
              setsaveerror(err)
             }
           }
        async function fetchUsernote() {
            try { 
             const res = await axios.get(`http://localhost:4000/users/${user._id}/Usernote`, { withCredentials: true });
             const note = res.data.find(({Contid}) => Contid === movieInfo.id)
             console.log(note);
             setUsernote(note);
            } catch (err) {
             console.log(err)
            }
          }
          async function fetchProvider() {
            try { 
             const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}/watch/providers?api_key=${API_KEY}`);
             const AvailableAt = res.data.results.TH.link
             setAvailableAt(AvailableAt);
             }
             catch (err) {
             console.log(err)
            }
          }

          const handleChange = (e) => {
            setUsernote((prev) => ({ ...prev, [e.target.id]: e.target.value }));
          };
        
          const handleSave=async(e)=>{
            if (user._id != undefined){
            try {
              const res = await axios.put(`http://localhost:4000/users/${user._id}`, 
              {Usernote}, {withCredentials:true})
              window.location.reload()
              console.log(res)
            } catch (err) {
              console.log(err);}
            }}
          
        useEffect(() => {
           fetchContent();
           fetchProvider();
          }, []);
          
        useEffect(() => {
           if(user)
           fetchUsernote();
           }, [movieInfo.id]);
        //    style={{backgroundImage: (`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`)}}
    return(
        <div style={{'var(-imageUrl)': `https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}}className='text-xl min-h-full bg-[image:var(-imageUrl)]'>
            <NavBar />
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center"> {/* YellowSquare */}
                    <p className='ml-10 text-4xl font-bold'>{movieInfo.name || movieInfo.title || movieInfo.original_name || movieInfo.original_title}</p>
                </div>
                <div className="relative w-3/4 min-h-screen pl-5 mb-20 bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} className='w-48 h-60 ml-5 mt-10 pr-4'/>
                    {user ? <div className='absolute top-72 left-8 w-50'>
                        <p className='text-2xl ml-8 '>Your Status</p>
                        {user && <StatusDrop2 className="pl-4" current={Usernote?.Status} userid={user._id} contid={movieInfo.id} usernote={Usernote} />}
                        {user && <form onSubmit={handleSave} className="ml-6">
                        <div>{saveerror}</div>
                        <div>Ep Seen:<input id="EPseen" type='number' className='w-12 ml-2 pl-1 border-2' 
                            defaultValue={Usernote?.EPseen} min="1" max={movieInfo.number_of_episodes ? movieInfo.number_of_episodes : 1} onChange={handleChange} onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}/>
                        </div>
                        <div >Your Score:<input id="UserScore" type='number' className='w-12 ml-2 pl-1 border-2' 
                            defaultValue={Usernote?.UserScore} min="0" max="10" onChange={handleChange} onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}/></div>
                        <div >Your Note: <br/><textarea id="Note" defaultValue={Usernote?.Note} className='w-36 h-30 overflow-auto border-2' 
                             onChange={handleChange}></textarea></div>
                        <button value='Save Edit' type='submit' className='text-blue-500 underline ml-8 border-2 bg-white' >Save Edit</button>
                        <br />
                        {user && !(Usernote?.isFavourite) ? 
                        <button id='isFavourite' value='true'className='text-blue-500 underline text-center border-2 bg-white mt-3' onClick={(e) => {handleChange(e); handleSave(e);}}>Add to Favourite</button>
                        :<button id='isFavourite' value='false' className='text-blue-500 underline text-center border-2 bg-white mt-3' onClick={(e) => {handleChange(e); handleSave(e);}}>Remove Favourite</button>}
                        </form>}
                    </div>: <div className='absolute ml-8 top-80 w-40'>Login or Register to use Note Feature!</div>}
                <div >
                        <div className="absolute w-4/5 min-h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap space-y-4"> {/* SmallSquare */}
                            <div className='relative ml-6 mt-4 pb-20 h-50 w-full'><div className="text-4xl underline">Status and Information:</div>
                                <p className='absolute top-7 pt-4 text-3xl'>Synopsis:</p>
                                <p className='absolute mt-14 w-4/5 h-40 overflow-auto fonts-sans '>{movieInfo?.overview}</p>
                            </div>
                            <div className='ml-5 h-auto w-60 overflow-auto'>
                                <p className="text-3xl underline">Information</p>
                                <div className="text-2xl">Genre:{movieInfo?.genres?.map((genres) =>
                                                    <p className="text-base" key={genres.ID}>{genres.name}</p>)}</div>
                                <div className='text-2xl flex'>Status: <p className='text-xl pt-1'>{movieInfo.status}</p></div>
                                <div>#Episode: {movieInfo.number_of_episodes}</div>
                                <div>Released Date:<p className='text-base'>{movieInfo.release_date}</p></div>
                                <div>Production: {movieInfo?.production_companies?.map((production_companies) =>
                                                    <p className='text-base' key={production_companies.ID}>{production_companies.name}</p>)}</div>
                                <div>Production Country: {movieInfo?.production_countries?.map((production_countries) =>
                                                    <p className='text-base' key={production_countries.ID}>{production_countries.name}</p>)}</div>
                            </div>
                            <div className='pl-24 h-20 ml-2'>
                                <p className='text-3xl underline'>Link</p>
                                {movieInfo?.imdb_id ? <a href={`https://www.imdb.com/title/${movieInfo.imdb_id}`}>
                                <p className='text-blue-500 underline text-3xl'>IMDB</p>
                                </a> : <a href={`https://www.imdb.com/find?q=${movieInfo.name|| movieInfo.title || movieInfo.original_name || movieInfo.original_title}`}>
                                    <p className='text-blue-500 underline text-3xl'>IMDB</p></a>}
                                <p >score:{movieInfo?.vote_average} </p>
                                <p >from:{movieInfo?.vote_count} vote</p>
                            </div>
                            <div className='pl-20'>
                                <div className='ml-5 h-20'>
                                <a href={AvailableAt}>
                                    <p className='text-3xl text-blue-500 underline'>Where to watch?</p>
                                </a>
                                <div className='h-20'>
                                    <p className='text-3xl'>Reviews:</p>
                                    <Link to={`/Movies/${movieInfo.id}/Reviews`}>
                                        <p className='text-blue-500 underline text-3xl'>Read All Review Here</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

