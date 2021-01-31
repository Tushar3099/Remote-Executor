

# CODEX ( Remote Code Executor)

## Description
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
    
    ![alt text](https://user-images.githubusercontent.com/43985601/99189365-da823780-2786-11eb-9f2a-1e07f1988e96.jpg "Tracks to refresh your mood from Spotify")
    

2. **IDE Screen**:
    1. ***Theme***:  By clicking on button on top-right corner, a user can toggle theme between "light" and "dark" mode.
    2. ***Language***:  A user can select his preferred programming language (c, c++, python, java, javascript) from given options. A minimal boilerplate associated with selected language gets displayed.
    3. ***Code***: A user can type code in selected programming language in code-editor space.
    4.  ***Input***: A user can type input (if any) in input box.
    5.  ***Run Code***: By clicking on "Run Code" button, the code, input and language is sent to server for execution.
    6. ***Output***: Output or error(if any) with time and memory usage gets displayed in output box .

3. **Hosted Interviews Screen**:
    1. ***Code***: All generated unique codes of logged in user get displayed .
    2. ***Timestamp***: Timestamp of creation of respective code.
    3. ***Options***:
	    1. ****Enter****:  Redirects to corresponding interview screen.
	    2. ****Copy****: Copies the code to clipboard.
	    3. ****Invite****: User can add email ids of other user to invite them for interview. An email of invitation with unique code of interview will be sent to them.
	    4. ****Delete****: User can delete the link of interview.
    ![alt text](https://user-images.githubusercontent.com/43985601/99190598-6a2ae480-278d-11eb-8cca-fb8cb75d2450.jpg "Professional help")

4. **Interview Screen**: 

	All features are same as that of "IDE Screen" with following additional features.

   1. ***End Interview***: Interviewer can end interview by clicking on "End Meet" button. Link of interview also gets deleted.
   2. ***Invite***: Interviewer can add email ids of other user to invite them for interview. An email of invitation with unique code of interview will be sent to them.
   3. ***Realtime***: Any changes in programming language, code, input , output done on one screen will be reflected to all screens in that particular interview.
   4. ***Video-call***:  A draggable video-call box displays the video call
![alt text](https://user-images.githubusercontent.com/43985601/99189358-d6561a00-2786-11eb-8657-9f38f9139324.jpg "Fitness screens")
![alt text](https://user-images.githubusercontent.com/43985601/99190032-487c2e00-278a-11eb-9594-b94bdf88f55c.jpg "Fitness Sub Screens")


## Tech Stack/Technologies Used
* React Native
* Node.js
* Google Firebase
* MongoDb


## Future scopes:
* Mood detection
* Add chat between specialists viz. therapists, psychiatrists, social workers, and users.
* Add specialists module
* Add video calling functionality.
* Add a booking appointment through the app and send a report of your profile along with your appointment request.
