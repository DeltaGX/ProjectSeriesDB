import React, { Fragment , useState, useEffect, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StatusDropDown({current,userid,contid}) {
    const [status,setstatus] = useState('');
    
    const handleClick=async(e)=>{
      setstatus(e.target.value);
      console.log(e.target.value)
      if (userid != undefined){
      try {
        const res = await axios.put(`http://localhost:4000/users/${userid}`, 
        {"Usernote":[
          {"Contid":contid,
           "Status":e.target.value}]}, {withCredentials:true})
        window.location.reload()
        console.log(res)
      } catch (err) {
        console.log(err);}
      }}

    return (
      <Menu as="div" className="relative text-left flex justify-center">
        <div>
          <Menu.Button className="ml-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {current}
            < FontAwesomeIcon icon={faChevronDown} className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                  <button  value='PlantoWatch' onClick={handleClick}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Plan to Watch
                  </button>
                )}
              </Menu.Item>
              <Menu.Item >
                {({ active }) => (
                  <button value='Watching' onClick={handleClick}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    Watching
                  </button>
                )}
              </Menu.Item>
              <Menu.Item id='holdbtn' onClick={handleClick}>
                {({ active }) => (
                  <button value='Complete' onClick={handleClick}
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    Complete
                  </button>
                )}
              </Menu.Item>
                <Menu.Item >
                  {({ active }) => (
                    <button id='Drpbtn' value='Onhold' onClick={handleClick}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-sm'
                      )}
                    >
                      Onhold
                    </button>
                  )}
                </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }
