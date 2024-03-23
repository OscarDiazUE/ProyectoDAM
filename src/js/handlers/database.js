const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database

class Database {
	constructor() {}

	execute(req, res) {
        console.log('database')
	}
}

module.exports = { Database }