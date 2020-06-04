// const expect =  require('chai').expect;
const supertest= require ('supertest')
const chai = require('chai');
const expect = chai.expect;
require('../model/index')
const chaiHttp = require('chai-http');
// const should=chai.should();

chai.use(chaiHttp);


// require('mocha');
 

// var connection_string = "mongodb+srv://pbudiman:<password>@cluster0-hdaoj.mongodb.net/unifood?retryWrites=true&w=majority";
// var mongo_url = connection_string.replace("<password>",process.env.MONGO_PASSWORD);
// const db = require("monk")(mongo_url);
// require('../model')

const app= require('../app');
const User= require("../model/user")

const new_user=
    {
        username: "testing_acc",
        email:"testingacc@yahoo.com",
        password:"testinguser",
        first_name:"testing",
        last_name:"user"
    } 
const mongoose= require('mongoose')

    
// beforeEach(()=>{
//     require("../model/index")
// })
// afterEach(()=>{
//     mongoose.disconnect();
// })
describe("Testing user functionality",function(){
    // before((done)=>{
    //     require('../model/index')
    //     // .then(()=>done())
    //     // .catch((error)=>{
    //     //     throw error;
    //     // })
    //     done()
    // })
    // before((done)=>{
    //     // require('../model/index')
    //     done();
    // })
    // afterEach((done)=>{
    //     mongoose.disconnect();
    //     done();

    // })
    // after((done)=>{
    //     mongoose.disconnect()
    //     done()
    // })

      
    
    describe("Sign Up",  function(){
        context("check if we can sign up", function(){
            it("Signs up a new user (POST /users/signUp)",(done)=>{
                
                

                chai.request(app)
                    .post("/users/signUp")
                    .send(new_user)
                    
                    .then((res)=>{
                    
                        // expect(res.body.success).to.deep.equal(true)
                        // ending=res.body.success; 
                        // console.log("ending "+ending);
                        expect(res.body.success).to.deep.equal(true)
            
                    }) 
                done();
               
            })
        })    
    })


    describe("Log In",  function(){
        context("Check if we can log in", function(){
            it("User logs in(POST /users/login)",(done)=>{
                // let result=false;
                
                chai.request(app)
                    .post("/users/login")
                    .send({username:new_user.username,password:new_user.password})
                    .then((res)=>{
                        // console.log(res.body)
                        // result=res.body.success;
                        expect(res.body.success).to.deep.equal(true);
                    })

                done();
            })
        })
    })

    describe("Updating", function(){
        context("Check if we cam update user details", function(){
            it(" Updating user details (POST /users/login/update/:username)", (done)=>{
                chai.request(app)
                    .post("/users/login/update/"+new_user.username)
                    .send({first_name:"newFirstName", last_name:"newLastName"})
                    .then((res)=>{
                        expect(res.body.success).to.deep.equal(true)
                    })
                done();

            })
        })
    })

    describe("Deleting", function(){
        context("Check if we can delete a user", function(){
            it("Deleting a user (GET /users/delete/:username)", (done)=>{
                chai.request(app)
                    .get("/users/delete/"+new_user.username)
                    .then((res)=>{
                        expect(res.body.success).to.deep.equal(true);
                    })
                done();
            })
        })
    })
})

   
    


            // return chai.request(app)
            //     .get("/users/")
            //     .end((err,result)=>{
            //         result.should.have.status(200)
            //         console.log("Got",result.body.length," docs")
            //         done()
            //     })
           
            // })