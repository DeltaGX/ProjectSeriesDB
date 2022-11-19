import React from "react";
import Card from "./SearchCard";

export default (function SearchHolder({ data, title }) {
  return (
    <div className='ml-10 '>
       <h1 className='text-4xl text-center h-20 '>{title}</h1>
       <div>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
       </div>  
    </div>
  );
});