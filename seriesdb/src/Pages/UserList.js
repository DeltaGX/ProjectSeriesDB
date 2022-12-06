import NavBar from '../Components/NavBar.js';
import EditableRow from '../Components/EditableRow.js'
import ReadOnlyRow from '../Components/ReadOnlyRow.js'
import React, { useContext,useState,useEffect,Fragment } from 'react';
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';

function Userlist(){
    const {user}=useContext(AuthContext);
    const [Usernote, setUsernote] = useState([]);
    const [editRowId, seteditRowId] = useState(null);
    const [editRowData, seteditRowData] = useState({
                "Contid":'',
                "ContType":'',
                "ContName":'',
                "ContPoster":'',
                "Status" : '',
                "Note":'',
                "EPseen":'',
                "UserScore":'',
                "isFavourite":false,
      });
    const [save, setsave] = useState(false);

    const handleEditClick = (e, content) => {
    e.preventDefault();
    seteditRowId(content._id);

    const formValues = {
        "Contid":content.Contid,
        "ContType":content.ContType,
        "ContName":content.ContName,
        "ContPoster":content.ContPoster,
        "Status" : content.Status,
        "Note":content.Note,
        "EPseen":content.EPseen,
        "UserScore":content.UserScore,
        "isFavourite":content.isFavourite,
    };
    seteditRowData(formValues);
    };

    const handleCancelClick = () => {
    seteditRowId(null);
    window.location.reload();
    };
    

    async function fetchUsernote() {
        try { 
         const res = await axios.get(`http://localhost:4000/users/${user._id}/Usernote`, { withCredentials: true });
         setUsernote(res.data);
        } catch (err) {
         console.log(err)
        }
      }
    // async function fetchContent({type,contid}) {
    //     try {  
    //      const res = await axios.get(`${TMDB_BASE_URL}/${type}/${contid}?api_key=${API_KEY}&language=en-US`);
    //      console.log(res.data);
    //      setmovieInfo(res.data);
    //     } catch (err) {
    //      console.log(err)
    //     }
    // }
    // async function fetchContent({type,contid}) {
    //     return(await axios.get(`${TMDB_BASE_URL}/${type}/${contid}?api_key=${API_KEY}&language=en-US`))
    //     }

    const handleChange = (e) => {
        seteditRowData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    const handleCheckboxChange = (e) => {
        seteditRowData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    };
    
    const handleSave=async(e)=>{
        if (user._id !== undefined){
        try {
          const res = await axios.put(`http://localhost:4000/users/${user._id}`, 
          editRowData, {withCredentials:true})
          setsave(false)
          window.location.reload()
        } catch (err) {
          console.log(err);}
        }}
    const handleDelete=async(noteid)=>{
        if (user._id !== undefined){
        try {
            const res = await axios.delete(`http://localhost:4000/users/${user._id}/${noteid}`, 
            {withCredentials:true})
            window.location.reload()
            console.log(res)
        } catch (err) {
            console.log(err);}
        }}
      
      useEffect(() => {
        let setLoading = true;
        if(user && setLoading){
           fetchUsernote();}
        return() => {
            setLoading = false  
        }
           },[]);

      useEffect(() => {
            let setLoading = true;
            if(save && setLoading){
                handleSave();
            }
               return() => {
                setLoading = false
           }
            }, [save]);

    return(
        <div className='bg-Lightblue min-h-screen'>
            <NavBar/>
                <div>

                </div>
                <div className="w-4/5 h-20 bg-PYellow m-auto mt-10 flex items-center justify-center"> {/* YellowSquare */}
                    <p className='text-2xl font-bold'>{user?.UserName} list
                    </p>
                </div>
                <div className="relative w-4/5 min-h-screen bg-gray-100 m-auto flex flex-nowrap shrink-0 "> {/* BigSquare */}
                    <div className='justify-center'> 
                    <table className='border-collapse w-fit'>
                    <thead >
                    <tr className='border-4'>
                        <th className='border-4'>Poster</th>
                        <th className='border-4'>Name</th>
                        <th className='border-4'>type</th>
                        <th className='border-4'>Status</th>
                        <th className='border-4'>EPseen</th>
                        <th className='border-4'>YourScore</th>
                        <th className='border-4'>Note</th>
                        <th className='border-4'>Favourite?</th>
                        <th className='border-4'>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Usernote.map((note,i) => {
                        return(
                             <Fragment>
                             {editRowId === note._id ? (
                               <EditableRow
                                 userid={user._id}
                                 note={editRowData}
                                 handleChange={handleChange}
                                 handleSave={() =>setsave(true)}
                                 handleCheckboxChange={handleCheckboxChange}
                                 handleCancel={handleCancelClick}
                               />
                             ) : (
                               <ReadOnlyRow
                                 note={note}
                                 userid={user._id}
                                 handleEditClick={handleEditClick}
                                 handleDeleteClick={handleDelete}
                               />
                             )}
                           </Fragment>
                         )})}
                    </tbody>
                    </table>
                </div>
         </div>
    </div>
    )
}

export default Userlist;
