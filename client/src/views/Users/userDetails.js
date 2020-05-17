import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";


import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";


import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import './userDetails.css'

import { useLocation } from "react-router-dom";
import { useHistory }  from 'react-router-dom';

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
    
    function handleChanges(){
      if(newUsername){
        var username=newUsername
  
      }else{
        username=oldUsername;
      }

      axios.post("/users/login/update/"+oldUsername,{username,email,first_name,last_name,password})
        .then(res=> res.data.success?history.push({pathname:'/userdashboard', state:{detail:username}}):alert("Chosen email/username is taken."));
    }

    function goBack(){
      history.push({pathname:'/userdashboard', state:{detail:oldUsername}})
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
                Fill details to be changed: 
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
                    <People className={classes.inputIconsColor} />
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
                  type: "text",                       
                  endAdornment: (
                    <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
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
                  type: "text",                       
                  endAdornment: (
                    <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
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
                    <People className={classes.inputIconsColor} />
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
                  type: "password",                       
                  endAdornment: (
                    <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                    </InputAdornment>
                    )
                  }} 
                  
                />
                
                      <button class='button' onClick={()=>goBack()}>
                          Revert changes
                      </button>
                      <button class='button' onClick={()=>handleChanges()}>
                          Make changes
                      </button>
                      
                     
                  
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
