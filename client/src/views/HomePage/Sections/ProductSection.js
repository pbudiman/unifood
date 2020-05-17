import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Fastfood from "@material-ui/icons/Fastfood";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h1 className={classes.note}>About Unifood</h1>
          <h5 className={classes.description}>
            Unifood is a passion project between three students, one university project,
            and a unified goal of reducing food waste on campus! Our aim is to connect students and event organisers
            to reduce the waste of edible food from university events.
          </h5>
        </GridItem>
      </GridContainer>

      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
                title="Food for Students"
                description="Register an account with Unifood and be notified of any opportunities for free food
                across campus. Meet more people and attend more events at the same time."
                icon={Fastfood}
                iconColor="danger"
                vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
                title="Contingency for Organisers"
                description="Stop stressing about over- or under-catering your events. Make sure
                you have enough for your attendees and we will make sure your extras don't go to waste."
                icon={LocationCityIcon}
                iconColor="danger"
                vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
                title="Reduce Waste on Campus Together!"
                description="Together we can reduce food wastage on campus alongside the
                student body and help The University of Melbourne achieve its' sustainability goals."
                icon={PublicIcon}
                iconColor="danger"
                vertical
            />
          </GridItem>
        </GridContainer>
      </div>




    </div>
  );
}
