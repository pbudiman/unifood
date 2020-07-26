import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

// import design template
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {useHistory} from "react-router-dom";

const dashboardRoutes = [];

// Using UI template from Material-UI
const useStyles = makeStyles(styles);

export default function HomePage(props) {
  let history = useHistory()
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="UNIFOOD"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        onClick={()=>history.push("/")}
        {...rest}
      />
      <Parallax image={require("assets/img/homepage.png")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>

              </h1>
              <h4>

              </h4>
              <br />

              <Link to={"/user/login"} className={classes.link}>

                <Button
                color="danger"
                size="lg"
                href="/user/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Hungry User?
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
                        Event Organiser?
                    </Button>
                </Link>


            </GridItem>



          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
