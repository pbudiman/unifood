import React, {Component} from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";


class Login extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            username: '',
            password: '',
            users:[]
        }
    }
    // componentDidMount() {
    //     axios.get('http://localhost:5000/users/')
    //       .then(response => {
    //         if (response.data.length > 0) {
    //           this.setState({
    //             users: response.data.map(user => user.username),
    //             username: response.data[0].username
    //           })
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })
    //   }
    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
    }

 
    onSubmit(e){
        e.preventDefault();
        const data= {
            username: this.state.username,
            password: this.state.password
        }
        
        console.log(data);
        axios.post('users/login',data)
            // .then(res=>this.setState({success: res.data.success}))
            // .then(res=>res.data.success? <Redirect to='/welcome'></Redirect>:console.log("it is false"));
    //         .catch((error) => {
    //                     console.log(error);
    //                   })
            // .then(res => res.data.success? console.log("hoo"): alert("Incorrect username/ password.\nPlease Try again"))
            .then(res => res.data.success? this.props.history.push('/welcome',data.username): alert("Incorrect username/ password.\nPlease Try again"))
            // .then(<Welcome username={data.username}/>)
            // .then(res=> console.log(res.data))
// 
    }    
    
    render(){
        return (
           
            <div>
                <h1>Log in</h1> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username:</label>
                    <input type="text" 
                        required 
                        className="form-control"

                        value={this.state.username}
                        
                        onChange={this.onChangeUsername}
                        />
                    </div>
            
                    <br></br>
                    <div className="form-group"> 
                    <label>Password:</label>
                    <input type="password" 
                        required 
                        className="form-control"

                        value={this.state.password}
                        
                        onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Sign in" className="btn btn-primary" />
                        <br/><Link to='/signup'> Create Account</Link>
                    </div>
                </form>
       
            </div>
        );
    }
}
  export default withRouter(Login);
