import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// User Interface
import Feed from "./components/feed";
import Profile from "./components/profile";
import Explore from "./components/map";
import Chat from "./components/chat";
import ChatConvo from "./components/chatConvo";

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatConvo/:id" element={<ChatConvo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
