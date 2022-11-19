import React from "react";
import Card from "./Card2";

export default React.memo(function CardHolder({ data, title }) {
  return (  
    <div className='ml-4 mr-4'>
       <h1 className='text-4xl text-center h-20 '>{title}</h1>
       <div className='flex flex-wrap'>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
       </div>   
    </div>
  );
});