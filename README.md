# Unifood 
A web application designed to connect event organisers to students
across campus and reduce edible waste within The University of Melbourne.

https://unifood-app.herokuapp.com/

**Built with:** Node.JS, Express, MongoDB, React, Material-Ui, Bootstrap

**Demo Accounts**  

| User Type | Login             | Password |
|-----------|-------------------|---------|
| User      | pbudiman          | userpb  |
| Organiser | external@demo.com | demo    |

## Set Up Environment for Unifood app
Please open 2 terminals
- Terminal 1 for backend:
```
npm install
```
```
npm start
```
- Terminal 2 for frontend:
```
cd client
```
```
npm install
```
```
npm start
```

## Unifood Core Functionalities

- Account System
    - User Account
        - Login
        - Sign up
        - Update user
        - Delete user
        - View all users
        
    - Organiser Account
        - Login
        - Sign up
        - Update organiser
        - Delete organiser
        - View all organiser
        
- Form Management
    - Create new form
    - Update form
    - Delete form
    - View all forms

- Notification System
    - Locate current user's location
    - Notify user if there is a nearby leftovers.

## Accessing the Core Functionalities

### Front End
 ##### Demo account:
 username: pbudiman
 <br> password: userpb

#####Home Page:
URL: https://unifood-app.herokuapp.com 
 <br> or access locally  http://localhost:3000
 
##### Login:
Click "Hungry User" button at the homepage or access:
 <br> https://unifood-app.herokuapp.com/userlogin 
 <br>
 or http://localhost:3000/userlogin locally.
 

 
##### User Dashboard
 
The user homepage should be and automatically accessed after the user successfully login.

URL: http://unifood-app.herokuapp.com/userdashboard
<br>or http://localhost:3000/userdashboard locally

This page contains:
 - all of the forms
 - The near leftovers notifications

To get notifications, user should click the "Share my location " button, allow the location access, and the notification will be sent real time.


## Back End

URL: http://localhost:5000


#### Form Routes

| Function       | Method | Url
| -------------- | ------ |-----------------
| Form index     | get    | /forms
| View all forms | get    | /forms/formList
| Post new form  | post   | /forms/createForm
| Update form    | post   | /forms/updateForm
| Delete form    | post   | /forms/deleteForm


#### User Routes

Demo account:
* Username: pbudiman
* Password: userpb

| Function       | Method | Url
| -------------- | ------ |-----------------
| Users          | get    | /users
| Login          | post   | /users/login
| Sign up        | post   | /users/signUp
| Logged in      | get    | /users/login/:username
| Update details | post   | /users/login/update/:username
| Delete user    | get    | /users/delete/:username


#### Organiser Routes
Demo account:
<br>
email: external@demo.com
<br>
password: demo

| Function       | Method | Url
| -------------- | ------ |-----------------
| Organisers     | get    | /organisers
| Login          | post   | /organisers/logon
| Sign up        | post   | /organisers/signup
| Update details | post   | /organisers/update/:id
| Delete account | get    | /organisers/delete/:id
| Get by ID      | get    | /organisers/:email
| Get all        | get    | /organisers/all



## Reference
1. INFO30005 lectures and workshops material Week 1-5

## Acknowledgement
This project is done by group 'Singularity': Vivian Gao (917035), Franklin Aldo Darmansa (1025392), Patricia Angelica Budiman (1012861)
