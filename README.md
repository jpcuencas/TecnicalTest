# Test application for Lansweeper

This is a test aplication for the Lansweeper's API

## Prerequesites

Need node instalation on your local machine

## Install Dependences

You need dependences if you want run the application

Firstly in node-back folder run the command:
```bash
npm install
```
Then the node server up on port 8081

Senondly in react-app folder run the command:
```bash
npm install
```

## Run App on localhost

If you want run the app on localhost

Firstly in node-back folder run the command:
```bash
npm start
```
Then the node server up on port 8081

Senondly in react-app folder run the command:
```bash
npm start
```
Then the browser are going open on port 5000 with react app
For the steps Install Dependences and Run App you can run the script:
```bash
./startApp.bat
```

## FIRST STEPS in react application

First you must loggin click on the button loggin from de main screen
when  a loggin pop-up appear and you can logged  when you are finish close the popup

then you access to assets table with thwe link in the navbar 'Assets'
then you have all data and check the flow with the details

## Docker
If you hav docker and dockerDestop installed you can use he command
windows:
```bash
./buildDocker.bat
```
Other SO:
```bash
docker-compose up -d
```
And you build a container in your localhost with bouth applications
localhost:5000 ReactApp

localhost:8081 NodeApp