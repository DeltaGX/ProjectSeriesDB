import React from "react";

 const EditableEpisodeRow = ({
    note,
    handleChange,
    handleCheckboxChange,
    handleSave,
    handleCancel,
  }) => {
        return(
        <tr className='max-h-36'>
                <td className='border-4'>
                    <p className='text-center text-2xl' >{note.Episode}
                    </p>
                </td>    
                <td className='border-4 text-center'>
                    <input 
                        id="isWatched" 
                        type="checkbox" 
                        className='text-center'
                        defaultChecked={note.isWatched}
                        onChange={handleCheckboxChange}
                    />
                </td>
                <td className='border-4 text-center'>
                    <div className="">
                    <input id="Episodescore" type='number' className='text-center' 
                            defaultValue={note?.Episodescore} min="0" max="10" 
                            onChange={handleChange} 
                            onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) {e.preventDefault()}}}
                        />
                    </div>
                </td>
                <td className='border-4'>
                    <div >
                        <textarea id="Note" defaultValue={note?.Note} className='overflow-auto border-2 w-80' 
                            onChange={handleChange}>
                    </textarea>
                    </div>
                </td>
            <td className='border-4 text-center'>
                <button onClick={handleSave} 
                    className='text-blue-500 border-2 px-2 py-1 border-blue-400 bg-white rounded-lg' 
                >
                    SaveEdit
                </button>
                <button 
                onClick={handleCancel}
                    className='text-red-500 border-2 px-2 py-1 border-red-400 bg-white rounded-lg mt-2'
                >
                    Cancel
                </button>
            </td>
            </tr>                        
    )}


export default EditableEpisodeRow;
