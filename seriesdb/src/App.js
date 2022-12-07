import Homepage from './Pages/Homepagenew.js';
import Review from './Pages/Review.js';
import Login from './Pages/Login.js'
import Register from './Pages/Register.js'
import UserProfile from './Pages/UserProfile.js';
import SearchResult from './Pages/SearchResult.js';
import OnlineCont from './Pages/onlineCont.js';
import UserList from './Pages/UserList.js'
import Movies from './Pages/Movies.js';
import TVseries from './Pages/TVseries.js';
import ByGenre from './Pages/ByGenre.js'
import EpisodeList from './Pages/EpisodeList.js'
import './App.css';
import React from 'react';
// import OnlineContEdit from './Pages/onlineContEdit.js';
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
  // const [user,setUser] = useState();
  //   useEffect(() => {
  //     const loggedInUser = localStorage.getItem("users");
  //     if (loggedInUser) {
  //       const foundUser = JSON.parse(loggedInUser);
  //       setUser(foundUser);
  //     }
  //   }, []);
    // const id = window.location.pathname.split('/')
    // console.log(id.slice(2))
    return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
      <Route exact path="/movie" element={<Movies />}/>
      <Route path="/movie/:id" element={<OnlineCont />}/>
      <Route exact path="/tv" element={<TVseries />}/>
      <Route path="/tv/:id" element={<OnlineCont />}/>
      <Route path="/search/movie/:id" element={<SearchResult/>}/>
      <Route path="/search/tv/:id" element={<SearchResult/>}/>
      <Route exact path="/movie/:id/review" element={<Review/>}/>
      <Route exact path="/tv/:id/review" element={<Review/>}/>
      <Route exact path="/user/:id" element={<UserProfile />}/>
      <Route exact path="/user/:id/list" element={<UserList />}/>
      <Route exact path="/user/:id/:contid" element={<EpisodeList />}/>
      <Route path="/Genre" element={<ByGenre />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
