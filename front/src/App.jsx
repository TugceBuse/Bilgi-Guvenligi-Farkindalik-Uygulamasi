import './App.css'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import Game from "./pages/Game";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignPage from "./pages/SignPage/SignPage";
import { AuthProvider } from "../src/Contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signIn" element={<SignPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
