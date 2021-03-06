
import React from "react";
import {useHistory, useLocation} from 'react-router-dom';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";

//icons
import UpdateIcon from '@material-ui/icons/Update';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import LoginAuth from '../../LoginAuth';

// Using UI template from Material UI
const useStyles = makeStyles(styles);

export default function OrganiserHomePage(props) {

    let history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const organisation_name = location.state.orgName;
    const email_add = location.state.email_add;

    const classes = useStyles();
    const { ...rest } = props;

    // Handle changes from input
    const updateAccount = () => {
        let path = '/organiser/account/update';
        history.push(path, {id:id, orgName: organisation_name, email_add:email_add});
        console.log('id: '+id);
    }
    const deleteAccount = () => {
        let path = '/organiser/account/delete';
        history.push(path, {id:id, orgName:organisation_name, email_add:email_add});
    }
    const postForm = () =>{
        let path = '/post-new-form';
        history.push(path, {id:id, orgName:organisation_name, email_add:email_add});
    }
    const viewForms = () => {
        let path = '/organiser/forms';
        history.push(path, {id:id, orgName:organisation_name, email_add:email_add});
    }

    function handleLogout(){
        console.log("Organiser: "+organisation_name+" is logged out!")
        LoginAuth.signout();
        history.push("/")
    }

    return (
        <div>
            <Header
                color="transparent"
                brand="UNIFOOD"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter image={require("assets/img/aboutus-bg.png")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.container}>
                        <div className='option'>
                            <div className='label'>
                                Welcome {organisation_name}
                                <br></br>
                            </div>
                        </div>

                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>

                                <GridItem container justify="center">
                                    <strong><h3>Form Management</h3></strong>
                                </GridItem>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="lg"
                                    color="danger"
                                    target="_blank"
                                    startIcon={<AddIcon />}
                                    onClick={postForm}
                                    round
                                >
                                    <h5><strong>Post New Listing</strong></h5>
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="lg"
                                    color="danger"
                                    target="_blank"
                                    startIcon={<ClearAllIcon />}
                                    onClick={viewForms}
                                    round
                                >
                                    <h5><strong>View My Listings</strong></h5>
                                </Button>

                                <GridItem container justify="center">
                                    <strong><h3>Account Management</h3></strong>
                                </GridItem>

                                <Button
                                    variant="contained"
                                    fullWidth

                                    color="default"
                                    size="lg"

                                    target="_blank"
                                    startIcon={<UpdateIcon />}
                                    onClick={updateAccount}
                                >
                                    <strong>Update Account</strong>
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="default"
                                    size="lg"
                                    target="_blank"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteAccount}
                                >
                                    <strong>Delete Account</strong>
                                </Button>

                                <GridItem container justify="center">
                                <Button
                                    variant="contained"
                                    size="sm"
                                    target="_blank"
                                    startIcon={<KeyboardReturnIcon />}
                                    onClick={()=>handleLogout()}
                                    round
                                >
                                    <strong>Log out</strong>
                                </Button>
                                </GridItem>

                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}














