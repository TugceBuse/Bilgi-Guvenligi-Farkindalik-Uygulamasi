import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./Homepage/Homepage";
import Desktop from "./Game/Desktop/Desktop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/> } />
        <Route path="/desktop" element={<Desktop/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
