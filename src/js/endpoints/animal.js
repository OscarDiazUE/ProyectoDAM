const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database
const { Database } = require('../handlers/database')

class Animal {
	constructor(animalId = null, type = 'id') {
		this.animalId = animalId
		this.type = type
	}

	execute(req, res) {
        console.log('/animals')
	}
}

module.exports = { Animal }