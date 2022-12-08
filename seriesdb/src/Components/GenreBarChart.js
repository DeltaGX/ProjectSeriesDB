import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis,  Tooltip } from 'recharts';

export default function GenreBarChart( note ) {
const [Chartdata, setChartdata] = useState([]);
const [Chartdata2, setChartdata2] = useState([]);

    // const tickArray = [0, Math.trunc('dataMax'/4), Math.trunc('dataMax'/2), Math.trunc(3*'dataMax'/4), 'dataMax']

    useEffect(() => {
        function CountGenre(){
            console.log(note)
            setChartdata( [
                {
                    'name':'Action',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Action'))).length
                } ,
                {
                    'name':'Adventure',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Adventure'))).length 
                } ,
                {
                    'name':'Animation',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Animation'))).length
                } ,
                {
                    'name':'Comedy',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Comedy'))).length
                } ,
                {
                    'name':'Crime',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Crime'))).length
                } ,
                {
                    'name':'Documentary',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Documentary'))).length
                } ,
                {
                    'name':'Drama',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Drama'))).length
                } ,
                {
                    'name':'Family',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Family'))).length
                } ,
                {
                    'name':'Fantasy',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Fantasy'))).length
                } ,
                {
                    'name':'History',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('History'))).length
                } ,
                ])
            setChartdata2([
                {
                    'name':'Horror',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Horror'))).length
                } ,
                {
                    'name':'Music',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Music'))).length
                } ,
                {
                    'name':'Mystery',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Mystery'))).length
                } ,
                {
                    'name':'Romance',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Romance'))).length
                } ,
                {
                    'name':'Science Fiction',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Science Fiction'))).length
                } ,
                {
                    'name':'TV Movie',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('TV Movie'))).length
                } ,
                {
                    'name':'Thriller',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Thriller'))).length
                } ,
                {
                    'name':'War',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('War'))).length
                } ,
                {
                    'name':'Western',
                    'value':(note.note.filter((notedata) => notedata.ContGenre.includes('Western'))).length
                } ,
            ])
        }
        let setLoading = true;
        if(setLoading){
            CountGenre(note);
        }
        return() => {
            setLoading = false
        }
        }, [note]);

    return (
      <div className='ml-32'>
        <BarChart
          width={1000}
          height={300}
          data={Chartdata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
        <br></br>
        <BarChart
          width={1000}
          height={300}
          data={Chartdata2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
  

