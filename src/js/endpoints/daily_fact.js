const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database
const { Database } = require('../handlers/database')

class DailyFact {
	constructor() {}

	execute() {
        console.log('/daily_fact')
	}
}

module.exports = { DailyFact }