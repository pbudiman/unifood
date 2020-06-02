import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import './orgupdate.css';
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
import GridItem from "../../components/Grid/GridItem";
import axios from 'axios';

import swal from 'sweetalert';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useLocation, useHistory } from "react-router-dom";

// import './organiser.css'
const useStyles = makeStyles(styles);
const endpoiupdate="http://localhost:5000";

export default function OrganiserUpdate(props) {

    let history = useHistory();
  const location = useLocation();
  const id=location.state.id;
  const organisation_name = location.state.orgName;
  const email_add = location.state.email_add;

    const [email,setEmail]= useState("")
    
    // console.log("IDDD: "+id);


    const classes = useStyles();
    const { ...rest } = props;

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    // const handleOfficerName = (event) => {
    //     setOfficerName(event.target.value);
    // };

    // const handleContactNumber = (event) => {
    //     setContactNumber(event.target.value);
    // };

    // const handleEmail = (event) => {
    //     console.log(email);
    //     setEmail(event.target.value);
    // };

    // const handlePassword = (event) => {
    //     setPassword(event.target.value);
    // };

    function deleteAccount(event){
        event.preventDefault();

        if (email_add == email){
            axios.get('/organisers/delete/'+id)
        .then(res => res.data.success?
            history.push('/'):
            alert("Fail to delete")
        ).catch();
        } else {
            alert("Wrong org name");
        }
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

            <Parallax small filter image={require("assets/img/userdashboard.png")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <div class='container'>
                                <div class="heading">
                                    {/* Enter your email to verify deletion */}
                                </div>
                            
                                <GridContainer justify="center">
                                <GridItem xs={10} sm={10} md={6}>

                                <GridItem container justify="center">
                            <strong><h3> Enter your email to verify deletion</h3></strong>
                                </GridItem>

                                        <CustomInput
                                            labelText="Email"
                                            id="email"
                                            value={email}
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleEmail(event)
                                              }}
                                            inputProps={{
                                                type: "email"
                                            //   endAdornment: (
                                            //       <InputAdornment position="end">
                                            //           <People className={classes.inputIconsColor} />
                                            //       </InputAdornment>
                                            //   )
                                        }}
                                        />
                                        <div style={{float:'right'}}>
                                            <Button
                                                variant="outlined"

                                                size="md"
                                                onClick={()=>{history.goBack()}}
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="danger"
                                                size="md"
                                                onClick={deleteAccount}
                                            >
                                                Delete Account
                                            </Button>

                                        </div>

                            </GridItem>
                        </GridContainer>
    
    </div>
    </div>
    </div>
    </div>
    <Footer />
    </div>
)
}