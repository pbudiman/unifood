
import React, {useState, useEffect } from "react";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {useHistory} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

//icons
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import swal from 'sweetalert';

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

export default function OrganiserViewForms(props) {

    let history = useHistory();
    const location = useLocation();
    const id = location.state.id;
    const organisation_name = location.state.orgName;
    const email_add = location.state.email_add;
    const classes = useStyles();
    const { ...rest } = props;
    const [forms, setForms] = useState([]);

    useEffect(() => {
        axios.get("/forms/formList/"+email_add)
            .then(res => {
                setForms(res.data);
            })
            .catch(err => {
                swal("Error! Please try again!");
            })
    });

    // Redirect to other pages
    const deleteForm = () =>{
        let path = '/delete-form';
        history.push(path, {orgName:organisation_name, email_add:email_add});
    }
    const organiserHome = ()=> {
        history.push('/organiser/home',
        {
            id:id,
            orgName:organisation_name,
            email_add:email_add
        })
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
                                {organisation_name}'s Listings
                                <br></br>
                            </div>
                        </div>

                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>

                                <GridItem container justify="center">
                                    <strong><h4>Your email is {email_add}</h4></strong>
                                </GridItem>

                                {forms.reverse().map(res=>(
                                    <div>
                                        <div key={res.id}>
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12} md={50} className={classes.center}>
                                                    <Card className={classes.root} width={1/2}>
                                                        <CardContent>
                                                            <div className='label'>
                                                                <h4>{res.name}</h4>
                                                            </div>
                                                            <h5>{res.description}</h5>
                                                            <h6>ID: {res._id}</h6>
                                                            <h6>Time: {res.time}</h6>
                                                            <h6>Location: {res.address}</h6>
                                                            <h6>Quantity: {res.quantity}</h6>
                                                            <h6>latitude: {res.latitude.toFixed(4)} longitude: {res.longitude.toFixed(4)}</h6>

                                                        </CardContent>

                                                        <GridItem container justify="center">
                                                        <CardActions>
                                                            <Button
                                                                size="small"
                                                                formID= {res._id}
                                                                onClick=
                                                                {
                                                                    ()=>history.push('/update-form', 
                                                                        {
                                                                            // Use the particular form id
                                                                            id: res._id,
                                                                            orgName:organisation_name,
                                                                            email_add:email_add
                                                                        })
                                                                }
                                                                class="inline">
                                                                Update
                                                            </Button>

                                                            <Button
                                                                size="small"
                                                                formID= {res._id}
                                                                onClick={deleteForm}
                                                                class="inline">
                                                                Delete
                                                            </Button>
                                                        </CardActions>
                                                        </GridItem>
                                                    </Card>
                                                </GridItem>
                                            </GridContainer>
                                        </div>
                                        <br/>
                                    </div>
                                ))}


                                <GridItem container justify="center">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        target="_blank"
                                        startIcon={<KeyboardReturnIcon />}
                                        onClick={organiserHome}
                                        round
                                    >
                                        <strong>Back</strong>
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














