# NASA Project

This project is a Node.js and Express.js application that reads a CSV file from the NASA website to find habitable planets. It also utilizes the SpaceX API to retrieve mission status data and combines all of this information into a single project.

## Installation

To install this project, you can follow these steps:

1. Clone the repository to your local machine
```bash
 git clone https://github.com/smh-kneonix/nasa-project
 ```
2. Install the necessary dependencies by running npm install
```bash
 npm install
 ```
3. Start the application by running server
```bash
 npm run server
 ```
 > HINT: manage the env file for mongoDB

## Usage

Once the application is running, you can access it by navigating to http://localhost:8000 in your web browser. From there, you can explore the habitable planets and view mission status data from SpaceX.


## Additional Features

In addition to the existing features, the following features have been added to the project:


### Front End

The front end of this project was built using the Zero to Mastery course. It provides a user-friendly interface for exploring the data gathered by the application.


### Error Handling

Error handling has been implemented throughout the application to ensure that any errors that occur are handled gracefully. This includes handling errors when reading the CSV file, retrieving data from the SpaceX API, and any other errors that may occur during the course of running the application.

### MVC Design Pattern

The application has been designed using the Model-View-Controller (MVC) design pattern. This helps to keep the code organized and makes it easier to maintain and extend in the future.

### REST API

The application now exposes a REST API that allows users to retrieve data from the application programmatically. This API includes endpoints for retrieving a list of habitable planets, retrieving mission status data from SpaceX, and more.
><a href="https://www.postman.com/kneonix/workspace/nasa-project">you can see all the request from postman</a>

### Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) has been implemented using the <a href="https://www.npmjs.com/package/cors">cors</a> package. This allows the application to be accessed from other domains, making it easier to integrate with other applications.

### Logging

A logging system has been implemented using the <a href="https://www.npmjs.com/package/morgan">morgan</a> package. This logs all requests and responses to the console, making it easier to debug issues that may arise.

### File System

The <a href="https://www.npmjs.com/package/pm2">pm2</a> package has been added as a local project dependency to improve performance by utilizing the file system. This allows for faster read and write operations when working with large amounts of data.

### MongoDB Database

The application now uses a MongoDB database to store and retrieve data. This is implemented using the <a href="https://www.npmjs.com/package/mongoose">mongoose</a> package, which provides an easy-to-use interface for working with MongoDB.

### SpaceX API

The application now utilizes the <a href="https://github.com/r-spacex/SpaceX-API">SpaceX API</a> to retrieve mission status data. This is implemented using the <a href="https://www.npmjs.com/package/axios">axios</a> package, which provides an easy-to-use interface for making HTTP requests.

### API Pagination

API pagination has been implemented to limit the amount of data returned by the API. This helps to improve performance and reduce the amount of data that needs to be transferred over the network.

### API Testing

API testing has been implemented using the <a href="https://www.npmjs.com/package/mongoose">jest</a> and <a href="https://www.npmjs.com/package/supertest">supertest</a> packages. This allows for automated testing of the API endpoints to ensure that they are working correctly.
