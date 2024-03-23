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

// configure express
const app = express();
const port = process.env.PORT //|| 3000;

// endpoints
const endpoints = require('./endpoints');

console.log(`----Starting endpoints: ${Date(Date.now())}----`) // consol.log because this is only for console else would break format

app.get('/users/list', (req, res) => {
    console.log(req)
    new endpoints.User.User(type = 'list').execute(req, res)
})

app.get('/users/register/:userId', (req, res) => {
    new endpoints.User.User(userId = req.params.userId, type = 'register').execute(req, res)
})

app.get('/users/:userId', (req, res) => {
    new endpoints.User.User(userId = req.params.userId).execute(req, res)
})

app.get('/animal/list', (req, res) => {
    new endpoints.Animal.Animal(type = 'list').execute(req, res)
})

app.get('/animal/register/:animaId', (req, res) => {
    new endpoints.Animal.Animal(animaId = req.params.animaId, type = 'register').execute(req, res)
})

app.get('/animal/:animaId', (req, res) => {
    new endpoints.Animal.Animal(animaId = req.params.animaId).execute(req, res)
})

app.get('/daily-fact', (req, res) => {
    new endpoints.DailyFact.DailyFact().execute(req, res)
})

app.get('*', (req, res) => {
    
    res.send(`Endpoint not found.`)
    
})

const server = app.listen(port, () => logger.info(`Listening to port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;