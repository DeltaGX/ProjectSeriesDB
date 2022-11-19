import React from "react";
import CardHolder from "./CardHolder";
export default function Slider({ movies, title, type }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      <CardHolder className="" data={getMoviesFromRange(0, 60)} title={title} />
    </div>
  );
}