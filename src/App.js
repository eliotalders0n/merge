import React, {useState, useEffect} from 'react'
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// User Interface
import Router from './routes';
import LoginRoutes from './loginroutes';
// import Feed from "./components/feed";
// import Profile from "./components/profile";
// import Explore from "./components/map";
import firebase from './firebase'
// import Help from "./components/help";


const App = () => {
  const [state, setstate] = useState(false)  

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){         
       setstate(true)   
      }
      else{
        setstate(false)
      }
      
        })
  }, [state])

  return (
    <>
    {!state && <LoginRoutes />}     
      {state && <Router />}
      </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/" element={<Feed />} />
    //     <Route path="/feed" element={<Feed />} />
    //     <Route path="/profile" element={<Profile />} />
    //     <Route path="/explore" element={<Explore />} />
    //     {/* <Route path="/help" element={<Help />} /> */}
    //   </Routes>
    // </BrowserRouter>
  );
};

export default App;
