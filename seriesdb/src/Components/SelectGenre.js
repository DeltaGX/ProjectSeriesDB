import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDatabyGenre } from "../Context/FetchContext";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className=""
      onChange={(e) => {
        dispatch(
          fetchDatabyGenre({
            genres,
            genre: e.target.value,
            type,
          }) 
        );
      }}
    >
    {genres.map((genre) =>{ 
      return(
          <option value={genre.id} key={genre.id}>{genre.name}
          </option>
    );})
      }
    </Select>
  );
}

const Select = styled.select`
  margin-left:44%;
  margin-top:1rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;