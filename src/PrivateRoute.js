import React from 'react';
import {  Navigate, Outlet  } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = () => {

  const isLoggedIn = localStorage.getItem('jwt') !== null ? true : false;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

}

PrivateRoute.propTypes = {
  rest: PropTypes.any,
  component: PropTypes.any,
};

export default PrivateRoute