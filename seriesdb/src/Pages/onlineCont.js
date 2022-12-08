import NavBar from '../Components/NavBar.js';
import React,{useState, useContext,useEffect} from 'react';
import { Link} from 'react-router-dom';
import StatusDrop2 from '../Components/newStatusDropDown.js';
import Card2 from '../Components/Card2.js';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';
import { API_KEY,TMDB_BASE_URL } from "../Utils/constant";

export default (function OnlineCont() {     
        const type = localStorage.getItem('contenttype');
        const [AvailableAt,setAvailableAt] = useState();
        const [movieInfo, setmovieInfo] = useState([]);
        const [Recommend, setRecommend] = useState([]);
        const [Trailer, setTrailer] = useState([]);
        const [save, setsave] = useState(false);
        let Url = window.location.pathname
        const [Usernote, setUsernote] = useState({
            "Contid":movieInfo?.id,
            "ContType":type,
            "Note":undefined,
            "EPseen":undefined,
            "UserScore":undefined,
            "isFavourite":false,
        });
        const [saveerror, setsaveerror] = useState([]);
        const { user } = useContext(AuthContext);

        async function fetchContent() {
             try {  
              const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}?api_key=${API_KEY}&language=en-US`);
              console.log(res.data);
              setmovieInfo((prev)=>res.data);
             } catch (err) {
              console.log(err)
              setsaveerror(err)
             }
           }
        async function fetchTrailer() {
            try {  
             const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}?api_key=${API_KEY}&append_to_response=videos`);
             const trailerurl = res.data.videos.results.find(({type}) => type === "Trailer")
             setTrailer(trailerurl);
            } catch (err) {
             console.log(err)
            }
          }
        async function fetchRecommendation() {
            try { 
             const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
             console.log(res)
             const recommend = res.data.results.slice(0,5);
             setRecommend(recommend);
            } catch (err) {
             console.log(err)
            }
          }
        async function fetchUsernote() {
            try { 
             const res = await axios.get(`http://localhost:4000/users/${user._id}/Usernote`, { withCredentials: true });
             const note = res.data.find(({Contid}) => Contid === movieInfo.id)
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
            setUsernote((prev) => ({ ...prev, Contid:movieInfo.id, ContType:type,
                ContName:(movieInfo.name || movieInfo.title || movieInfo.original_name || movieInfo.original_title)
                ,ContPoster:movieInfo.poster_path,ContGenre:(movieInfo.genres.map(item => item.name)), [e.target.name]: e.target.value }));

          };

          const handleSave=async()=>{
            if (user._id !== undefined){
            try {
              const res = await axios.put(`http://localhost:4000/users/${user._id}`, 
              Usernote, {withCredentials:true})
              setsave(false)
              console.log(res)
              window.location.reload()
            } catch (err) {
              console.log(err);}
            }}

        useEffect(() => {
            let setLoading = true;
            if (setLoading){
                fetchContent();
                fetchProvider();
                fetchTrailer();
                fetchRecommendation();
            }
                return() => {
                    setLoading = false
                }
                }, [Url]);
          
        useEffect(() => {
        let setLoading = true;
        if(user && setLoading){
            fetchUsernote();
        }
           return() => {
            setLoading = false
       }
           }, [movieInfo.id]);
        
        useEffect(() => {
            let setLoading = true;
            if(save && setLoading){
                handleSave();
            }
               return() => {
                setLoading = false
           }
               }, [save]);
        

    return(
        <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path})`} } className='text-xl min-h-screen bg-cover'>
            <NavBar/>
                <div className="w-4/5 h-20 bg-PYellow m-auto flex items-center justify-center pt-36"> {/* YellowSquare */}
                    <p className='text-4xl font-bold mb-16'>{movieInfo.name || movieInfo.title || movieInfo.original_name || movieInfo.original_title}</p>
                </div>
                <div className="relative w-4/5 min-h-screen bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} className='w-48 h-60 ml-10 mt-10 pr-4'/>
                    {user ? <div className='absolute top-72 left-8 w-50'>
                        <p className='text-2xl ml-8 '>Your Status {console.log(movieInfo)}</p>
                        {user && <StatusDrop2 current={Usernote?.Status} handlechange={handleChange} />}
                        {user && <div className="ml-6">
                        <div>{saveerror}</div>
                        <div>Ep Seen:<input name="EPseen" type='number' className='w-12 ml-2 pl-1 border-2' 
                            defaultValue={Usernote?.EPseen} min="1" max={movieInfo.number_of_episodes ? movieInfo.number_of_episodes : 1} onChange={handleChange} onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}/>
                        </div>
                        <div >Your Score:<input name="UserScore" type='number' className='w-12 ml-2 pl-1 border-2' 
                            defaultValue={Usernote?.UserScore} min="0" max="10" onChange={handleChange} onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}/></div>
                        <div >Your Note: <br/><textarea name="Note" defaultValue={Usernote?.Note} className='w-36 h-30 overflow-auto border-2' 
                             onChange={handleChange}></textarea></div>
                        <button onClick={(e)=>{handleChange(e); setsave(true)}} className='text-blue-500 underline ml-8 border-2 bg-white' >Save Edit</button>
                        <br />
                        {Usernote?.isFavourite 
                        ? <button name='isFavourite' value='false' 
                            className='text-blue-500 underline text-center border-2 bg-white mt-3' 
                            onClick={(e) => {handleChange(e); setsave(true);}}
                            >Remove Favourite
                        </button>
                        :<button name='isFavourite' value='true' 
                            className='text-blue-500 underline text-center border-2 bg-white mt-3' 
                            onClick={(e) => {handleChange(e); setsave(true);}} 
                            >Add to Favourite
                        </button>}
                        
                        </div>}
                    </div>: <div className='absolute ml-8 top-80 w-40'>Login or Register to use Note Feature!</div>}
                        <div className="w-4/5 min-h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap"> {/* SmallSquare */}
                            <div className='ml-6 mt-4 h-fit w-full'><div className="text-4xl underline">Status and Information:</div>
                                <p className=' top-7 pt-4 text-3xl'>Synopsis:</p>
                                <p className='mt-5 mb-5 w-4/5 fonts-sans '>{movieInfo?.overview}</p>
                            </div>
                            <div className='ml-5 w-56 overflow-auto'>
                                <p className="text-3xl underline">Information</p>
                                <div className="text-2xl">Genre:{movieInfo?.genres?.map((genres) =>
                                                    <p className="text-base" key={genres.id}>{genres.name}</p>)}
                                </div>
                                <div className='text-2xl flex'>Status: <p className='text-xl pt-1'>{movieInfo.status}</p></div>
                                {movieInfo.number_of_seasons && <div>#Season: {movieInfo.number_of_seasons}</div>}
                                {movieInfo.number_of_episodes && <div>#Episode: {movieInfo.number_of_episodes}</div>}
                                <div>Released Date:<p className='text-base'>{movieInfo.release_date}</p></div>
                                <div>Production: {movieInfo?.production_companies?.map((production_companies) =>
                                                    <p className='text-base' key={production_companies.id}>{production_companies.name}</p>)}</div>
                                <div>Production Country: {movieInfo?.production_countries?.map((production_countries,i) =>
                                                    <p className='text-base' key={i}>{production_countries.name}</p>)}</div>
                            </div>
                            <div className='pl-24 w-96'>
                                <p className='text-3xl underline'>Link</p>
                                {movieInfo?.imdb_id 
                                    ? <a href={`https://www.imdb.com/title/${movieInfo.imdb_id}`}>
                                        <p className='text-blue-500 underline text-3xl'>IMDB</p>
                                      </a>
                                    : <a href={`https://www.imdb.com/find?q=${movieInfo.name|| movieInfo.title || movieInfo.original_name || movieInfo.original_title}`}>
                                        <p className='text-blue-500 underline text-3xl'>IMDB</p>
                                     </a>
                                }
                                <div className='flex items-center'>TMDBScore: {movieInfo?.vote_average} / 10</div>
                                <div >from  {movieInfo?.vote_count}  vote</div>
                            {movieInfo?.homepage 
                                &&  <div className='pt-4'>
                                        <p>Homepage</p>
                                        <a href={movieInfo.homepage}>
                                            <p className='text-blue-500 underline overflow-auto'>{movieInfo.homepage}</p>
                                        </a>
                                    </div>
                            }
                            </div>
                            <div className='pl-20'>
                                <div className='ml-5 h-20'>
                                <a href={AvailableAt}>
                                    <p className='text-3xl text-blue-500 underline'>Where to watch?</p>
                                </a>
                                <div className='h-20'>
                                    <p className='text-3xl'>Reviews:</p>
                                    <Link to={`/movie/${movieInfo.id}/review`}>
                                        <p className='text-blue-500 underline text-3xl' 
                                        onClick={()=>{localStorage.setItem('Contid',Usernote.Contid); localStorage.setItem('contenttype',Usernote.ContType)}}
                                        >Read All Review Here</p>
                                    </Link>
                                </div>
                                <p className='text-3xl mt-10'> Trailer {console.log(Recommend)}</p>
                                <div className='ratio ratio-4x3 mt-10'>
                                <iframe src={`https://www.youtube.com/embed/${Trailer?.key}`} title="youtube video" allow="fullscreen;"></iframe>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-20 bg-PYellow text-center w-screen pb-10'>
                            <p className='text-3xl pt-5'> You May Like</p>
                        </div>
                        <div className='flex pb-10 pl-3' >
                            {Recommend?.map((movie) => {
                                    return <Card2 movieData={movie} key={movie.id} />;
                                })}      
                        </div>
                    </div>
                </div>
    )
});

