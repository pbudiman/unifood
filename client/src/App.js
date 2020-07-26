import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// user pages
import UserLogin from "./views/Users/userLogIn";
import UserSignUp from './views/Users/userSignUp';
import UserDashboard from './views/Users/userHomePage';
import UserDetails from './views/Users/userDetails';
//organiser pages
import OrganiserLogin from "./views/Organisers/organiserLogIn";
import OrganiserSignup from "./views/Organisers/organiserSignUp";
import OrganiserHomePage from "./views/Organisers/organiserHomePage";
import OrganiserDelete from "./views/Organisers/organiserDelete";
import OrganiserUpdate from "./views/Organisers/organiserUpdateAccount";
import OrganiserViewForms from "./views/Organisers/organiserViewForms";
//forms pages
import PostNewForm from "./views/Forms/formCreateNew";
import ViewAllForms from "./views/Forms/formViewAll";
import DeleteForm from "./views/Forms/formDelete";
import UpdateForm from "./views/Forms/formUpdate";

//Home pages
import AboutUs from "./views/HomePage/aboutUs";
import HomePage from "./views/HomePage/HomePage";
import ProtectedRoute from './protectedRoutes';
import SignInPage from "./views/HomePage/SignInPage";

var hist = createBrowserHistory();


export default function App(){

        return(
        <Router history={hist}>
            <div className="App">
            <Switch>
                <ProtectedRoute path="/user/details"  component={UserDetails} />
                <ProtectedRoute path="/user/dashboard"  component={UserDashboard} />
                <Route path="/user/signup" component={UserSignUp} />
                <Route path="/user/login" component={UserLogin} />
                
                <ProtectedRoute path="/organiser/home" component={OrganiserHomePage} />
                <ProtectedRoute path="/organiser/account/update" component={OrganiserUpdate} />
                <ProtectedRoute path="/organiser/account/delete" component={OrganiserDelete} />
                <Route path="/organiser/login" component={OrganiserLogin} />
                <Route path="/organiser/signup" component={OrganiserSignup} />

                <ProtectedRoute path="/organiser/forms" component={OrganiserViewForms} />
                <ProtectedRoute path="/all-listings" component={ViewAllForms} />
                <ProtectedRoute path="/post-new-form" component={PostNewForm} />
                <ProtectedRoute path="/delete-form" component={DeleteForm} />
                <ProtectedRoute path="/update-form" component={UpdateForm} />

                <Route path="/log-in" component={SignInPage} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/" component={HomePage} />
            </Switch>
            </div>
        </Router>
        );
    
}




