# Change My View

An reddit-like Forum 

This site is now being developed. 
## Environment Setup
### 0. Pre-requisite
Please install Node.js(latest or stable) and npm(Version 6+) on your Operating System. Use node -v and npm -v to verify that they are installed on your machine.

### 1.Install server dependencies
`npm install`

### 2.Install client dependencies
`cd client`<br>
`npm install`
### 3.back to root directory
`cd ..`

### 4.Run both Express & React from root
`npm run dev`

### Trouble shooting: 
1. If you see the server crashed and an error (port 3001 is already in use) is reported, please use the command line command `killall node` to manually stop all instances of node programs. It is suggested that you use this command immediately upon exit of the development process.
## miscellaneous for development 
1. Backend Development for Node.js/Express.js relies heavily on Postman. It is recommended to have it installed if you don't have it on your PC. PostMan is primarily used for intial testing of backend code during development process.<br>
2. New Server-side packages must be installed in the root directory. New client-side packages must be installed in the ./client directory.
## Build for production
`cd client`<br>
`npm run build`


## App Info

### Engineers

Xiaowen Zhu<br/>
Yinfei Wang<br/>
Minliao Li

### Version

1.0.0
zhuxiaowen 
sbbbbbbbb
