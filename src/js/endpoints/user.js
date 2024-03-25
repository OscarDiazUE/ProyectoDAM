const dotenv = require('dotenv');
dotenv.config()

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// Parent class
const { Base } = require('../handlers/base')

// validations
const { isValidIdDoc } = require('id-doc-validator')
const { validator } = require("email-validator");
const { phone } = require('phone');

class User extends Base {
	constructor(query_type, database_object, collection, type, id, data) {
		super(query_type, database_object, collection, type, id, data)
	}

	validation(){
		var is_valid_doc = isValidIdDoc(idDoc = this.data.id_doc, country = 'ES', idDocType = this.data.doc_type)
		var is_valid_phone = validator.validate(this.data.email);
		var is_valid_email = phone(this.data.phone,  {country: 'ES'})
		var is_valid_birthday = this.data.date && Object.prototype.toString.call(this.data.date) === "[object Date]" && !isNaN(this.data.date);
		
		if(
			is_valid_doc
			& is_valid_phone
			& is_valid_email
			& is_valid_birthday
			){
				this.is_validated = true
			}
	}
}

module.exports = { User }