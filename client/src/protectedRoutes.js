import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginAuth from "./LoginAuth";
import swal from 'sweetalert';

const ProtectedRoute = ({ component: Component,loggedIn,path,...rest }) => {  

  return (
    <Route 
      path={path}
      {...rest}
      render={(props)=>{
        return LoginAuth.isAuthenticated?
          (<Component {...props}/>):
          (swal("Login/Sign up is reguired"),
          <Redirect to={{pathname:"/",}}/>);
      }}
    />
  );
};


export default ProtectedRoute;