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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/unifood.png";

import {useHistory} from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import axios from 'axios';

import {Link} from 'react-router-dom';
import LoginAuth from '../../LoginAuth';
import swal from 'sweetalert';


const useStyles = makeStyles(styles);

export default function UserLogin(props) {
    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [email,setEmail]=useState("")
    const [first_name,setFirstname]=useState("")
    const [last_name,setLastName]=useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword]=useState("")


    function validateSignup(event){
        event.preventDefault();
      axios.post('/users/signUp',
          {username,email,password,first_name,last_name})
        .then(res => res.data.success?
            (LoginAuth.authenticate() ,
            history.push({pathname:"/user/dashboard", state:{detail:username}})):
            swal("Username/Email is already registed."))
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
      };
    const handleFirstname = (event) => {
        setFirstname(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    
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
                                        <h4>User Login</h4>
                                    </CardHeader>
                                    
                                    <CardBody>
                                      
                                        <CustomInput
                                                labelText="Email"
                                                id="email"
                                                value={email}
                                               

                                            
                                                formControlProps={{
                                                    fullWidth: true,
                                                    onChange: (event)=>handleEmail(event)

                                                }}
                                                inputProps={{
                                                    type: "username",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <EmailIcon fontSize='small'></EmailIcon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            
                                            />

                                            <CustomInput
                                                labelText="First Name"
                                                id="first name"
                                                value={first_name}
                                            
                                                formControlProps={{
                                                    fullWidth: true,
                                                    onChange: (event)=>handleFirstname(event)

                                                }}
                                                inputProps={{
                                                
                                                    type: "text",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PersonIcon fontSize='small' />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            
                                            />  
                                             <CustomInput
                                                labelText="Last Name"
                                                id="last name"
                                                value={last_name}
                                            
                                                formControlProps={{
                                                    fullWidth: true,
                                                    onChange: (event)=>handleLastName(event)

                                                }}
                                                inputProps={{
                                                
                                                    type: "text",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PersonIcon fontSize='small' />
                                                        </InputAdornment>
                                                    )
                                                }}
                                            
                                            />  
                                        

                                        <CustomInput
                                            labelText="Username"
                                            id="username"
                                            value={username}

                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleUsername(event)

                                            }}
                                            inputProps={{
                                              
                                                type: "username",
                                             
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AccountCircleIcon fontSize='small' />

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
                                                type: "password", 
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKeyIcon fontSize="small"></VpnKeyIcon>
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
                                            onClick={(event)=>validateSignup(event)}
                                            >
                                            Sign Up
                                        </Button>
                                        
                                        <Grid item>
                                            <Link to="/user/login" style={{ color: '#999999' }}>
                                                Already a member? Log in
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
