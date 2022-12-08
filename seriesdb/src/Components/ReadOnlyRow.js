import React  from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as falightStar } from '@fortawesome/free-regular-svg-icons'



const ReadOnlyRow = ({
    note, 
    userid,
    handleEditClick, 
    handleDeleteClick
  }) => {
                            return(
                            <tr className='max-h-20'>    
                                <td className='border-4'>
                                <img alt='404 not found' 
                                     src={`https://image.tmdb.org/t/p/w500${note?.ContPoster}`} 
                                     className='w-48 h-60'
                                />
                                </td >
                                <td className='w-80 text-center border-4'>
                                    <Link to={`/${note.ContType}/${note.Contid}`}><p className='text-blue-500 underline text-2xl break-all'>{note?.ContName}{console.log(note)}
                                    </p></Link>
                                </td>
                                <td className='border-4'>
                                    <p className='text-center' >{note.ContType}
                                    </p>
                                </td>
                                <td className='border-4 w-36'>
                                    <p className=' text-center w-36'>{note.Status}
                                    </p>
                                </td>
                                <td className='border-4'>
                                    <p className=' text-center'>{note.EPseen}
                                    </p>
                                </td>
                                <td className='border-4'>
                                    <p className='text-center'>{note.UserScore}
                                    </p>
                                </td>
                                <td className='border-4'>
                                    <p className='text-center w-64 break-all'>{note.Note}
                                    </p>
                                </td>
                                {note.isFavourite ? <td className='border-4'>
                                    <p className='text-center'>
                                        <FontAwesomeIcon icon={faStar} />
                                    </p>
                                </td> : <td className='border-4'>
                                    <p className='text-center'>
                                        <FontAwesomeIcon icon={falightStar} />
                                    </p>
                                </td>}
                                <td className='border-4 w-36 text-center'>
                                <button
                                        onClick={(event) => handleEditClick(event, note)}
                                        className='text-blue-500 border-2 px-2 py-1 border-blue-400 bg-white rounded-lg'
                                        >Edit
                                    </button>
                                    <button
                                        onClick={(event) => handleDeleteClick(note._id)}
                                        className='text-red-500 border-2 px-2 py-1 border-red-400 bg-white ml-4 rounded-lg'
                                        >Delete
                                    </button>
                                    {(note.ContType === "tv") ? 
                                    <Link to={`/user/${userid}/${note.Contid}`}>
                                    <button className='text-blue-500 underline border-2 px-2 py-1 mt-2 border-blue-400 bg-white rounded-lg' onClick={()=>{localStorage.setItem('Contid',note?.Contid); localStorage.setItem('contenttype',note?.ContType)}}>
                                        EpisodeNote
                                    </button></Link> : ""}
                                </td>
                                </tr>                        
                    )}

export default ReadOnlyRow;

