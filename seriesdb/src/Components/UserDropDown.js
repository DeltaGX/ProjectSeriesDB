import {useContext, useState, useEffect} from 'react';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function UserDropDown(user) {
    const [User,setUser] = useState({});
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async (e) => {
      e.preventDefault(); 
      dispatch({ type: "LOGOUT"});
      navigate('/')
    }
    
    useEffect(()=>{
      let isLoading = true
      if(isLoading == true && user != undefined){
        setUser((prev) => (user))
        console.log(User)
      }
      return() => {
        isLoading = false
      }
      },[]);

    return (
      <Menu as="div" className="relative inline-block text-center">
        <div>
          <Menu.Button className="ml-10 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            User:{User?.user?.UserName}
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-fit  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    // onClick={navigate(`localhost:3000/user/${User?.user?._id}`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  ><Link to={`/user/${User?.user?._id}`}>
                    YourProfile
                  </Link>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  // onClick={navigate(`localhost:3000/user/${User?.user?._id}/list`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm'
                    )}
                  >
                    <Link to={`/user/${User?.user?._id}/list`}>
                      YourList
                    </Link>
                  </button>
                )}
              </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick = {logout}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-sm'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }