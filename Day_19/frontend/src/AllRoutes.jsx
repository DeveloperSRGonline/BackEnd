// src/routes/AllRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import CreatePost from './components/CreatePost';
import Home from './pages/Home';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
  );
}

export default AllRoutes;
