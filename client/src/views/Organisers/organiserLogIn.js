import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/unifood.png";
import axios from 'axios';
import LoginAuth from '../../LoginAuth'
import swal from 'sweetalert';

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

export default function OrganiserLogin(props) {
    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")

    function validateLogin(event){
        event.preventDefault();
        axios.post('/organisers/logon',{email,password})
            .then(res => res.data.success? (
                    LoginAuth.authenticate(),
                        history.push(
                            {pathname:"/organiser/home",
                            state:
                                {
                                    orgName:res.data.organiser.organisation_name,
                                    id:res.data.organiser._id,
                                    email_add:res.data.organiser.email
                                }
                            }
                        )
            )
            : swal("Incorrect email or password.\nPlease try again."));
    }

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
                                        <h4>Organiser Login</h4>
                                    </CardHeader>

                                    <CardBody>
                                        <CustomInput
                                            labelText="Organiser Email"
                                            id="email"
                                            value={email}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleEmail(event)
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EmailIcon/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            value={password}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handlePassword(event)
                                            }}
                                            inputProps={{

                                                type: 'password',
                                                onChange: (event)=>handlePassword(event),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKeyIcon/>
                                                    </InputAdornment>
                                                )
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
                                            <Link href="/organiser/signup" style={{ color: '#999999' }}>
                                                {"Don't have an account? Sign Up"}
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