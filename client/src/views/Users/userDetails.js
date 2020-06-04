import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import swal from 'sweetalert';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './userDetails.css'

import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function UserDetails(props) {
    
    const location = useLocation();
    let history = useHistory()
    const oldUsername=location.state.detail;
    const [email,setNewEmail]=useState("")
    const [first_name,setNewFirstname]=useState("")
    const [last_name,setNewLastName]=useState("")
    const [newUsername,setNewUsername]= useState("")
    const [password,setNewPassword]=useState("")

    const classes = useStyles();
    const { ...rest } = props;
    var username=oldUsername;
    function handleChanges(){
        if(newUsername){
            username=newUsername

        }
        axios.post("/users/login/update/"+oldUsername,{username,email,first_name,last_name,password})
            .then(res=> res.data.success?
                (swal("Your account is successfully updated!"),
                history.push({pathname:'/user/dashboard', state:{detail:username}}))
                :alert("Chosen email/username is taken."));
    }

    function handleCancelation(){

      history.push({pathname:'/users/dashboard', state:{detail:username}});
    }

    function handleDeletion(){
        swal({
            text: "Are you sure you would like to delete your account?\n This action can't be reversed.",
            icon: "warning",
            buttons: {
                cancel :"No, take me back!",
                delete:  {
                    text:"Yes, I'm sure!",
                    value:"delete"
                },
            },
        })
        .then((value)=>{
            if(value=== "delete"){
                axios.get("/users/delete/"+oldUsername)
                    .then(res=>res.data.success?

                        (console.log(history)
                        ,swal("Your account was successfully deleted.",{icon:"success"}),
                        history.push('/')):
                        swal("An Error occured!\nPlease try again."));
                   
                }
                
            }
        )
    }
        
    

    const handleEmail = (event) => {
        setNewEmail(event.target.value);
    };
    const handleFirstname = (event) => {
        setNewFirstname(event.target.value);
    };
    const handleLastName = (event) => {
        setNewLastName(event.target.value);

    };

    const handleUsername = (event) => {
        setNewUsername(event.target.value);

    };

    const handlePassword = (event) => {
        setNewPassword(event.target.value);
    };

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
            <Parallax small filter image={require("assets/img/userdashboard.png")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    
                    <div className={classes.container}>
                        <div class='container'>
                            <div class="heading">
                                Fill details to be changed
                            </div>



                            <GridContainer justify="center" >

                                <Grid item xs={5} justify="center">
                                    <div class='container'>
                                        <CustomInput
                                            labelText="New Email"
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
                                            labelText="New First Name"
                                            id="newfirstname"
                                            value={first_name}
                                            formControlProps={{
                                                fullWidth: true,onChange: (event)=>handleFirstname(event)
                                            }}
                                            inputProps={{
                                                type: "username",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon fontSize='small'/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            
                                        />

                                        <CustomInput
                                            labelText="New Last Name"
                                            id="newlastname"
                                            value={last_name}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleLastName(event)
                                            }}
                                            inputProps={{
                                                type: "username",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon fontSize='small'/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            
                                        />

                                        <CustomInput
                                            labelText="New Username"
                                            id="username"
                                            value={newUsername}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleUsername(event)
                                            }}
                                            inputProps={{
                                                type: "username",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AccountCircleIcon fontSize='small'/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            
                                        />
                                        <CustomInput
                                            labelText="New Password"
                                            id="password"
                                            value={password}
                                            formControlProps={{

                                                fullWidth: true,
                                                onChange: (event)=>handlePassword(event)
                                            }}
                                            inputProps={{
                                                type: "username",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKeyIcon fontSize='small'/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            

                                        />
                                        
                                        </div>

                                     
                                       
                                       
                                      <div id='button'style={{backgroundColor:"rgb(175, 173, 170)", float:"left"}} >
                                            <Button simple size="sm"  onClick={()=>handleCancelation()}>
                                              <div class="cancel">
                                                Cancel
                                              </div>
                                            </Button>
                                        </div>
                                        
                                        
                                        <div id='button' style={{backgroundColor:"antiquewhite", float:"right"}}>
                                              <Button simple color="danger" size="sm" onClick={()=>handleChanges()}>
                                                <div class="buttonFiller">
                                                    Confirm Changes
                                                </div>
                                              </Button>
                                        </div>

                                        


                                        <div id='deletebutton' style={{backgroundColor:"white"}} >
                                          <Button simple size="sm" onClick={()=>handleDeletion()}>
                                                <div class="delete">
                                                    Delete Account
                                                </div>
                                            </Button> 
                                        </div>
                                        
                                </Grid>

                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
