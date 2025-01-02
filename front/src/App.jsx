import './App.css'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import Game from "./pages/Game";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignPage from "./pages/SignPage/SignPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { AuthProvider } from "../src/Contexts/AuthContext";
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
