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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/unifood.png";

import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'

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

    function validateLogin(){

      axios.post('/users/login',{username,password})
        .then(res => res.data.success? history.push({pathname:"/userdashboard",state:{detail:username}}): alert("Incorrect username/ password.\nPlease Try again"))
    }

    
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
                                        <h4>Login</h4>
                                    </CardHeader>
                                  
                                    <CardBody>
                                      
                                        

                                        <CustomInput
                                            labelText="Username"
                                            id="username"
                                            value={username}
                                            // onChange={ (event)=>handleUsername(event)}

                                           
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleUsername(event)

                                            }}
                                            inputProps={{
                                              
                                                type: "username",
                                                // onChange: (event)=>handleUsername(event),
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
                                            // onChange={ (event)=>handlePassword(event)}
                                            
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handlePassword(event)
                                        
                                            }}
                                            inputProps={{
                                              // onChange: (event)=>handlePassword(event),
                  
                                                type: "password", 
                                                
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>

                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                    
                                            
                                        />
                                        
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="danger" size="lg" onClick={()=>validateLogin()}>
                                            Log in
                                        </Button>
                                        <br/>
                                        <Link to='/usersignup' > Create an account </Link>
                                        
                                    </CardFooter>
                            
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
