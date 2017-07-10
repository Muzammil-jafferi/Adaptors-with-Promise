class mongoAdapter {
	constructor(name) {
		this.name = name
		this.DB = {}
	}
	connect() {
		return new Promise((resolve, reject) => {
			// using this in callback || bind is the way
			var that = this
			var MongoClient = require('mongodb').MongoClient;
			MongoClient.connect('mongodb://127.0.0.1:27017/mongoAdaptors', function(err, db) {
				if (err)
					reject(err)

				//console.log("Connected")
				that.DB = db
				resolve("Connected")
			});
		})
	}
	save(newData) {
		return new Promise((resolve, reject) => {
		newData.id = (Math.floor((Math.random() * 10) + 1)) + (new Date().getTime());
		let col = this.DB.collection(this.name)
			// insert keyword is used to insert the data 
		console.log(newData)
		col.insert(newData, function(err, data) {
			if (err) {
				throw err;
				reject(err)
			} else {
				col.findOne({
					id: newData.id
				}, function(err, oneData) {
					resolve(oneData.id)
				})
			}
		})
	})
	}

	update(data, edit) {
		return new Promise((resolve, reject) => {
		let col = this.DB.collection(this.name)
			// findOneAndUpdate keyword is used to find first and update in it
		col.findOneAndUpdate({
			id: data
		}, {
			$set: edit
		}, function(err, updatedData) {
			if (err) {
				throw err;
				reject(err)
			} else {
				// findOne keyword is used to find the single data if givent query matches or it return the first in that.
				col.findOne({
					id: data
				}, function(err, oneData) {
					console.log(oneData)
					resolve(oneData.id)
				})
			}
		})
	})
	}

	delete(data) {
		return new Promise((resolve, reject) => {
		let col = this.DB.collection(this.name)
			// findOneAndUpdate keyword is used to find first and delete it
		col.findOneAndDelete({
			id: data
		}, function(err, getdata) {
			if (err) {
				reject(err)
			} else {
				console.log(getdata,"deleted")
				resolve(getdata)
			}
		})
	})
	}
}

module.exports = mongoAdapter