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

import './organiser.css'
const useStyles = makeStyles(styles);
const endpoiupdate="http://localhost:5000";

export default function OrganiserUpdate(props) {

    let history = useHistory();
    const location = useLocation();
    const id=location.state.id;
    const organisation_name = location.state.orgName;
    const [email,setEmail]= useState("")
    const [password,setPassword]=useState("")
    const [contactNumber,setContactNumber]= useState("")
    const [officerName,setOfficerName]=useState("")
    const [organiserName,setOrganiserName]= useState("")
    
    console.log("IDDD: "+id);


    const classes = useStyles();
    const { ...rest } = props;

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
        console.log(email);
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    function updateAccount(event){
        event.preventDefault();
        axios.post('/organisers/backend/update/'+id,
        {
            organisation_name: organiserName,
            officer_name: officerName,
            contact_number: contactNumber,
            email: email,
            password: password
        })
        .then(res => res.data.success?
            history.push({
                pathname:'/organisers/home',
                state:
                {
                    orgName:res.data.organiser.organisation_name,
                    id:res.data.organiser._id,
                    organiser: res.data.organiser
                }
            }):
            alert("Fail to update")
        ).catch();
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
                                {/* <div class="heading">
                                    Update Account
                                </div> */}

                            
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>

                                <GridItem container justify="center">
                            <strong><h3>Update {organisation_name} Account</h3></strong>
                                </GridItem>

                                <CustomInput
                                            labelText="Organiser Name"
                                            id="organisationName"
                                            value={organiserName}
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleOrganisationName(event)
                                              }}
                                            inputProps={{
                                                type: "text"
                                            //   endAdornment: (
                                            //       <InputAdornment position="end">
                                            //           <People className={classes.inputIconsColor} />
                                            //       </InputAdornment>
                                            //   )
                                        }}
                                        />
                                        <CustomInput
                                            labelText={"Officer Name"}
                                            id="officerName"
                                            value={officerName}
                                            variant="outlined"
                                            formControlProps={{fullWidth: true,
                                            onChange: (event)=>handleOfficerName(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                                // endAdornment: (
                                                //     <InputAdornment position="end">
                                                //         <EmailIcon className={classes.inputIconsColor} />
                                                //     </InputAdornment>
                                                // )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Contact Number"
                                            id="contactNumber"
                                            value={contactNumber}
                                            variant="outlined"
                                            formControlProps={{fullWidth: true,
                                            onChange: (event)=>handleContactNumber(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                                // endAdornment: (
                                                //     <InputAdornment position="end">
                                                //         <EmailIcon className={classes.inputIconsColor} />
                                                //     </InputAdornment>
                                                // )
                                            }}
                                        />
                                        <CustomInput
                                            labelText={"Email"}
                                            id="email"
                                            value={email}
                                            variant="outlined"
                                            formControlProps={{fullWidth: true,
                                            onChange: (event)=>handleEmail(event)
                                            }}
                                            inputProps={{
                                                type: "email",
                                                // endAdornment: (
                                                //     <InputAdornment position="end">
                                                //         <EmailIcon className={classes.inputIconsColor} />
                                                //     </InputAdornment>
                                                // )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            value={password}
                                            variant="outlined"
                                            formControlProps={{fullWidth: true,
                                            onChange: (event)=>handlePassword(event)
                                            }}
                                            inputProps={{

                                                type: "password",
                                                // endAdornment: (
                                                //     <InputAdornment position="end">
                                                //         <EmailIcon className={classes.inputIconsColor} />
                                                //     </InputAdornment>
                                                // )
                                            }}
                                        />

                                        <div>
                                            <Button
                                                // className='updateButton'
                                                variant="outlined"
                                                color="primary"
                                                size="sm"
                                                onClick={()=>history.goBack()}
                                            >
                                                Cancel
                                            </Button>
                                 
                                            <Button
                                                variant="outlined"
                                                color="danger"
                                                size="sm"
                                                onClick={updateAccount}
                                            >
                                                Update Account
                                            </Button>
                                        </div>

                                {/* <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    color="danger"
                                    target="_blank"
                                    startIcon={<AddIcon />}
                                    onClick={postForm}
                                    round
                                >
                                    <h5><strong>Post New Form</strong></h5>
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    color="danger"
                                    target="_blank"
                                    startIcon={<ClearAllIcon />}
                                    onClick={viewForms}
                                    round
                                >
                                    <h5><strong>View My Forms</strong></h5>
                                </Button>


                                <GridItem container justify="center">
                                    <strong><h3>Account Management</h3></strong>
                                </GridItem>


                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    target="_blank"
                                    startIcon={<UpdateIcon />}
                                    onClick={updateAccount}
                                >
                                    <strong>Update Account</strong>
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    target="_blank"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteAccount}
                                >
                                    <strong>Delete Account</strong>
                                </Button>


                                <GridItem container justify="center">
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
                                </GridItem> */}

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


