/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from '@material-ui/icons/Home';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import {useHistory} from "react-router-dom";

const useStyles = makeStyles(styles);


export default function HeaderLinks(props) {
  let history = useHistory()
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Navigation"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
              <Link to="/log-in" className={classes.dropdownLink}>
                  User or Organiser
              </Link>,
              <Link to="/about-us" className={classes.dropdownLink}>
                  About Us
              </Link>,
              <Link to="/all-listings" className={classes.dropdownLink}>
                  All Listings
              </Link>,
          ]}
        />
      </ListItem>

        <ListItem className={classes.listItem}>
            <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
                onClick={()=>history.push("/")}

            >
                <HomeIcon className={classes.icons} /> Home Page
            </Button>
        </ListItem>
    </List>
  );
}
