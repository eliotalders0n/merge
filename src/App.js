import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// User Interface
import Feed from "./components/feed";
import Profile from "./components/profile";
import Explore from "./components/map";
// import Help from "./components/help";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        {/* <Route path="/help" element={<Help />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
