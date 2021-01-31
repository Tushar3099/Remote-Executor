

# CODEX ( Remote Code Executor)

### Available at:  https://codex-rce.netlify.app/

## Brief Description
As the name suggests, it is a **Docker-based sandbox environment** to run a code snippet. It creates a new docker based container for each submitted code, run it in the isolated container, and return the output. It supports major programming languages C, C++,  python, java, javascript and can be extended to other language support too.
It can also be used as an **Interview platform** where interviewer can generate unique link or code. A user can enter the interview using that uniquely generated link or code. After entering the interview with a particular link, the screen will be shared in **realtime**. It means , changes in one screen will be reflected to every user's screen in that particular interview. They can also do **video call** throughout the interview.



## Features:

1. **Home Screen**:

      The homepage consists of the following elements:
    1. ***Login with Google***: By clicking on "Login with Google" button on top-left corner, a user can login with his google account.
    3. ***IDE***: By clicking on the ‘Play with IDE’ , a user will be redirected to sandbox environment.
    4. ***Host an Interview***: By clicking on "Host an Interview" button, a modal will open with uniquely generated link with options to "copy" link and "enter" interview.
    5. ***Enter an Interview***: By clicking on "Enter Interview " button, a modal will open where user can enter valid code of the interview to get redirected to corresponding shared-interview screen.
    6. ***Left drawer***: When user is logged in, a hamburger icon appears on top-left corner. By clicking on hamburger, a sliding drawer appears from left consisting of two elements:  (a) Home   (b) Hosted Interviews
    
    ![alt text](https://res.cloudinary.com/sh24sh25/image/upload/v1612105136/rce/Screenshot_from_2021-01-31_20-26-00_ea2x3c.png )
    

2. **IDE Screen**:
    1. ***Theme***:  By clicking on button on top-right corner, a user can toggle theme between "light" and "dark" mode.
    2. ***Language***:  A user can select his preferred programming language (c, c++, python, java, javascript) from given options. A minimal boilerplate associated with selected language gets displayed.
    3. ***Code***: A user can type code in selected programming language in code-editor space.
    4.  ***Input***: A user can type input (if any) in input box.
    5.  ***Run Code***: By clicking on "Run Code" button, the code, input and language is sent to server for execution.
    6. ***Output***: Output or error(if any) with time and memory usage gets displayed in output box .

![alt text](https://res.cloudinary.com/sh24sh25/image/upload/v1612105136/rce/Screenshot_from_2021-01-31_20-26-41_nuo7yv.png) 

3. **Hosted Interviews Screen**:
    1. ***Code***: All generated unique codes of logged in user get displayed .
    2. ***Timestamp***: Timestamp of creation of respective code.
    3. ***Options***:
	    1. ****Enter****:  Redirects to corresponding interview screen.
	    2. ****Copy****: Copies the code to clipboard.
	    3. ****Invite****: User can add email ids of other user to invite them for interview. An email of invitation with unique code of interview will be sent to them.
	    4. ****Delete****: User can delete the link of interview.
    ![alt text](https://res.cloudinary.com/sh24sh25/image/upload/v1612105136/rce/Screenshot_from_2021-01-31_20-26-10_j4rqky.png)

4. **Interview Screen**: 

	All features are same as that of "IDE Screen" with following additional features.

   1. ***End Interview***: Interviewer can end interview by clicking on "End Meet" button. Link of interview also gets deleted.
   2. ***Invite***: Interviewer can add email ids of other user to invite them for interview. An email of invitation with unique code of interview will be sent to them.
   3. ***Realtime***: Any changes in programming language, code, input , output done on one screen will be reflected to all screens in that particular interview.
   4. ***Video-call***:  A draggable video-call box displays the video stream of users in that interview. User can minimise and  maximise video-call box size and also mute the user.
![alt text](https://res.cloudinary.com/sh24sh25/image/upload/v1612105136/rce/Screenshot_from_2021-01-31_20-27-45_otihpo.png)



## Tech Stack/Technologies Used
* Docker (Containerisation)
* Socket io (Realtime)
* Node.js & Express (Backend)
* Mongodb (Database)
* Reactjs (Frontend)
* Redux (State Management)




## Thought Behind the Project:
Every person who is looking for a software engineering role has used some kind of online ide like codechef ide,  gfg ide etc. Ever wondered how these run user code ?
So we tried to build one such code executor with a dedicated server which can provide high availability and secure environment.<br/>
Also, many online code editors do not have interview and collaboration feature along with video chat. So we developed this platform which can be used for both code execution and interview purposes.

## Setup steps:

#### Get Started
```shell
# Clone repo
git clone <repo-url>
```

> ## Server



#### Run in _dockerized_ mode
```shell
# Go to server folder
cd rce-server

# build docker image
docker-compose build

# create volume
docker volume create my_vol

# run server in development mode
docker-compose up server
```
This will build the required docker image and run the server in a docker container which will be listening at http://localhost:3000.

#### Run in _development_ mode
Build executor image
```shell
# Go to server folder
cd rce-server

# Go to executor folder
cd executor

# Build image
docker build -it executor:1.0 .

# Back to root server directory
cd ..
```

Install all package dependencies (one time operation)

```shell
npm install
```

Run the application in development mode at http://localhost:3000. Should not be used in production

```shell
npm run dev
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

> ## Client


```shell
# Go to client folder
cd client
```

#### Run in _development_ mode

Install all package dependencies (one time operation)

```shell
npm install
```

Run the application in development mode at http://localhost:8000. 
```shell
npm start
```




