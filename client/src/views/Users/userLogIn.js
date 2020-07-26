import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/unifood.png";
// Icon
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import LoginAuth from "../../LoginAuth"

// Using template UI from Material-UI
const useStyles = makeStyles(styles);

export default function UserLogin(props) {
    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [username,setUsername]= useState("")
    const [password,setPassword]=useState("")

    function validateLogin(event){
        event.preventDefault();
        axios.post('/users/login',{username,password})
            .then(res => res.data.success? (
                LoginAuth.authenticate(),
                history.push({pathname:"/user/dashboard",state:{detail:username}}))
                : swal("Incorrect username/ password.\nPlease Try again"));
    }

    // handle changes from the input
    const handleUsername = (event) => {
      setUsername(event.target.value);
    };
    const handlePassword = (event) => {
      setPassword(event.target.value);
    };

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
                                        <h4>Login</h4>
                                    </CardHeader>

                                    <CardBody>
                                        <CustomInput
                                            labelText="Username"
                                            id="username"
                                            value={username}
                                            formControlProps=
                                            {{
                                                fullWidth: true,
                                                onChange: (event)=>handleUsername(event)
                                            }}
                                            inputProps=
                                            {{
                                                type: "username",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }} 
                                        />  
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            type="password"
                                            formControlProps=
                                            {{
                                                fullWidth: true,
                                                onChange: (event)=>handlePassword(event)
                                            }}
                                            inputProps=
                                            {{
                                                type: "password", 
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKeyIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            color="danger"
                                            className={classes.submit}
                                            onClick={(event)=>validateLogin(event)}
                                            >
                                            Log In
                                        </Button>
                                        
                                        <Grid item>
                                            <Link to="/user/signup" style={{ color: '#999999' }}>
                                                Don't have an account? Sign Up
                                             </Link>
                                        </Grid>
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