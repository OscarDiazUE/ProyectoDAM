// environment variables
const dotenv = require('dotenv');
dotenv.config()

// import dependencies
const express = require("express");
const path = require('path');
const https = require('https');

// logger
const { Logger } = require('./logger/logger')
const logger = new Logger(__filename)

// subprocess
const { spawn } = require('node:child_process');

// configure express
const app = express();
const port = process.env.PORT || 3000;

// hmtl

console.log(`----Starting endpoints: ${Date(Date.now())}----`) // consol.log because this is only for console else would break format

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '..', 'html/index.html'));
// });
// app.use(express.static("dist"));


app.get('/send-shelter', (req, res) => {
    
})

app.get('/send-shelter', (req, res) => {
    
})

app.get('/send-shelter', (req, res) => {
    
})

app.get('/send-shelter', (req, res) => {
    
})

app.get('/send-shelter', (req, res) => {
    
})
