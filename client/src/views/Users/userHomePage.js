import React, {useState, useEffect } from "react";
import {useHistory, useLocation} from 'react-router-dom';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

import axios from 'axios';
import swal from 'sweetalert';
import LoginAuth from '../../LoginAuth'
import io from "socket.io-client";

import './userhome.css'

// using socket to listen income data from server in realtime
var socket = io();

export default function UserDashboard(props) {

    let history = useHistory();
    const location = useLocation();
    const username=location.state.detail;

    const [first_name,setFirstName]=useState();
    const [userLat, setUserLat] = useState(Number);
    const [userLong, setUserLong] = useState(Number);
    const [notifyData, setNotifyData]=useState([]);
    const [forms, setForms] = useState([]);

    const { ...rest } = props;

    function getFirstName(){
      axios.get("/users/login/"+username)
        .then(res=>setFirstName(res.data.user.first_name))
    }

    // eslint-disable-next-line
    useEffect(()=>{

        // Receive the incoming form data from mongodb through socket.io
        socket.on("Forms", data=>setForms(data));
        // Always call notification as it can decide to take an action by its own
        getNotificationData();
    });

    function getNotificationData(){
        // Start notify user if user's location is retrieved
        if (userLat) {

            // find the nearest leftover from user
            for (let i = 0; i < forms.length; i++) {
                const eventLat = forms[i].latitude;
                const eventLong = forms[i].longitude;
                const distance = getDistance(userLat,userLong,eventLat,eventLong);
                // considerably near (< 0.5km)
                if (distance < 0.5) {
                    // initial data for notification
                    if (notifyData.length === 0) {
                        notifyData.push(forms[i]);
                    }
                    else {
                        // check whether the data already in notification data
                        var dataIsInNotif = false;
                        for (let j=0; j<notifyData.length; j++) {
                            // data (event) is already notified
                            if (forms[i]._id === notifyData[j]._id) {
                                dataIsInNotif = true;
                                // Update data
                                notifyData[j] = forms[i];
                                break;
                            }
                        }

                        // add new data (event) to notification board
                        if (!dataIsInNotif){
                            notifyData.push(forms[i]);
                            setNotifyData(notifyData);
                        }
                        
                        // Delete the removed event from notification list
                        for (let j=0; j<notifyData.length; j++) {
                            if (notifyData[j]===undefined){
                            }
                            else if (!formContainsObject(forms, notifyData[j])){
                                delete notifyData[j];
                            }
                        }
                    }
                }
            }
        }
    }

    function formContainsObject (form, object) {
        for (let i=0;i< form.length; i++) {
            if (form[i]._id === object._id) {
                return true;
            }
        }
        return false;
    }
    // get distance using longitude and latitude
    // retrieved from https://www.geodatasource.com/developers/javascript
    function getDistance(lat1, long1, lat2, long2) {
        if ((lat1 === lat2) && (long1 === long2)) {
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

    // go to user details page
    function goUserDetails(){
        history.push({pathname:'/user/details',state:{detail:username}});
    }

    function logOut(){
        console.log("User "+username+" is logged out!");
        LoginAuth.signout();
        history.push({pathname:'/'});
    }

    function getLocation(){
        // ask for permission
        swal({
        text:"Allow Unifood to access your location?",
        icon:"info",
        buttons:
        {
            cancel:"Decline",
            accept:
            {
                text:"Accept",
                value:"accept"
            },
        },
        }).then((value)=>{
            switch(value){
                // allow to access location
                case "accept":
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(position => {
                        setUserLat(position.coords.latitude);
                        setUserLong(position.coords.longitude);
                        });
                        swal("Location is successfully shared with Unifood!");
                        break;
                    } else {
                        swal("Geolocation is not supported in this browser!");
                    }
                    break;
                default:
                    swal("Location is not shared with Unifood!")
            }
        });
    };

    // get user's first name
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
        
            <div class='grid-container' >
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
                    <NotificationsIcon fontSize="large"/>
                    <br/>
                    {notifyData.reverse().map(res=>(
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
            <br/>
            <br/>
            <Footer />
        </div>
    );
}