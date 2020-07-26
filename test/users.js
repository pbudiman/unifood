
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {app}= require('../app');
const User= require("../model/user");
const db = require('../model/index')


const new_user=
    new User({
        username: "testing_acc",
        email:"testingacc@yahoo.com",
        password:"testinguser",
        first_name:"testing",
        last_name:"user"
    })

describe("Testing user functionality routes",function(){
    this.enableTimeouts(false)

    before(function(done){
      
        db.on('error', console.error.bind(console,'connection error'));
        db.once('open', function(){
            console.log("We are connected to test database");
            done();
        });
    })

    describe('Sign Up', function(){
        it("Signs up a new user (POST /users/signUp)",  (done)=>{
                    
            chai.request(app)
                .post("/users/signUp")
                .send(new_user)
                .end((err,result)=>{
               
                    if(result){
                        expect(result.body.success).to.be.equal(true)
                        done();
                    }else{
                        done(err);
                    }
                })
        })
    })

    describe('Log in', function(){
        it("User logs in(POST /users/login)",(done)=>{    
            this.enableTimeouts(false)
            chai.request(app)
                .post("/users/login")
                .send({username:new_user.username,password:new_user.password})
                .end((err,res)=>{
                    if(res){
                        expect(res.body.success).to.deep.equal(true);
                        done();
                    }else{
                        done(err);
                    }
                })
        })
    })

    describe('Updating account detail', function(){
        it( "Updating user details (POST /users/login/update/:username)", (done)=>{
            this.enableTimeouts(false)
            chai.request(app)
                .post("/users/login/update/"+new_user.username)
                .send({first_name:"newFirstName", last_name:"newLastName"})
                .end((err,res)=>{
                    if(res){
                        expect(res.body.success).to.deep.equal(true)
                        done();
                    }else{
                        done(err);
                    }
                })
        })
    })

    describe('Deleting user account', function(){
        it("Deleting a user (GET /users/delete/:username)", (done)=>{
            this.enableTimeouts(false)
            chai.request(app)
                .get("/users/delete/"+new_user.username)
                .end((err,res)=>{
                    if(res){
                        expect(res.body.success).to.deep.equal(true)
                        done();
                    }else{
                        done(err);
                    }
                })
        })

    })

})

   
    

