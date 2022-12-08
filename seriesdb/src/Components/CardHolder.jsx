import React from "react";
import Card from "./Card2";

export default function CardHolder({ data, title }) {
  return (  
    <div className=''>
       <h1 className='text-4xl w-screen text-center h-20 bg-yellow-200 pt-2'>{title}</h1>
       <div className='flex flex-wrap pl-14'>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
       </div>   
    </div>
  );
};