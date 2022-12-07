import React, { Fragment , useState, useEffect} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FilterDropDown({current,handleFilterchange}) {
    const [Status,setStatus] = useState(current);
   
      useEffect(() => {
        let setLoading = true;
        if(setLoading){
            setStatus((prev)=>(current))
        }
           return() => {
            setLoading = false
       }
           }, [current]);
             
    return (
    <div className='text-center'>
      <p className='text-3xl'>Filter By:</p>
    <div className='flex justify-center'>
      <p className='text-2xl'> Type </p>
      <Menu as="div" className="relative text-left flex justify-center">
        <div>
          <Menu.Button className="ml-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {Status.type}
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
            <div>
            <Menu.Item >
                {({ active }) => (
                  <button name='type' value='all' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    all
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='type' value='movie' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Movie
                  </button>
                )}
              </Menu.Item>
              <Menu.Item >
                {({ active }) => (
                  <button name='type' value='tv' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    TV series
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <p className='text-2xl pl-10'> Status </p>
      <Menu as="div" className="relative text-left flex justify-center">
        <div>
          <Menu.Button className="ml-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {Status.contstatus}
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
            <div>
            <Menu.Item>
                {({ active }) => (
                  <button  name='contstatus' value='all' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    All
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='contstatus' value='PlantoWatch' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Plan to Watch
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='contstatus' value='Watching' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Watching
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='contstatus' value='Complete' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Complete
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='contstatus' value='Onhold' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
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
      {/* // array */}
      <p className='text-2xl  pl-10'> Favourite? </p>
      <Menu as="div" className="relative text-left flex justify-center">
        <div>
          <Menu.Button className="ml-1 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {Status.favourite}
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
            <div>
             <Menu.Item>
                {({ active }) => (
                  <button  name='favourite' value='all' onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    All
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='favourite' value={true} onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    Yes
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button  name='favourite' value={false} onClick={(e)=>{handleFilterchange(e);setStatus((prev)=>({...prev,[e.target.name]:e.target.value}))}}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )} 
                  >
                    No
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
    </div>
    )
  }
