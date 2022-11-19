import React from "react";
import CardHolder from "./CardHolder";
export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div className="font-mono">
      <CardHolder data={getMoviesFromRange(0, 12)} title="Trending Now" />
      <CardHolder data={getMoviesFromRange(12, 24)} title="New Releases" />
      <CardHolder
        data={getMoviesFromRange(24, 36)}
        title="Blockbuster Movies"
      />
      <CardHolder
        data={getMoviesFromRange(36, 48)}
        title="Popular on Netflix"
      />
      <CardHolder data={getMoviesFromRange(48, 60)} title="You May Like" />
      <CardHolder data={getMoviesFromRange(60, 72)} title="Epics" />
    </div>
  );
}
