import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-slick";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/unifood_logo.png";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Card from "../../components/Card/Card";
import image1 from "../../assets/img/info1.png";
import image2 from "../../assets/img/info2.png";
import image3 from "../../assets/img/moodboard.png";

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

// About Us page
export default function AboutUs(props) {
    // Use the existed design
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    // Setting for image
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
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
                                        <h3 className={classes.title}>About Us</h3>
                                        <h4>The Mission Behind Unifood</h4>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                Unifood is a passion project between three students, one university project,
                                and a unified goal of reducing food waste on campus!
                                Our aim is to connect students and event organisers to reduce the waste of
                                edible food from university events{" "}
                            </p>
                        </div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={8} className={classes.center}>
                                    <Card carousel>
                                        <Carousel {...settings}>
                                            <div>
                                                <img src={image1} alt="First slide" className="slick-image" />
                                                <div className="slick-caption">
                                                    <h4>
                                                        Food Waste in Melbourne by The City of Melbourne
                                                    </h4>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    src={image2}
                                                    alt="Second slide"
                                                    className="slick-image"
                                                />
                                                <div className="slick-caption">
                                                    <h4>
                                                        Food Waste in Melbourne by The City of Melbourne
                                                    </h4>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={image3} alt="Third slide" className="slick-image" />
                                                <div className="slick-caption">
                                                </div>
                                            </div>
                                        </Carousel>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
