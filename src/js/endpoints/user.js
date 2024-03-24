const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database
const { Database } = require('../handlers/database')
const { getDatabase } = require('firebase/database')

class User {
	constructor(databaseObject = null, userId = null, type = 'id') {
		this.db = databaseObject
		this.userId = userId
		this.type = type
	}

	execute(req, res) {
		console.log(this.userId)
		this.db.query_firebase(userId, res)
	}
}

module.exports = { User }