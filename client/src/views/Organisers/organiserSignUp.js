import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TextField from "material-ui-core/TextField";

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';


import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/unifood.png";

import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles(styles);

export default function OrganiserSignup(props) {

    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [organiserName,setOrganiserName]= useState("")
    const [officerName,setOfficerName]=useState("")
    const [contactNumber,setContactNumber]= useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]= useState("")

    function validateSignUp(ev){
        // prevent from automatically submit
        ev.preventDefault();
        // Do post method to sign up through API
        if (!(organiserName && officerName && contactNumber && email && password)) {
            swal("You have not filled the entire form.");
        }
        else {
            axios.post(
                '/organisers/signup',
                {
                    organisation_name: organiserName,
                    officer_name: officerName,
                    contact_number: contactNumber,
                    email: email,
                    password: password})
                .then(res => {
                    // posting success
                    if (res.data.success){
                        swal("Account created!\n Please log in");
                        history.push('/organiser/login');
                    } else {
                        swal("Signing up failed. \n The email has been used");
                    }
                }).catch();
        }
    }

    // Handle changes from the input
    const handleOrganisationName = (event) => {
        setOrganiserName(event.target.value);
    };
    const handleOfficerName = (event) => {
        setOfficerName(event.target.value);
    };
    const handleContactNumber = (event) => {
        setContactNumber(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="UNIFOOD"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style=
                {{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes[cardAnimaton]}>
                            <form className={classes.form}>
                                <CardHeader color="danger" className={classes.cardHeader}>
                                    <h4>Organiser Sign Up</h4>
                                </CardHeader>

                                <CardBody>

                                    <TextField
                                        id="standard-full-width"
                                        label="Organisation Name"
                                        style={{ margin: 8 }}
                                        type="text"
                                        placeholder="Hungers Association"
                                        fullWidth
                                        required
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleOrganisationName}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                < People/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        id="standard-full-width"
                                        label="Officer Name"
                                        style={{ margin: 8 }}
                                        placeholder="Name"
                                        type="text"
                                        required
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleOfficerName}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                < PersonIcon/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        id="standard-full-width"
                                        label="Contact Number"
                                        style={{ margin: 8 }}
                                        placeholder="411000222"
                                        fullWidth
                                        required
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleContactNumber}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                < ContactPhoneIcon/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        id="standard-full-width"
                                        label="Email"
                                        type={"email"}
                                        style={{ margin: 8 }}
                                        placeholder="admin@organisation.com"
                                        required
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleEmail}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                < EmailIcon/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        id="standard-full-width"
                                        label="Password"
                                        type="password"
                                        style={{ margin: 8 }}
                                        placeholder="Password"
                                        fullWidth
                                        required
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handlePassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                < VpnKeyIcon/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        color="danger"
                                        onClick={validateSignUp}
                                        className={classes.submit}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid item>
                                            <Link href="/organiser/login" style={{ color: '#999999' }}>
                                                {"Already have an account? Log in"}
                                            </Link>
                                    </Grid>
                                </CardBody>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer whiteFont />
        </div>
        </div>
    );
}
