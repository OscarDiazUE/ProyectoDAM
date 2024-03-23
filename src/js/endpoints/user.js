const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database
const { Database } = require('../handlers/database')

class User {
	constructor(userId = null, type = 'id') {
		this.userId = userId
		this.type = type
	}

	execute(user_id, req, res) {
        console.log('/users')
	}
}

module.exports = { User }