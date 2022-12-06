import React, { useContext,useState,useEffect,Fragment } from 'react';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';
import { API_KEY,TMDB_BASE_URL } from "../Utils/constant";
import NavBar from '../Components/NavBar.js';
import EditableEpisodeRow from "../Components/EditableEpisodeRow"
import ReadOnlyEpisodeRow from "../Components/ReadOnlyEpisodeRow"

function EpisodeList(){
    const {user}=useContext(AuthContext);
    const type = localStorage.getItem('contenttype')
    const contid = localStorage.getItem('Contid')
    const [Usernote, setUsernote] = useState()
        // {
        //     'Userid':'',
        //     'Contid':'',
        //     'SeasonNote':[
        //         {'Season':'',
        //          'EpisodeNote':[
        //              {
        //                 "Episode":'',
        //                 "Note":'',
        //                 "EpisodeScore":'',
        //                 "isWatched":false,
        //              }
        //           ]
        //          }
        //     ]
        // }
    const [movieInfo, setmovieInfo] = useState();
    const [editRowId, seteditRowId] = useState(null);
    const [editRowData, seteditRowData] = useState({
        "Season":'',
        "Episode":'',
        "Note":'',
        "Episodescore":undefined,
        "isWatched":false,
      });
    const handleEditClick = (e, content, season) => {
        e.preventDefault();
        seteditRowId(content._id);
        const formValues = {
            "Season":season,
            "Episode":content.Episode,
            "Note":content.Note,
            "Episodescore":content.UserScore,
            "isWatched":content.isWatched,
        };
        seteditRowData(formValues);
        };

    const handleCancelClick = () => {
        seteditRowId(null);
        window.location.reload();
        };
    
    const handleFirstSave = async () => {
            try { 
             const Note = await axios.get(`http://localhost:4000/episodenote/${user._id}/${contid}`, { withCredentials: true })
            //  console.log(Note.data);
                if (Note.data === null && movieInfo !== undefined) {
                    const SeasonNumber = movieInfo?.seasons.length
                    console.log(SeasonNumber)
                    const FullNote = []
                    for(let i=0; i<SeasonNumber;i++){
                        // const seasonnote =  Note?.SeasonNote.findIndex(({Season}) => Season === i)
                        const EpNumber = movieInfo?.seasons[i].episode_count
                        console.log(EpNumber)
                        // const SeasonName = movieInfo?.seasons[i].name
                        // const SeasonPoster = movieInfo?.seasons[i].poster_path
                        let note = []
                            for(let i=0; i<EpNumber;i++){
                                // const Epnote =  seasonnote?.EpisodeNote.findIndex(({Episode}) => Episode === (i+1))
                                note.push(
                                  {
                                    "Episode":i+1,
                                    "Note":'',
                                    "Episodescore":undefined,
                                    "isWatched":false,
                                  }
                                )
                            }
                        console.log(note)
                        FullNote.push(
                            {
                                'Season':i,
                                'EpisodeNote':note
                            }
                        )           
                    }
                    console.log(FullNote)
                    await axios.post(
                        `http://localhost:4000/episodenote/${user._id}/${contid}`, 
                        FullNote , 
                        { withCredentials: true }
                    )
                    window.location.reload()
                 }
            } catch(err){
                console.log(err);
            }
        }
                             


    const handleDeleteClick=async(e,note,season)=>{
        e.preventDefault();
        if (user._id !== undefined){
        try {
            const res = await axios.put(`http://localhost:4000/episodenote/${user._id}/${contid}/`, 
            {
                "Season":season,
                "Episode":note.Episode,
                "Note":'',
                "Episodescore":undefined,
                "isWatched":false,
            }
            ,
            {withCredentials:true})
            window.location.reload()
            console.log(res)
        } catch (err) {
            console.log(err);}
        }}

    const handleChange = (e) => {
        seteditRowData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    const handleCheckboxChange = (e) => {
        seteditRowData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    };
    
    const handleSave=async(e)=>{
        if (user._id !== undefined){
        try {
          const res = await axios.put(`http://localhost:4000/episodenote/${user._id}/${contid}`, 
          editRowData, {withCredentials:true})
          window.location.reload()
          console.log(res)
        } catch (err) {
          console.log(err);}
        }}

    async function fetchEpisodenote() {
        try { 
            const res = await axios.get(`http://localhost:4000/episodenote/${user._id}/${contid}`, { withCredentials: true })
            console.log(res.data);
            setUsernote(res.data);
        } catch (err) {
            console.log(err)
        }
        }
    async function fetchContent() {
        try {  
            const res = await axios.get(`${TMDB_BASE_URL}/${type}/${contid}?api_key=${API_KEY}&language=en-US`);
            console.log(res.data);
            setmovieInfo(res.data);
        } catch (err) {
            console.log(err)
        }
    }    
    

    useEffect(() => {
        let setLoading = true;
        if (setLoading){
            fetchContent();
        }
            return() => {
                setLoading = false
            }
            });
    useEffect(() => {
        let setLoading = true;
        if (setLoading){
            handleFirstSave();
            fetchEpisodenote();
        }
            return() => {
                setLoading = false
            }
            }, [movieInfo?.id]);


    return(
        <div className='bg-Lightblue min-h-screen'>
            <NavBar/>
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center justify-center"> {/* YellowSquare */}
                    <div className='text-xl font-bold'>{movieInfo?.name || movieInfo?.title || movieInfo?.original_name || movieInfo?.original_title} </div>
                </div>
                <div className="w-3/4 min-h-screen bg-gray-100 mx-auto shrink-0 "> {/* BigSquare */}
                        {Usernote?.SeasonNote.map((note,i) =>
                            {
                             return (
                                <form className='' key={i}>          
                                <div className="text-center">
                                    <p className='text-center text-3xl'>{movieInfo?.seasons[i].name}</p>
                                    <img alt='404 not found' 
                                                    src={`https://image.tmdb.org/t/p/w500${movieInfo?.seasons[i].poster_path}`} 
                                                    className='w-48 h-60 mx-auto'
                                            />
                                </div>
                                <table className='border-collapse w-fit mx-auto'>
                                    <thead>
                                        <tr>
                                            <th className='border-4'>Episode</th>
                                            <th className='border-4'>Watched?</th>
                                            <th className='border-4'>YourScore</th>
                                            <th className='border-4'>Note</th>
                                            <th className='border-4'>Edit</th>
                                        </tr>
                                    </thead>
                                {note.EpisodeNote.map((epnote) =>
                                    { return (
                                            <tbody key={epnote._id}>
                                            <Fragment>
                                                {editRowId === epnote._id ? (
                                                <EditableEpisodeRow
                                                    userid={user._id}
                                                    note={editRowData}
                                                    handleChange={handleChange}
                                                    handleCheckboxChange={handleCheckboxChange}
                                                    handleSave={handleSave}
                                                    handleCancelClick={handleCancelClick}
                                                />
                                                ) : (
                                                <ReadOnlyEpisodeRow
                                                    season={i}
                                                    note={epnote}
                                                    userid={user._id}
                                                    handleEditClick={handleEditClick}
                                                    handleDeleteClick={handleDeleteClick}
                                                />
                                                )}
                                            </Fragment>
                                            </tbody>
                                    )
                                })}
                                </table>
                                </form>
                            )}
                        )
                    }
                </div>     
            </div> 
    )
}

export default EpisodeList;
