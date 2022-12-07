import React, { useState,useContext} from 'react';
import NavBar from '../Components/NavBar.js';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import axios from 'axios';

function Register(){
  const [UserName, SetUserName] = useState();
  const [Email, SetEmail] = useState();
  const [password, SetPassword] = useState();  
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
   e.preventDefault()
   dispatch({ type: "LOGIN_START" });
    try {
     const res = await axios.post("http://localhost:4000/users/register", {UserName,Email,password});
     dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
     navigate("/login");
    } catch (err) {
     dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  }
  
  return(
    <div>
        <NavBar />
        <div className='text-center pt-36 bg-yellow-50 min-h-screen'>
         <form onSubmit={handleClick}>
           <div className='flex flex-col items-center space-y-2 py-4'>
            <p className='text-4xl'>Register</p>
                <div className='relative'>
                  <body className="text-left">Email*</body>
                  <input type="email" className="h-10 w-96 p-4 focus:shadow focus:outline-none border-2" value={Email} onChange={(e) => SetEmail(e.target.value)} />
                </div> 
                <div className='relative'>
                  <body className="text-left">Username*</body>
                  <input type="text" className="h-10 w-96 p-4 focus:shadow focus:outline-none border-2" value={UserName} onChange={(e) => SetUserName(e.target.value)} />
                </div>
                <div className='relative'>
                  <body className="text-left">password*</body>
                  <input type="password" className="h-10 w-96 p-4 focus:shadow focus:outline-none border-2" value={password} onChange={(e) => SetPassword(e.target.value)} />
                </div>
                {error && <span>*{error.message}*</span>}
                <button type="submit" disabled={loading} className='border-2 bg-gray-100 text-3xl'>
                  <p className='p-2'>Register</p>
                </button>
             </div>
            </form>
          </div>
    </div>
  )}              

export default Register;
