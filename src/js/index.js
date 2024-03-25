// environment variables
const dotenv = require('dotenv');
dotenv.config()

// import dependencies
const express = require("express");
// const endpoints = require('src/js/endpoints/index');
const path = require('path');
const https = require('https');

// logger
const { Logger } = require('./logger/logger')
const logger = new Logger(__filename)

// subprocess
const { spawn } = require('node:child_process');

// firebase
// local server
if (!Boolean(process.env.LOCAL)){
    // const { onRequest } = require('firebase-functions/v2/https');
}

// configure express
const app = express();
const port = process.env.PORT //|| 3000;


// config databases
const { Database } = require('./handlers/database')
const db = new Database()
db.execute()

// endpoints
const endpoints = require('./endpoints');
console.log(`----Starting endpoints: ${Date(Date.now())}----`) // consol.log because this is only for console else would break format

// authenticate requests
// app.use(myMiddleware);

// users
app.get('/users/:type/list', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/${req.params.type}/list`)
    const user = new endpoints.User.User(query_type = 'list', database_object = db, collection = 'users', type = req.params.type)
    user.execute(req, res)
})
app.post('/users/register/:type', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/register/${req.params.type}`)
    const user = new endpoints.User.User(query_type = 'register', database_object = db, collection = 'users', type = req.params.type, data = data)
    user.execute(req, res)
})
app.put('/users/update/:type/:id', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/update/${req.params.type}/${req.params.id}`)
    const user = new endpoints.User.User(query_type = 'update', database_object = db, collection = 'users', type = req.params.type, data = data)
    user.execute(req, res)
})
app.get('/users/:type/:id', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/${req.params.type}/${req.params.id}`)
    const user = new endpoints.User.User(query_type = 'list', database_object = db,  collection = 'users', type = req.params.type, user_id = req.params.id)
    user.execute(req, res)
})

// animals
app.get('/animals/:type/list', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/${req.params.type}/list`)
    const animal = new endpoints.Animal.Animal(query_type = 'list', database_object = db, collection = 'animals', type = req.params.type)
    animal.execute(req, res)
})
app.post('/animals/register/:type', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/register/${req.params.type}`)
    const animal = new endpoints.Animal.Animal(query_type = 'register', database_object = db, collection = 'animals', type = req.params.type, data = data)
    animal.execute(req, res)
})
app.put('/animals/update/:type/:id', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/update/${req.params.type}/${req.params.id}`)
    const animal = new endpoints.Animal.Animal(query_type = 'update', database_object = db, collection = 'animals', type = req.params.type, data = data)
    animal.execute(req, res)
})
app.get('/animals/:type/:id', (req, res) => {
	logger.info(`Recieving call to endpoint: /users/${req.params.type}/${req.params.id}`)
    const animal = new endpoints.Animal.Animal(query_type = 'list', database_object = db,  collection = 'animals', type = req.params.type, user_id = req.params.id)
    animal.execute(req, res)
})

// daily-facts
app.get('/daily-fact', (req, res) => {
    new endpoints.DailyFact.DailyFact().execute(req, res)
})

// 404
app.get('*', (req, res) => {
    
    res.send(`Endpoint not found.`)
    
})

if (Boolean(process.env.LOCAL)){
        // local server
        const server = app.listen(port, () => logger.info(`Listening to port ${port}!`));
    
        server.keepAliveTimeout = 120 * 1000;
        server.headersTimeout = 120 * 1000;
}
// else{
    // Expose Express API as a single Cloud Function:
    // exports.widgets = onRequest(app);
// }