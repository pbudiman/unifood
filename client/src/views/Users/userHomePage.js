
import React, {useState, useEffect } from "react";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import NotificationsIcon from '@material-ui/icons/Notifications';
import './userhome.css'

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {useHistory} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import swal from 'sweetalert';
import LoginAuth from '../../LoginAuth'

import io from "socket.io-client";
const useStyles = makeStyles(styles);

var socket = io();



export default function UserDashboard(props) {

  let history = useHistory();
  const location = useLocation();
  const username=location.state.detail;
  const [first_name,setFirstName]=useState();
  const [userLat, setUserLat] = useState(Number);
  const [userLong, setUserLong] = useState(Number);
// const [eventLat, setEventLat] = useState(Number);
// const [eventLong, setEventLong] = useState(Number);
// const [distance, setDistance] = useState(Number);
  const [allData, setAllData]=useState([]);
  const [newData, setNewData]=useState([]);
  const [notifyData, setNotifyData]=useState([]);
  const [incomingData, setIncomingData]=useState([]);
  const [forms, setForms] = useState([]);
// var notifyData = [];

  const classes = useStyles();
  const { ...rest } = props;

  function getFirstName(){
    axios.get("/users/login/"+username)
      .then(res=>setFirstName(res.data.user.first_name))
  }

  useEffect(()=>{
    // const socket=socketIOClient(endpoint);

    socket.on("Forms", data=>setForms(data));
    // console.log(forms)
    setIncomingData(forms);
  

    // socket.on("Notifications", data=>setIncomingData(data));
    
    //NOTIFSS
    

    // Get new only the new incoming data
    if(incomingData.length > allData.length) {
      for (let i= allData.length; i<incomingData.length; i++) {
        newData.push(incomingData[i]);
        // console.log("New PUSHED Data: ", incomingData[i]);
      }
      // All data = incoming data
      setAllData(incomingData);
      // keep the data in new data
      setNewData(newData);
      // console.log("NEW DATA LENGTH: ", newData.length);

    }
    getNotificationData();

  });

  function getNotificationData(){

    // check location has been retrieved
    if (userLat) {
      // console.log("GOT INNNNN");

      // find the nearest leftover from user
      for (let i = 0; i < newData.length; i++) {

        const eventLat = newData[i].latitude;
        const eventLong = newData[i].longitude;
        const distance = getDistance(userLat,userLong,eventLat,eventLong);

        // considerably near
        if (distance < 1) {
          // console.log(distance);
          // console.log("NOTIFY DATA: ", notifyData.length);

          // initial data for notification
          if (notifyData.length === 0) {
            notifyData.push(newData[i]);
          }
          else {
            // check whether the data already in notification data
            var dataIsInNotif = false;
            for (let j=0; j<notifyData.length; j++) {
              if (newData[i]._id == notifyData[j]._id) {
                dataIsInNotif = true;
                break;
              }
            }
            if (!dataIsInNotif){
              notifyData.push(newData[i]);
              setNotifyData(notifyData);
            }
          }
        }
      }
      // setNewData([]);
    } else {
      // console.log("no loc");
    }
  }

  function getDistance(lat1, long1, lat2, long2) {
    if ((lat1 == lat2) && (long1 == long2)) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = long1 - long2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;

      // setDistance(dist);
      return dist;
    }
  }

  function goUserDetails(){
    history.push({pathname:'/user/details',state:{detail:username}});
  }

  function logOut(){
    console.log("User "+username+" is logged out!")
    LoginAuth.signout();
    history.push({pathname:'/'})
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
              setUserLat(position.coords.latitude);
              setUserLong(position.coords.longitude);
            });
            console.log(userLat);
            console.log(userLong);
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
if(username){
  getFirstName();
}

  return ( 
      
    <div >
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
        <Parallax small filter image={require("assets/img/userdashboard.png")} >
    
        </Parallax>
        <br/>
      
        <div  class='grid-container' >
            <div class="option">
                <div class='greeting'>
                    Hi {first_name}!
                  </div>
                  <div class='button'>
                  <Button simple color="danger" size="md" onClick={()=>logOut()}>
                      <div class='writing'>
                          Log out
                        </div>
                    </Button>
                    </div>
  
                  <div class='button'>

                    <Button simple color="danger" size="md" onClick={()=>goUserDetails()}>
                      <div class='writing'>
                          Account details
                        </div>
                    </Button>
                    </div>
                  

                    
                    <div class='button'>
                    <Button simple color="danger" size="md" onClick={()=>getLocation()}>
                      <div class='writing'>
                          Share my location!
                        </div>
                    </Button>
                    </div>
                    
                </div>
          
            
                <div class="notifs">
                   
                    <NotificationsIcon fontSize="large"></NotificationsIcon>
                    <br/>
                    {notifyData.map(res=>(
                        <div key={res.id}>
                            <div class='notifBox'>
                                Food available from {res.name}!<br/>
                                Location: {res.address} <br/>
                                Time: {res.time}<br/>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="allForms">
                    <div class='label'>
                        Available Food
                    </div> 
                    <br/>
                    {forms.reverse().map(res=>(
                        <div key={res.id}>
                            <div class='formBox'>
                                New Entry from {res.name}!<br/>
                                At {res.address} <br/>
                                Time: {res.time}<br/>
                            </div>
                        </div>
                    ))} 
                 
            </div>
        </div>
    <Footer />
    </div>
    
);
}


