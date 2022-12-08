import React, { useState,useEffect,Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function Searchbar() {
    const [search, setSearch] = useState();
    const [type, settype] = useState();
    const navigate = useNavigate();
    
    const handleDropClick=async(e)=>{
        settype(e.target.value);
        localStorage.setItem('contenttype', type)
}
    const handleKeyDown = async (e) => {
        if (e.keyCode === 13) {
            handleClick();
        }
    }
    const handleClick = async (e) => {
        let searchtype = localStorage.getItem('contenttype')  
        if (searchtype === null) {
            searchtype = 'movie'
        }
        if (search !== undefined){
        localStorage.setItem('search',search)
        navigate(`/search/${searchtype}/${search}`)
        }
        }
        
    useEffect(() => {
        if ((localStorage.getItem('contenttype') !== type) && (type !== undefined)) {
            localStorage.setItem('contenttype', type)
        }}, [handleDropClick]);

    return(
        <div className='flex items-center font-mono'>
        <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button className="rounded-md ml-16 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {type ? type : "PleaseChooseType"}
            < FontAwesomeIcon icon={faChevronDown} className="mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item id='planbtn'>
                {({ active }) => (
                  <button  value='movie' onClick={handleDropClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Movies
                  </button>
                )}
              </Menu.Item>
              <Menu.Item >
                {({ active }) => (
                  <button value='tv' onClick={handleDropClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    TVSeries
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
        <div className="relative">
                <input type="text" className="h-14 w-96  pl-5 pr-8 rounded z-0 focus:shadow focus:outline-none" placeholder="Search by Content type" onChange={e => setSearch(e.target.value)}
                onKeyDown = {handleKeyDown}/>
                <FontAwesomeIcon className='fa-2x mt-2 ml-2 hover:bg-sky-700' id= "btnSearch" onClick={handleClick} icon={faMagnifyingGlass} />
                {/* <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500">test</i> </div> */}
        </div>
    </div>
        )}

export default Searchbar;
