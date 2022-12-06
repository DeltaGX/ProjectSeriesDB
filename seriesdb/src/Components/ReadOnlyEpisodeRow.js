import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const ReadOnlyEpisodeRow = ({
    season,
    note, 
    handleEditClick, 
    handleDeleteClick
  }) => {
    
                            return(
                            <tr className='max-h-24'>    
                                <td className='text-center border-4'>
                                    <p className='text-center text-2xl'>{note.Episode}
                                    </p>
                                </td>
                                <td className='border-4 text-center'>
                                    {(note.isWatched===true) ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                                </td>
                                <td className='border-4'>
                                    <p className=' text-center'>{note.Episodescore}
                                    </p>
                                </td>
                                <td className='border-4 w-80'>
                                    <p className=' text-center break-all'>{note.Note}
                                    </p>
                                </td>
                                <td className='border-4 w-36 text-center'>
                                    <button
                                        onClick={(event) => handleEditClick(event, note, season)}
                                        className='text-blue-500 border-2 px-2 py-1 border-blue-400 bg-white rounded-lg'
                                        >Edit
                                    </button>
                                    <button
                                        onClick={(event) => handleDeleteClick(event, note, season)}
                                        className='text-red-500 border-2 px-2 py-1 border-red-400 bg-white ml-4 rounded-lg'
                                        >Delete
                                    </button>
                                </td>
                            </tr>                        
                    )}

export default ReadOnlyEpisodeRow;