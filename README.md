## NationBuilder Programming Challenge
Malina Tran, January 2016

## Objectives
* Implement a chat-logging server ­­(the back-end store for a client­-side chat room), where users can join the chat, talk, sign off, etc. 
* Aggregate chat history for various units of time­ for reporting purposes.

## Approach and Assumptions
Built with Node/Express, the program implements the following API endpoints (`POST /event`, `GET /events`, and `GET /summary`). The app's entry point is `server.js` which includes all requirements, middleware, database connection, and HTTP routes.  Data is persisted through MongoDB. To allow for easier date manipulation, I used Moment.js. I used Mocha.js for writing unit tests.

One assumption I made is that if there is no aggregate data for a particular date/hour/minute, an object will still be returned if it falls within the given range.

## Installation and Setup
* Ensure you have a recent version of Node (the latest version is 5.5.0).
* Enter into the project's root directory and run `npm install` to install all dependencies.
* To run the program, have two terminals running: one for `node server.js` and another for `mongod`.
* To run all tests, go into the project's root directory, run `npm install -g mocha` followed by `mocha`.