import React from 'react';
import { Routes, Route } from "react-router-dom";

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgetPassword from './components/Auth/ForgetPassword';
import Main from './components/documents/Main';


import styles from './app.module.scss';


function App() {
  return (
    <div >
     <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<ForgetPassword />} />
        <Route path="/recent-documents" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
