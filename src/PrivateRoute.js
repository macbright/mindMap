import React from 'react'
import {  Navigate, Outlet  } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('jwt') !== null ? true : false;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   )
}

export default PrivateRoute