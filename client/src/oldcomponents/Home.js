
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render(){
  return (
      <div className="Home">
        <div className="lander">
          <h1>Unifood</h1>
          <p>Where there are free food available at uni</p>
          <Link to='/login'>A user? click here</Link>
        </div>
      </div>
    );
  }
}
