
import React, {useState, useEffect } from "react";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import './userhome.css'

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import {useHistory} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import socketIOClient from "socket.io-client";

const useStyles = makeStyles(styles);
const endpoint="http://localhost:5000";



export default function UserDashboard(props) {

  let history = useHistory();
  const location = useLocation();
  const username=location.state.detail;
  const [first_name,setFirstName]=useState();
  const [userLat, setUserLat] = useState(Number);
  const [userLong, setUserLong] = useState(Number);
  const [allData, setAllData]=useState([]);
  const [newData, setNewData]=useState([]);
  const [notifyData, setNotifyData]=useState([]);
  const [incomingData, setIncomingData]=useState([]);
  const [forms, setForms] = useState([]);

  const classes = useStyles();
  const { ...rest } = props;

  function getFirstName(){
    axios.get("/users/login/"+username)
      .then(res=>setFirstName(res.data.user.first_name))
  }

  useEffect(()=>{
    const socket=socketIOClient(endpoint);

    socket.on("Notifications", data=>setIncomingData(data));
    socket.on("Forms", data=>setForms(data));

    // Get new only the new incoming data
    if(incomingData.length > allData.length) {
      for (let i= allData.length; i<incomingData.length; i++) {
        newData.push(incomingData[i]);
      }
      // All data = incoming data
      setAllData(incomingData);
      // keep the data in new data
      setNewData(newData);

    }
    getNotificationData();

  });

  function getNotificationData(){

    // check location has been retrieved
    if (userLat) {

      // find the nearest leftover from user
      for (let i = 0; i < newData.length; i++) {

        const eventLat = newData[i].latitude;
        const eventLong = newData[i].longitude;
        const distance = getDistance(userLat,userLong,eventLat,eventLong);

        console.log("DISTANCEE: ", distance);
        // considerably near (<400 metres)
        if (distance < 0.4) {
          console.log(distance);
          console.log("NOTIFY DATA: ", notifyData.length);

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
    } else {
      console.log("no loc");
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

      return dist;
    }
  }

  function goUserDetails(){
    history.push({pathname:'/userdetails',state:{detail:username}});
  }

  function logOut(){
    history.push({pathname:'/'})
  }



  function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
      });
      console.log(userLat);
      console.log(userLong);
    } else {
      alert("Geolocation is not supported in this browser");
    }
  }
  
  getFirstName();

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
                    <button class="button" onClick={()=>logOut()}>
                          
                      <div class='writing'>
                        Log out
                      </div>
                    </button>
                  
                  
                    <button class="button" onClick={()=>goUserDetails()}>
                      <div class='writing'>
                        Account details
                      </div>
                    </button>
           

                    
                    <button class="button" onClick={()=>getLocation()}>
              
                      <div class='writing'>
                        Find food near me!
                      </div>
                    </button>
                    
                </div>
            
                <div class="notifs">
                    <div class='label'>
                        Notifications
                    </div>
                    <br/>
                    {notifyData.map(res=>(
                        <div key={res.id}>
                            <div class='notifBox'>
                                There is a <strong>{res.food} near you!</strong><br/>
                              Last Pick Up Time: {res.time} <br/>
                              {res.name} @ {res.address}<br/>
                            </div>
                        </div>
                    ))}
                </div>
                <div class="allForms">
                    <div class='label'>
                        Available Food
                    </div> 
                    <br/>
                    {forms.map(res=>(
                        <div key={res.id}>
                            <div class='formBox' align={'left'}>
                              <strong>{res.quantity} {res.food} left</strong> from {res.name}!<br/>
                                At {res.address} <br/>
                                Last Pick Up Time: {res.time}<br/>
                            </div>
                        </div>
                    ))} 
                 
            </div>
        </div>
    <Footer />
    </div>
    
);
}


