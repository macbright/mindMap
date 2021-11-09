import React from 'react';
import { Routes, Route } from "react-router-dom";

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import styles from './app.module.scss';


function App() {
  return (
    <div >
     <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
