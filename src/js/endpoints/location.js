const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database
const { Database } = require('../handlers/database')

class Location {
	constructor() {}

	execute(req, res) {
        console.log('/locations')
	}
}

module.exports = { Location }