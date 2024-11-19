import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./Homepage/Homepage";
import Game from "./Game/Game";
import LoginPage from "./LoginPage/LoginPage";
import SignPage from "./SignPage/SignPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/> } />
        <Route path="/game" element={<Game/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signIn" element={<SignPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
