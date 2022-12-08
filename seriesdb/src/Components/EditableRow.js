import React from "react";
import StatusDrop from "./newStatusDropDown.js";
import {Link} from "react-router-dom";

 const EditableRow = ({
    note,
    userid,
    handleChange,
    handleCheckboxChange,
    handleSave,
    handleCancel,
  }) => {
        return(
        <tr className='h-32'>    
                <td className='border-4'>
                <img alt='404 not found' 
                        src={`https://image.tmdb.org/t/p/w500${note?.ContPoster}`} 
                        className='w-48 h-60'
                />
                </td >
                <td className='w-80 text-center border-4'>
                    <Link to={`/${note.ContType}/${note.Contid}` }><p className='text-blue-500 underline text-2xl break-all'>{note?.ContName}{console.log(note)}
                    </p></Link>
                </td>
                <td className='border-4'>
                    <p className='text-center' >{note.ContType}
                    </p>
                </td>
                <td className='border-4'>
                    <StatusDrop current={note?.Status} handlechange={handleChange} ></StatusDrop>
                </td>
            
                <td className='border-4 text-center'>
                    <div className="">
                        <input name="EPseen" type='number' className='w-10 text-center' 
                            defaultValue={note?.EPseen} 
                            min="1"
                            onChange={handleChange} 
                            onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}
                        />
                    </div>
                </td>
                <td className='border-4 text-center'>
                    <div >
                        <input name="UserScore" type='number' className='text-center' 
                            defaultValue={note?.UserScore} min="0" max="10" 
                            onChange={handleChange} 
                            onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}
                        />
                    </div>
                </td>
                <td className='border-4'>
                    <div >
                        <textarea name="Note" defaultValue={note?.Note} className='overflow-auto border-2 w-64' 
                            onChange={handleChange}>
                    </textarea>
                    </div>
                </td>
                {/* {note.isFavourite ? 
                    <td className='border-4 text-center'>
                        <button name='isFavourite' value='false' onClick={handleChange}>
                            <FontAwesomeIcon  icon={faStar} />
                        </button>
                    </td> 
                    : <td className='border-4 text-center'>
                            <button name='isFavourite' value='true' onClick={handleChange}>
                                <FontAwesomeIcon  icon={falightStar} />
                            </button>
                    </td>} */}
                <td className='border-4 text-center'>
                    <input 
                        name="isFavourite" 
                        type="checkbox" 
                        className='text-center'
                        defaultChecked={note.isFavourite}
                        onChange={handleCheckboxChange}
                    />
                </td>
                <td className='border-4 w-36 text-center'>
                    <button onClick={handleSave} className='text-blue-500 border-2 px-2 py-1 border-blue-400 bg-white rounded-lg'  >
                        SaveEdit
                    </button><br/>
                    <button 
                    onClick={handleCancel}
                    className='text-red-500 border-2 px-2 py-1 border-red-400 bg-white rounded-lg mt-2'
                    >
                        Cancel
                    </button>
                </td>
            </tr>                        
    )}

export default EditableRow;

