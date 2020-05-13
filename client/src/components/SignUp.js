import React, {Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {withRouter} from 'react-router';


class SignUp extends Component {
    constructor(props){
        super(props);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeFirstName=this.onChangeFirstName.bind(this);
        this.onChangeLastName=this.onChangeLastName.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
     
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            email:'',
            first_name:'',
            last_name:'',
            username: '',
            password: '',
            success:null,
            users:[]
        }

    
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }

    onChangeFirstName(e) {
        this.setState({
          first_name: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
          last_name: e.target.value
        })
    }
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
            email: this.state.email,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            username: this.state.username,
            password: this.state.password
        }
        console.log(data);
        axios.post('http://localhost:5000/users/signUp',data)
            .then(res => res.data.success? this.props.history.push('/welcome',data.username): alert("Username/email is taken.\nPlease Try again"))

            
    }    
    
    render(){
        return (
            <div>
                <h1>Create Account in</h1> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Email:</label>
                    <input type="email" 
                        required 
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group"> 
                    <label>First Name::</label>
                    <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                        />
                    </div>

                    <div className="form-group"> 
                    <label>Last Name:</label>
                    <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.last_name}
                        onChange={this.onChangeLastName}
                        />
                    </div>


                    <div className="form-group"> 
                    <label>Username:</label>
                    <input type="text" 
                        required 
                        className="form-control"

                        value={this.state.username}
                        
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    
                
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
                        <input type="submit" value="Sign up" className="btn btn-primary" to='/welcome'/>
                        <br/>
                        <Link to='/login'> Already has an account?</Link>
                    </div>
                </form>
            </div>
        );
    }
  }
  export default withRouter(SignUp);