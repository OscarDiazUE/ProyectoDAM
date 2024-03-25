const dotenv = require('dotenv');
dotenv.config()


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = require('../../../firebase_config.json');

// Condifure SDKs
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, child, get }= require('firebase/database')

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database

class Database {
	constructor() {
		this.db = null;
	}

	initialize_sql(){
		this.sql_db = 'ConnectionString'
	}

	initialize_firebase(){
		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);

		this.firebase_db = getDatabase();
	}

	query_firebase(req, res, query){
		this.dbRef = ref(this.firebase_db);
		
		get(child(this.dbRef, query)).then((snapshot) => {
			
		  if (snapshot.exists()) {
			logger.info(`Query ${query} succeeded, returning data`)
			res.send({
				code: 200,
				message: 'Ok',
				data: snapshot.val()
			})
			// return 200, 'Ok', snapshot.val()
		  } else {
			logger.error('No available data')
			res.send({
				code: 404,
				message: 'No available data',
				data: {}
			})
		  }
		}).catch((error) => {
			logger.error(error)
			res.send({
				code: 500,
				message: error,
				data: {}
			})
		});
	}

	post_firebase(req, res, query, data){

	}

	update_firebase(req, res, query, data){

	}

	execute(){
		this.initialize_firebase()
	}
}

module.exports = { Database }