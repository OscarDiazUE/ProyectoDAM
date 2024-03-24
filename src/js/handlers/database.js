const dotenv = require('dotenv');
dotenv.config()


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = require('../../../firebase_config.json');

// Condifure SDKs
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, onValue, child, get }= require('firebase/database')

// logger
const { Logger } = require('../logger/logger')
const logger = new Logger(__filename)

// database

class Database {
	constructor() {
		this.db = null;
	}

	sql(){
		this.sql_db = 'ConnectionString'
	}

	firebase(){

		// Initialize Firebase
		this.app = initializeApp(firebaseConfig);

		this.firebase_db = getDatabase();
	}

	query_firebase(userId, res){
		// console.log(postId)
		this.dbRef = ref(this.firebase_db, `test`);
		console.log(this.dbRef)
		get(child(this.dbRef, `${userId}`)).then((snapshot) => {
		  if (snapshot.exists()) {
			console.log(snapshot.val());
			res.send(snapshot.val())
		  } else {
			console.log("No data available");
		  }
		}).catch((error) => {
		  console.error(error);
		});

		// Attach an asynchronous callback to read the data at our posts reference
		onValue
	}

	execute(){
		this.firebase()
	}
}

module.exports = { Database }