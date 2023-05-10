import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// User Interface
import Feed from "./components/feed";
import Profile from "./components/profile";
import Explore from "./components/map";

function Router(props) {
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
}

export default Router;
