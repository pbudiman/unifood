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
import GridItem from "../../components/Grid/GridItem";
import axios from 'axios';
import swal from 'sweetalert';
import { useLocation, useHistory } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

export default function DeleteForm(props) {

    let history = useHistory();
    const location = useLocation();
    const organisation_name = location.state.orgName;
    const [formID,setFormID]= useState("")
    const classes = useStyles();
    const { ...rest } = props;

    const handleFormID = (event) => {
        setFormID(event.target.value);
    };

    function deleteForm(){
        // Gives warning
        swal({
            text: "Are you sure you would like to form with ID number: \n"
                +formID+
                "\n\n This action can't be reversed.",
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
                    // do deletion
                    if(value=== "delete"){
                        axios.post(
                            '/forms/deleteForm/',
                            {id:formID})
                            .then(res=>res.data.success?
                                swal("Form #"+formID+" successfully deleted",{icon:"success"}).then(history.goBack()):
                                swal("An Error occured!\nPlease check the form ID and try again."));

                    }

                }
            )
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

                            <div className='option'>
                                <div className='label'>
                                    Delete Form
                                    <br></br>
                                </div>
                            </div>

                            <GridContainer justify="center">
                                <GridItem xs={10} sm={10} md={15}>

                                    <GridItem container justify="center">
                                        <h4> {organisation_name}, please re-enter your form ID to confirm deletion.</h4>
                                    </GridItem>

                                    <CustomInput
                                        labelText="Form ID:"
                                        fullwidth
                                        id="formID"
                                        value={formID}
                                        formControlProps={{
                                            fullWidth: true,
                                            onChange: (event)=>handleFormID(event)

                                        }}
                                        inputProps={{
                                            type: "text",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <DeleteForeverIcon className={classes.inputIconsColor} />
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
                                            onClick={deleteForm}
                                        >
                                            Delete Form
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