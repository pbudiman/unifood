import React from "react";
import {withRouter} from 'react-router';
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer"
import axios from "axios";
import { Link } from "react-router-dom";

var items=[];

class  Welcome extends React.Component {

  constructor(props){
    super(props);
    this.state=({
      username:this.props.location.state,
      first_name:null,
      endpoint:"http://localhost:5000",
      notifications:[]
    })
    this.getFirstName=this.getFirstName.bind(this)
  }

  getFirstName(){
    axios.get("http://localhost:5000/users/login/"+this.state.username)
      .then(res=> this.setState({first_name:res.data.data.first_name}))
  }

  componentDidMount() {
    const {endpoint} = this.state;
    //Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // socket.on("FromAPI", (data)=> {
    //   const notifications = data.map((notif)=>({
    //     id: notif.id,
    // }));
    // this.setState({notifications});

    socket.on("FromAPI", data => {this.setState({notifications:data}) });


    items = this.state.notifications;

    //  data =>this.setState({notifications:data})
       
//     // this.setState({response: data})
//     const todoItems = this.state.notifications.map((notif) =>
//   <li key={notif.id}>
//     {notif.text}
//   </li>
// );
}


  render(){
    this.getFirstName();
    // const {notifications}=this.state;
  


  
   
  return (
      <div >
        <h2>Hi {this.state.first_name}!</h2>
        {/* <ul>
          {notifications.map(notif=>{(
            <li key={notif.id}>{notif.id}</li>)
            })
          }
        </ul> */}
        <div>
          {this.state.notifications?this.state.notifications.map(item => (
            <p key={item.id}>{item.time}</p>
          )):console.log("not empty")}
        </div>
        {/* <li>
        {notifications.map(item => 
          <ul>{item.name}</ul>
        )}
        </li> */}
        {/* {homes.map(home => <div>{home.name}</div>)} */}
        <p>
      {/* {this.state.notifications?this.state.notifications.map((notif)=>(
        <li key={notif.id}>{notif.text}</li>
      )):console.log("none")} */}
      {/* {notifications? {notifications}: console.log("no")} */}
      </p>
     
      {/* <Table columns={this.columns} dataSource={this.state.results} rowKey='id' />
      */}
          <Link to='/' }>Log out</Link>
      </div>
    );
  }
}
export default withRouter(Welcome);
