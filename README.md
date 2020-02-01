This is a User Managemet APP with REST services

The app managing user data with  MySql Database.

APP INFO:

	Backend Middleware:
	     > express

	Backend Template engine:
	     > ejs view engine

	FrontEnd Application Framework:
	     > AngularJS

	FrontEnd CSS Framework:
	     > Bootstrap 4
	     > MDBootstrap

How to run User Managemet APP :

	  First create database and database table.
	  Database Name:
        > create database user_management;

    Database Table Structure:
        > CREATE TABLE `userObj` ( `id` int(11) NOT NULL AUTO_INCREMENT, `userName` varchar(255) CHARACTER SET utf8 NOT NULL, `givenName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,`surName` varchar(255) CHARACTER SET utf8 DEFAULT NULL, `DOB` date DEFAULT NULL, PRIMARY KEY (`id`) );

    any db config wise changes ,just modify given below file:
         > middleware/db.js

	  an then, Install npm module using given below command:
	     > npm install

	  finaly,run node server using given below command:
	     > node server.js

