import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/unifood_logo.png";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

//card imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//form imports
import io from "socket.io-client";
var socket = io();

// Using UI template from material-UI
const useStyles = makeStyles(styles);

// display all forms
export default function ViewAllForms(props) {
    const [forms, setForms] = useState([]);
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    useEffect(()=>{
        // listen on incoming data
        socket.on("Forms", data=>setForms(data));
        console.log(forms)
    });

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
            <Parallax small filter image={require("assets/img/aboutus-bg.png")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>All Listings</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>

                        {forms.reverse().map(res=>(
                            <div>
                            <div key={res.id}>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={6} className={classes.center}>
                                        <Card className={classes.root} width={1/2}>
                                            <CardContent>
                                                <div className='label'>
                                                    <h4>{res.name}</h4>
                                                </div>
                                                <h6>Time: {res.time}</h6>
                                                <h6>Location: {res.address}</h6>
                                                <h6>Quantity: {res.quantity}</h6>
                                                <h5>Description: {res.description}</h5>
                                            </CardContent>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            </div>
                                <br/>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
