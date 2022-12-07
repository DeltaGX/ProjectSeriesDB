import NavBar from '../Components/NavBar.js';
import React,{useState, useContext,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';
import { API_KEY,TMDB_BASE_URL } from "../Utils/constant";
import ReviewDrop from "../Components/ReviewDropDown"

export default React.memo(function OnlineCont({ }) {
        const navigate = useNavigate();
        const Contid = localStorage.getItem('Contid')
        const type = localStorage.getItem('contenttype')
        const [movieInfo, setmovieInfo] = useState([]);
        const [Review, setReview] = useState([])
        const { user } = useContext(AuthContext);
        async function fetchContent() {
             try {  
              const res = await axios.get(`${TMDB_BASE_URL}/${type}/${Contid}?api_key=${API_KEY}&language=en-US`);
              console.log(res.data);
              setmovieInfo(res.data);
             } catch (err) {
              console.log(err)
             }
           }    
        const handleChange = (e) => {
            setReview((prev) => ({ ...prev, [e.target.id]: e.target.value }));
          };
        
        const handleSave=async(e)=>{
            if (user._id != undefined){
            try {
              const res = await axios.put(`http://localhost:4000/users/${user._id}`, 
              Review, {withCredentials:true})
              window.location.reload()
              console.log(res)
            } catch (err) {
              console.log(err);}
            }}

        useEffect(() => {
           fetchContent();
          }, []);
          
        
    return(
            <div className='bg-Lightblue min-h-screen'>
            <NavBar/>
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center justify-center"> {/* YellowSquare */}
                    <p className='text-2xl font-bold'>{movieInfo.name|| movieInfo.title || movieInfo.original_name || movieInfo.original_title} Review
                    </p>
                </div>
                <div className="relative w-3/4 min-h-screen mb-20 bg-gray-100 m-auto flex flex-nowrap shrink-0 "> {/* BigSquare */}
                    <div className='justify-center'>
                    <form onSubmit={handleSave}>    
                    <table className='border-collapse w-fit h-screen ml-72'>
                    <thead >
                    <tr className='border-4'>
                        <th className='border-4 w-40'>User</th>
                        <th className='border-4'>Recommend?</th>
                        <th className='border-4'>Score</th>
                        <th className='border-4 w-80'>Review</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Review.map((note,i) => {
                            return(
                            <tr key={i}>    
                                <td className='w-80 text-center border-4'>
                                    <Link to={`/${note.ContType}/${note.Contid}`}><p className='text-blue-500 underline'>{note?.ContName}
                                    </p></Link>
                                </td>
                                <td className='border-4'>
                                    <p className='w-fit text-center' >{note.ContType}
                                    </p>
                                </td>
                                <td className='border-4'>
                                    <ReviewDrop />
                                </td>
                            
                                <td className='border-4'>
                                    <div>
                                        <input id="EPseen" type='number' className='w-10 ml-2' 
                                            defaultValue={note?.EPseen} 
                                            min="1"
                                            onChange={handleChange} 
                                    onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}
                                        />
                                    </div>
                                </td>
                                <td className='border-4'>
                                    <div >
                                        <input id="UserScore" type='number' className='ml-2' 
                                            defaultValue={note?.UserScore} min="0" max="10" 
                                            onChange={handleChange} 
                                    onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}
                                        />
                                    </div>
                                </td>
                                <td className='border-4'>
                                    <div >
                                        <textarea id="Note" defaultValue={note?.Note} className='overflow-auto border-2 w-72' 
                                            onChange={handleChange}>
                                </textarea>
                                    </div>
                                    </td>
                                <td className='border-4 w-30 justify-center mt-24'>
                                    <button value='Save Edit' type='submit' className='text-blue-500 underline border-2 bg-white' >
                                        SaveEdit
                                    </button>
                                    <button value='Delete'className='text-blue-500 underline border-2 bg-white'>
                                        Remove
                                    </button><br/>
                                    <Link to={`/user/${user._id}/${note.Contid}`}>
                                    <button className='text-blue-500 underline border-2 bg-white' onClick={()=>{localStorage.setItem('Contid',note?.Contid); localStorage.setItem('contenttype',note?.ContType)}}>
                                        ChapterNote
                                    </button></Link>
                                </td>
                                </tr>                        
                    )})}
                    </tbody>
                    </table>
                    </form>
                </div>
        </div>
        </div>
    )
});

