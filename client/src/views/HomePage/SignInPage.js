import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import red from '@material-ui/core/colors/red';
import People from "@material-ui/icons/People";
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
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/unifood.png";

import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import LoginAuth from "../../LoginAuth"
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const useStyles = makeStyles(styles);

export default function SignInPage(props) {
    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;



    return (
        <div>
            <Header
                absolute
                color="danger"
                brand="UNIFOOD"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
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
                                        <h4>UNIFOOD</h4>
                                    </CardHeader>

                                    <CardBody>
                                        <GridItem container justify="center">


                                        <Link to={"/user/login"} className={classes.link}>

                                            <Button
                                                color="danger"
                                                size="lg"
                                                href="/user/login"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fas fa-play" />
                                                User Access
                                            </Button>
                                        </Link>

                                        <Link to={"/organisers/login"} className={classes.link}>
                                            <Button
                                                color="danger"
                                                size="lg"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fas fa-play" />
                                                Organiser Access
                                            </Button>
                                        </Link>

                                            <Button
                                                variant="contained"
                                                size="small"
                                                target="_blank"
                                                startIcon={<KeyboardReturnIcon />}
                                                onClick={() => {history.goBack()}}
                                                round
                                            >
                                                <strong>Back</strong>
                                            </Button>


                                        </GridItem>


                                    </CardBody>

                                </form>
                                <div style={{alignItems:'centre'}}>
                                </div>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}

