const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// Parent class
const { Base } = require('../handlers/base')

class Animal extends Base{
	constructor(query_type, database_object, collection, type, id, data){
		super(query_type, database_object, collection, type, id, data)	
	}
}

module.exports = { Animal }