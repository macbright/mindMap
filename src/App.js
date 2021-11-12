import React from 'react';
import { Routes, Route } from "react-router-dom";

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgetPassword from './components/Auth/ForgetPassword';
import Main from './components/documents/Main';
import UserProfile from './components/userProfile/User';
import PrivateRoute from './PrivateRoute';


import styles from './app.module.scss';


function App() {
  return (
    <div >
     <Routes>
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/password-recovery" element={<ForgetPassword />} />
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/recent-documents' element={<Main/>}/>
            <Route exact path='/user/:id' element={<Main/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
