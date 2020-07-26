# Unifood
A web application designed to connect event organisers to students
across campus and reduce edible waste within The University of Melbourne.

https://unifood-app.herokuapp.com/

**Created by:** Team Singularity: Patricia Angelica Budiman (1012861), Vivian Gao (917035), Franklin Aldo Darmansa (1025392)

**Built with:** Node.JS, Express, MongoDB, React, Material-UI, React-Bootstrap

**Demo Accounts**  

| User Type | Login             | Password |
|-----------|-------------------|---------|
| User      | pbudiman          | userpb  |
| Organiser | external@demo.com | demo    |








# Table of Contents

1. [Set Up Environment & Testing](#set-up-environment)
2. [Testing](#testing)
3. [Core Functionalities](#core-functionalities)
4. [Front-End Client](#front-end-client)
5. [Back-End Server](#back-end-server)










## Set Up Environment
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




## Testing
Testing completed for the user feature.
- Sign Up
- Log in
- Updating account detail
- Deleting user account
```
npm install
```
```
npm run test
```










## Core Functionalities
### 1. Account System
User accounts are able to access their dashboard where all new event and food listings are available. On their dashboard, the user can share their current location and be notified of new events that are close to their proximity. The composes of the back-end for User and Organiser.
    
    User Account
        - Login
        - Sign up
        - Update user
        - Delete user
        - View all users
        
    Organiser Account
        - Login
        - Sign up
        - Update organiser
        - Delete organiser
        - View all organiser
        
### 2. Form Management
Organiser accounts are able to post a new listing with their location to be advertised to all users. In addition, organisers are able to manage their forms by either updating the details or deleting a listing. This composes of the back-end for Form.

    - Create new form
    - Update form
    - Delete form
    - View all forms

### 3. Location-Based Notification System
User accounts are able to access their dashboard where all new event and food listings are available. On their dashboard, the user can share their current location and be notified of new events that are close to their proximity. This composes of the back-end for Location.

    - Locate current user's location
    - Notify user if there is a nearby leftovers.









## Front-End Client

**Home Page:** https://unifood-app.herokuapp.com 

**About Page:** https://unifood-app.herokuapp.com/about-us

**All Listings:** https://unifood-app.herokuapp.com/all-listings

### Account Management
**Account Index:** https://unifood-app.herokuapp.com/log-in

#### User Account Management:

Username: pbudiman 
<br>
Password: userpb

**User Login:** https://unifood-app.herokuapp.com/user/login
<br>
**User Signup:** https://unifood-app.herokuapp.com/user/signup
<br>
**Update/Delete User:** https://unifood-app.herokuapp.com/user/details

#### Organiser Account Management:

Email: external@demo.com 
<br>
Password: demo

**Organiser Login:** https://unifood-app.herokuapp.com/organiser/login
<br>
**Organiser Signup:** https://unifood-app.herokuapp.com/organiser/signup
<br>
**Update Organiser:** https://unifood-app.herokuapp.com/organiser/account/update
<br>
**Delete Organiser:** https://unifood-app.herokuapp.com/organiser/account/delete

### Location-Based Notifications

#### Login as user:
https://unifood-app.herokuapp.com/user/login

#### User dashboaard:
The user dashboard should be and automatically accessed after the user successfully login.

URL: https://unifood-app.herokuapp.com/user/dashboard

This page contains:
 - all of the forms
 - The near leftovers notifications

To get notifications, user should click the "Share my location " button, allow the location access, and the notification will be sent real time based on location of 500 metres.

## Form Management
#### Login as organiser:
https://unifood-app.herokuapp.com/organiser/login

#### Organiser dashboard:
The organiser dashboard is automatically accessed after successsful login.

URL: https://unifood-app.herokuapp.com/organiser/home

Now you can: 
- Post new form 
- View your forms
-- Update your form
-- Delete your from






## Back-End Server

URL: http://localhost:5000


### User
#### User MVC

```
...
├── controller
|   └── userController.js
├── model
|   └── user.js
└── routes
|   └── userRouter.js
...
```
#### User Routes

| NAME       | PATH                          | METHOD | FUNCTION                                 |
|------------|-------------------------------|--------|------------------------------------------|
| index      | /users                        | GET    | The root of the user management paths    |
| logIn      | /users/login                  | POST   | Allows a user to log in                  |
| addUser    | /users/signUp                 | POST   | Allows a user to sign up                 |
| getDetails | /users/login/:username        | GET    | Validates user login details by username |
| updateUser | /users/login/update/:username | POST   | Updates user details by username         |
| deleteUser | /users/delete/:username       | GET    | Deletes user by username                 |


### Organiser
#### Organiser MVC

```
...
├── controller
|   └── organiserController.js
├── model
|   └── organiser.js
└── routes
|   └── organiserRouter.js
...
```
#### Organiser Routes

| NAME             | PATH                   | METHOD | FUNCTION                                   |
|------------------|------------------------|--------|--------------------------------------------|
| index            | /organisers            | GET    | The root of the organiser management paths |
| loginOrganiser   | /organisers/logon      | POST   | Validates organiser logon details          |
| organiserPreview | /organisers/update/:id | GET    | Gets details of an organiser by id         |
| getOrganisers    | /organisers/all        | GET    | Gets all of the organisers                 |
| addOrganiser     | /organisers/signup     | POST   | Registers a new organiser account          |
| updateOrganiser  | /organisers/update/:id | POST   | Updates details of organiser by id         |
| deleteOrganiser  | /organisers/delete/:id | GET    | Deletes organiser account by id            |

### Form 
#### Form MVC

```
...
├── controller
|   └── formController.js
├── model
|   └── form.js
└── routes
|   └── formRouter.js
...
```
#### Form Routes

|        NAME        |          PATH          | METHOD |                 FUNCTION                |
|:------------------:|:----------------------:|:------:|:---------------------------------------:|
| index              | /forms                 | GET    | The root of the form management paths   |
| createForm         | /forms/createForm      | POST   | Creates a new form/event listing        |
| updateForm         | /forms/updateForm      | POST   | Updates an existing form by form ID     |
| deleteForm         | /forms/deleteForm      | POSTS  | Deletes an existing form by form ID     |
| getAllForms        | /forms/formList        | GET    | Displays all forms                      |
| getAllFormsByEmail | /forms/formList/:email | GET    | Displays all forms with specified email |




## Reference
1. INFO30005 lectures and workshops material Week 1-5

## Acknowledgement
This project is done by group 'Singularity': Patricia Angelica Budiman (1012861), Vivian Gao (917035), Franklin Aldo Darmansa (1025392)
