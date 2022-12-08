import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDatabyGenre } from "../Context/FetchContext";

export default function SelectGenre({ genres}) {
  const dispatch = useDispatch();
  const [Filtered,setFiltered] = useState(
    {
      'genre':28,
      'type':'movie'
    }
  )
  const [save, setsave] = useState(false)

  function handleChange(e){
    setFiltered((prev)=>({...prev,[e.target.name]:e.target.value}))
    setsave(true)
    console.log(Filtered)
  }

  async function fetchData()
  {
    dispatch(
      fetchDatabyGenre({
        genres,
        genre: Filtered.genre,
        type: Filtered.type
      }) 
    );
  }

  useEffect(() => {
    let setLoading = true;
    if(save && setLoading){
        fetchData();
        setsave(false)
    }
       return() => {
        setLoading = false
   }
       }, [save]);

  return (
    <div className='bg-yellow-200 mx-auto'>
    <div className="flex items-center justify-center text-center">
      <p className="text-3xl pr-2 pt-2">Type:</p>
      <Select
        name='type'
        className="w-60 text-center"
        onChange={handleChange}
      > {console.log(genres)}
        <option  value='movie'>Movie
        </option>
        <option  value='tv'>TV series
        </option>
      </Select>
    </div>
    <div className="flex items-center justify-center text-center pr-4">
      <p className="text-3xl pr-2 pt-2">Genre:</p>
      <Select
        name='genre'
        className="w-60 text-center"
        onChange={handleChange}
      >
      {genres.map((genre) =>{ 
        return(
            <option  value={genre.id} key={genre.id}>{genre.name}
            </option>
      );})
        }
      </Select>
      </div>
    </div>
  );
}

const Select = styled.select`
  margin-top:1rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;