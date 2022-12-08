import React from 'react';
import {useNavigate} from 'react-router-dom';


export default (function Card2({ index, movieData}){
  const navigate = useNavigate();
  
  const handleClick= async(e)=>{
    console.log(movieData.type);
    if (movieData.type === undefined){
      movieData.type = localStorage.getItem('contenttype')
    } 
    localStorage.setItem('contenttype',movieData.type)
    navigate(`/${movieData.type}/${movieData.id}`);
    window.location.reload();
  }
  // useEffect(() => {
  //   if (type != movieData.type) {
  //     movieData.type = 'movie'
  //   }
  //   }, [type]);
  return (
        <div className="px-5 items-center hover:bg-sky-700" onClick={handleClick}s>
          <img alt='404 Not Found' 
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          className='w-48 h-60 ml-4 mt-4'></img>
          <p className='w-56 text-center font-mono'>{movieData.title || movieData.name || movieData.original_name || movieData.ContName}</p>
        </div>
    )
});

