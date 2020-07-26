import React, {useState} from "react";
import { useLocation, useHistory } from "react-router-dom";

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
import GridItem from "../../components/Grid/GridItem";
import axios from 'axios';
import swal from 'sweetalert';
import EmailIcon from '@material-ui/icons/Email';

// Using template UI from Material UI
const useStyles = makeStyles(styles);

export default function OrganiserDelete(props) {

    let history = useHistory();
    const location = useLocation();
    const id=location.state.id;
    const email_add = location.state.email_add;
    const orgName = location.state.orgName;
    const [email,setEmail]= useState("")
    // Use existed design
    const classes = useStyles();
    const { ...rest } = props;

    function deleteAccount(event){
        event.preventDefault();
        // Confirm deletion
        if (email_add === email){
            axios.get('/organisers/delete/'+id)
            // delete success
            .then(res => res.data.success?
            swal(orgName+" account is deleted successfully.",{icon:"success"})
            .then(history.push('/')):
            // Failed to delete
            swal("Failed to delete the account. \nPlease try again."));
        } else {
            swal("The email you entered was incorrect.");
        }
    }

    // Handle email changes from input
    const handleEmail = (event) => {
        setEmail(event.target.value);
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
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                )
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