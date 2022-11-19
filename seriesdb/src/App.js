import Homepage from './Pages/Homepagenew.js';
import Login from './Pages/Login.js'
import Register from './Pages/Register.js'
import UserProfile from './Pages/UserProfile.js';
import SearchResult from './Pages/SearchResult.js';
import OnlineCont from './Pages/onlineCont.js';
// import Recommendation from './Pages/Recommendation.js'
import Endgame from './Pages/AvengerEndgame.js'
import Movies from './Pages/Movies.js';
import TVseries from './Pages/TVseries.js';
import ByGenre from './Pages/ByGenre.js'
import './App.css';
import React, {useEffect,useState} from 'react';
import OnlineContEdit from './Pages/onlineContEdit.js';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }
// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }


function App() {
  const [user,setUser] = useState();
    useEffect(() => {
      const loggedInUser = localStorage.getItem("users");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);
    // const id = window.location.pathname.split('/')
    // console.log(id.slice(2))
    return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
      {/* <Route path="/Recommendation" element={<Recommendation />}/> */}
      <Route exact path="/movie" element={<Movies />}/>
      <Route path="/movie/:id" element={<OnlineCont />}/>
      <Route path="/movie/:id/edit" element={<OnlineContEdit />}/>
      <Route exact path="/tv" element={<TVseries />}/>
      <Route path="/tv/:id" element={<OnlineCont />}/>
      <Route path="/tv/:id/edit" element={<OnlineContEdit/>}/>
      <Route path="/search/movie/:id" element={<SearchResult/>}/>
      <Route path="/search/tv/:id" element={<SearchResult/>}/>
      <Route path="/movie/AvengerEndgame" element={<Endgame/>}/>
      <Route path="/user/:id" element={<UserProfile />}/>
      <Route path="/Genre" element={<ByGenre />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
