const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// uuid
const { v4: uuidv4 } = require('uuid'); 

class Base {
	constructor(query_type, database_object, collection, type, id, data) {
		this.query_type = query_type
		this.db = database_object
		this.collection = collection
		this.type = type
		this.id = id
		this.data = data
		this.is_validated = false
		this.query_sentence = `${collection}/${type}/${id}`
	}

	register(req, res){
		this.validation()

		if (this.is_validated){
			this.id = uuidv4()
			
			logger.info(`Creaging: ${this.type} with id ${this.id}`)
			this.db.post_firebase(req, res, this.query_sentence, data = this.data)
		}
		else{
			logger.error('Bad Request')
			res.send({
				code: 400,
				message: 'Bad Request',
				data: {}
			})
		}
	}

	update(req, res){
		this.validation()

		if (this.is_validated){
			logger.info(`Updating: ${this.query_sentence}`)
			this.db.update_firebase(req, res, this.query_sentence, data = this.data)
		}
		else{
			logger.error('Bad Request')
			res.send({
				code: 400,
				message: 'Bad Request',
				data: {}
			})
		}
	}

	query(req, res){
		logger.info(`Querying: ${this.query_sentence}`)
		this.db.query_firebase(req, res, this.query_sentence)
	}

	execute(req, res) {
		switch(this.query_type) {
			case 'list':
				this.query(req, res)
				break;
			case 'register':
				this.register(req, res)
				break;
			case 'update':
				this.update(req, res)
				break;
			default:
                res.send({
                    code: 400,
                    message: 'Bad Request',
                    data: {}
                })
				break;
		  }
	}
}

module.exports = { Base }