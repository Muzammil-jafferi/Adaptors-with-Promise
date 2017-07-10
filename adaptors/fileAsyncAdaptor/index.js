let fs = require('fs')
var fsAccess = require('fs-access')
var ffs = require('final-fs');

class FileAsyncAdapter {
	constructor(name) {
		this.name = name
	}

	save(newData) {
		return new Promise((resolve, reject) => {
			newData.id = (Math.floor((Math.random() * 10) + 1)) + (new Date().getTime());
			var json = {}
			json[newData.id] = newData

			ffs.exists('newFileAsync.json').then(function(exists) {
				if (exists) {
					console.log('The file really exists');
					fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
						if (err) {
							reject(err)
						} else {
							var writeData = JSON.parse(readData)
							writeData[newData.id] = newData
							fs.writeFile('newFileAsync.json', '\n' + JSON.stringify(writeData), function(err, data) {
								if (err) {
									reject(err);
								}
								//callback(null, newData)
								console.log("saved Data", newData)
								resolve(newData.id);
							})
						}
					})
				} else {
					console.log('File newFileAsync.json does not exists');
					fs.writeFile('newFileAsync.json', JSON.stringify(json), function(err, data) {
						if (err) {
							reject(err);
						} else {
							console.log("saved Data", newData)
							resolve(newData.id);
							//callback(null, newData)
						}
					})
				}
			});

		})


	}

	update(id, edit) {
		return new Promise((resolve, reject) => {
			fs.readFile('newFileAsync.json', 'utf-8', function(err, readData) {
				if (err) {
					reject(err);
				} else {
					let editData = JSON.parse(readData)
					Object.assign(editData[id], edit)
					fs.writeFile('newFileAsync.json', JSON.stringify(editData), function(err, data) {
						if (err) {
							reject(err);
						} else {
							//callback(null, id)
							console.log("updated data", editData[id])
							resolve(id)
						}
					})
				}
			})
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
				if (err) {
					throw err
					reject(err);
				} else {
					let deleteData = JSON.parse(readData)
					console.log("deleted data", deleteData[id])
					delete deleteData[id]
					fs.writeFile('newFileAsync.json', JSON.stringify(deleteData), function(err) {
						if (err) {
							throw err
							reject(err);
						} else {
							resolve()
						}
					})
				}
			})
		})
	}
}

module.exports = FileAsyncAdapter