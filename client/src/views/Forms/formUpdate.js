import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import DescriptionIcon from '@material-ui/icons/Description';
import People from "@material-ui/icons/People";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EmailIcon from '@material-ui/icons/Email';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

// import './userDetails.css'

import { useLocation } from "react-router-dom";
import { useHistory }  from 'react-router-dom';
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";


//upload photo
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import swal from 'sweetalert';
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import LoginAuth from "../../LoginAuth";

const useStyles = makeStyles(styles);


export default function UpdateForm(props) {
    const location = useLocation();
    let history = useHistory()

    const email_add = location.state.email_add;
    const orgName = location.state.orgName;
    const email = email_add;
    const [id,setID]=useState("")
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [address,setAddress]=useState("")
    const [time,setTime]= useState("")
    const [quantity,setQuantity]=useState("")
    const [photo,setPhoto]=useState("")
    const [latitude,setLatitude]=useState(Number)
    const [longitude,setLongitude]=useState(Number)

    const classes = useStyles();
    const { ...rest } = props;


    function updateForm(){
        swal({
            text: "Are you sure you would like to update listing ID"
                +id+
                "\n\n This action can't be reversed.",
            icon: "info",
            buttons: {
                cancel :"No, return.",
                confirm:  {
                    text:"Yes, confirm update!",
                    value:"confirm"
                },
            },
        })
            .then((value)=>{
                    if(value=== "confirm"){
                        axios.post(
                            '/forms/updateForm',
                            {id,email,name,description,address,time,quantity,photo,latitude,longitude})
                            .then(res=>res.data.success?
                                swal("Form #"+id+" successfully updated",{icon:"success"}).then(history.goBack()):
                                swal("An Error occured!\nPlease check the form ID and try again."));

                    }

                }
            )
    }


    function getLocation(){
        swal({
            text:"Allow Unifood to access your location?",
            icon:"info",
            buttons:{
                cancel:"Decline",
                accept:{
                    text:"Accept",
                    value:"accept"
                },
            },
        }).then((value)=>{
            switch(value){
                case "accept":
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(position => {
                            setLatitude(position.coords.latitude);
                            setLongitude(position.coords.longitude);
                        });
                        console.log(latitude);
                        console.log(longitude);
                        swal("Location is successfully shared with Unifood!");
                        break;


                    } else {
                        swal("Geolocation is not supported in this browser!");
                    }
                default:
                    swal("Location is not shared with Unifood!")
            }

        })

    }

    const handleID = (event) => {
        setID(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };
    const handleAddress = (event) => {
        setAddress(event.target.value);
    };
    const handleTime = (event) => {
        setTime(event.target.value);
    };
    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };
    const handlePhoto = (event) => {
        setPhoto(event.target.value);
    };
    const handleLatitude = (event) => {
        setLatitude(event.target.value);
    };
    const handleLongitude = (event) => {
        setLongitude(event.target.value);
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
                                <strong><h3>{orgName}</h3></strong>
                                <br/>
                                Update Listing
                            </div>

                            <GridContainer justify="center" >
                                <Grid item xs={5} justify="center">
                                    <div class='container'>

                                        <CustomInput
                                            labelText="Listing ID*"
                                            id="id"
                                            value={id}
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleID(event)

                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ConfirmationNumberIcon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />



                                        <CustomInput
                                            labelText="Account Email*"
                                            id="email"
                                            value={email}
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,

                                            }}
                                            inputProps={{
                                                type: "text",
                                                defaultValue: email_add,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EmailIcon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Updated Organisation and Event Name*"
                                            id="name"
                                            value={name}
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleName(event)

                                            }}
                                            inputProps={{
                                                type: "text",
                                                defaultValue: orgName+": ",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />



                                        <CustomInput
                                            labelText="Updated Description of Food and Event*"
                                            id="description"
                                            value={description}
                                            multiline
                                            rowsMax={4}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleDescription(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                                multiline: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <FastfoodIcon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />



                                        <CustomInput
                                            labelText="Updated Location*"
                                            fullwidth
                                            id="address"
                                            value={address}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleAddress(event)

                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LocationOnIcon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />


                                        <GridItem container justify="center">
                                            <Button
                                                primary
                                                size="small"
                                                onClick={getLocation}
                                            >
                                                share my coordinates
                                            </Button>
                                        </GridItem>


                                        <CustomInput
                                            labelText=""
                                            id="time"
                                            value={time}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleTime(event)
                                            }}
                                            inputProps={{
                                                type: "datetime-local"
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Updated Quantity of Food Available"
                                            id="quantity"
                                            value={quantity}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleQuantity(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <DescriptionIcon className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                        <CustomInput
                                            accept="image/*"
                                            labelText="Photo"
                                            id="photo"
                                            value={photo}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handlePhoto(event)
                                            }}
                                            inputProps={{
                                                type: "file",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PhotoCamera className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />



                                        {/* <CustomInput
                                            labelText="Latitude"
                                            id="latitude"
                                            value={latitude}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleLatitude(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                            }}
                                        />

                                        <CustomInput
                                            labelText="Longitude"
                                            id="longitude"
                                            value={longitude}
                                            formControlProps={{
                                                fullWidth: true,
                                                onChange: (event)=>handleLongitude(event)
                                            }}
                                            inputProps={{
                                                type: "text",
                                            }} */}


                                        <CardFooter className={classes.cardFooter} style={{justifyContent: 'center'}}>
                                            <Button variant="outlined" color="danger" size="lg" onClick={()=>updateForm()}>
                                                Update Listing
                                            </Button>
                                        </CardFooter>


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
                                        </GridItem>


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
