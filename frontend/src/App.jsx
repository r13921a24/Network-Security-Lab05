import { useEffect, useState } from "react";
import "./App.css";
import Users from "./components/Users";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import services from "./services";
import Home from "./components/Home";

function App() {
  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<div>React Router Not Implement</div>} />
      </Routes>
    </div>
  );
}

export default App;
