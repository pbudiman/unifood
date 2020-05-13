# User Guide for Deliverable Two

## Set Up
From Terminal, please install dependencies by:
```
npm install
```

## Running the application
To run on terminal:
```
node app.js
```
or
```
npm start
```
then visit the website on the browser : http://localhost:3000/ or by visiting the website: https://unifood-app.herokuapp.com/

## Form Routes
Form Index: https://unifood-app.herokuapp.com/forms
<br>
View All Forms: https://unifood-app.herokuapp.com/forms/formList
<br>
Post New Form: https://unifood-app.herokuapp.com/forms/createForm
<br>
Update Form: https://unifood-app.herokuapp.com/forms/updateForm
<br>
Delete Form: https://unifood-app.herokuapp.com/forms/deleteForm


## User Routes
From the home page: https://unifood-app.herokuapp.com/
<br>
To log in: https://unifood-app.herokuapp.com/users/login
<br>
To sign up: https://unifood-app.herokuapp.com/users/signUp
<br>
To change user details after logging in: https://unifood-app.herokuapp.com/users/login/:username
<br>
User deleting their account after logging in: https://unifood-app.herokuapp.com/users/delete/:username 
<br>
  [where ':username' takes the user's username]
<br>
Demo account:
* Username: pbudiman
* Password: userpb

## Organiser Routes
Login URL: https://unifood-app.herokuapp.com/organisers
<br>
Sign up URL: https://unifood-app.herokuapp.com/organisers/signup
<br>
Edit (update) account URL: https://unifood-app.herokuapp.com/organisers/update/:_id
<br>
Delete account URL: https://unifood-app.herokuapp.com/organisers/delete/:_id
<br>
Show all organisers URL: https://unifood-app.herokuapp.com/organisers/all
<br>
Update and delete account could be accessed after login as well.
<br>
<br>
To update and delete account could be access through passing their id (replace ":_id" with the actual id). 
<br>
The ids could be accessed through "Show All Organiser URL".

Demo account:
<br>
email: external@demo.com
<br>
password: demo
## Reference
1. INFO30005 lectures and workshops material Week 1-5

## Acknowledgement
This project is done by group 'Singularity': Vivian Gao (917035), Franklin Aldo Darmansa (1025392), Patricia Angelica Budiman (1012861)


# INFO30005-Singularity-Unifood Description

**UniFood is an application created by Team Singularity that connects event organisers with excess food to users in the surrounding area through a notification system.**

We have identified the following goals we want to address throughout our implementation:
* To serve as a contingency for event organisers when there is surplus food and reduce waste of edible food.
* To be as user-friendly as possible for both users and organisers by integrating well with existing protocols for event organisers and daily practices of users.

### How it Works:
1. The event organiser fills out a form detailing the location, time, quantity, and type of food available alongside a photograph.
2. The system will notify users that are nearby regarding the details of the event and surplus food via Facebook Messenger.
3. If the users nearby do not respond within a set period of time, the system will send the notification to a wider area.
4. Users can reserve the food by replying through Facebook Messenger and will have a set time frame to get to the location of the event/poster.

## Key Functionalities
### 1. Account System
**Users**: The user account will be notified if there are events with surplus food on campus. To register, the user needs to provide:
* Username
* Email
* Name
* Password

**Organisers**: The event organiser account has the ability to advertise their leftovers (second functionality) and automatically notify other people around the campus (third functionality). Although this is primarily for student clubs and societies, independent event coordinators can also participate. To register an account, the event organiser needs to provide the following details:
* Officer Name
* Organisation Name
* Contact Number
* Email
* Password

### 2. Advertisement Form
The catered events that are hosted within The University of Melbourne are spread out across the campus. One of the ways to connect the students and communities is by notifying students where the events are located. This advertisement system will be available for event organisers to advertise any excess food and help connect them to nearby students by providing a form for them to fill out within the application. After submitting the form, the system will automatically process the information and notify the users.

Details of the form:
* Location
* Food Available
* Quantity of Food
* Time
* Photo of Food

### 3. Notification System
Since this application is designed for users and events within The University of Melbourne area, the scope
of the location will be on campus only. As mentioned above, the notification regarding the food availability, location and price will be sent to users.
