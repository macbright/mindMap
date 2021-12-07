import React from 'react';
import { Routes, Route } from "react-router-dom";

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ForgetPassword from './components/Auth/ForgetPassword';
import Main from './components/documents/Main';
import MainCanvas from './components/canvas/MainCanvas';
import PrivateRoute from './PrivateRoute';


import styles from './app.module.scss';


function App() {
  return (
    <div className={styles.main}>
     <Routes>
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/password-recovery" element={<ForgetPassword />} />
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/recent-documents' element={<Main/>}/>
            <Route exact path='/user/:id' element={<Main/>}/>
            <Route exact path='/draw' element={<MainCanvas />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
