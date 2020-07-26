import React from "react";
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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

// login template
import styles from "assets/jss/material-kit-react/views/loginPage.js";
// unifood image
import image from "assets/img/unifood.png";
// Icon
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

// The template for sign in and sign up page
export default function SignInPage(props) {
    let history = useHistory()
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

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
                                        <h4>UNIFOOD</h4>
                                    </CardHeader>

                                    <CardBody>
                                        <GridItem container justify="center">


                                        <Link to={"/user/login"} className={classes.link}>

                                            <Button
                                                color="danger"
                                                size="lg"
                                                href="/user/login"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fas fa-play" />
                                                User Access
                                            </Button>
                                        </Link>

                                        <Link to={"/organiser/login"} className={classes.link}>
                                            <Button
                                                color="danger"
                                                size="lg"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fas fa-play" />
                                                Organiser Access
                                            </Button>
                                        </Link>

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
                                    </CardBody>
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

