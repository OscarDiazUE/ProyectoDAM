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
app.get('/users/list', (req, res) => {
    console.log(req)
    new endpoints.User.User(databaseObject = db, type = 'list').execute(req, res)
})
app.post('/users/register/:userId', (req, res) => {
    new endpoints.User.User(databaseObject = db, userId = req.params.userId, type = 'register').execute(req, res)
})
app.get('/users/:userId', (req, res) => {
    new endpoints.User.User(databaseObject = db, userId = req.params.userId).execute(req, res)
})

// animals
app.get('/animal/list', (req, res) => {
    new endpoints.Animal.Animal(type = 'list').execute(req, res)
})
app.post('/animal/register/:animaId', (req, res) => {
    new endpoints.Animal.Animal(animaId = req.params.animaId, type = 'register').execute(req, res)
})
app.get('/animal/:animaId', (req, res) => {
    new endpoints.Animal.Animal(animaId = req.params.animaId).execute(req, res)
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