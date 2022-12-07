import React, { useState,useContext} from 'react';
import NavBar from '../Components/NavBar.js';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from 'axios';

function Login() {
  const [Email, setEmail] = useState();
  const [password, setpassword] = useState();
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`http://localhost:4000/users/login`, {Email,password});
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(res.data)
      navigate(`/user/${res.data.details._id}`)
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data});
    }
  }

  return (
    <div className='bg-yellow-50 min-h-screen'>
     <NavBar/>
     <div className='text-center pt-20'>
     <form onSubmit={handleClick}>
        <div>
        <p className='text-5xl' >
            Login
        </p>
        <div className='flex flex-col items-center space-y-2 py-4'>
            <input type="text" className="h-10 w-96 p-4 focus:shadow focus:outline-none border-2" placeholder="Email"  value ={Email || ''} onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="h-10 w-96 p-4 focus:shadow focus:outline-none border-2" placeholder="Password" value ={password || ''} onChange={e => setpassword(e.target.value)}/>
            {error && <span>*{error.message}*</span>}
        <button disabled={loading} type="submit" className='border-2 bg-gray-100'>
            Login
        </button>
        <Link to='/Register'>
        <button disabled={loading} className='border-2 bg-gray-100'>
            Register
        </button>
        </Link>
        {/* <button className='border-2 bg-gray-100'>
            Forget Password
        </button> */}
    </div>
    </div>
    </form>
    </div>
    </div>
  )
}

export default Login;

  
