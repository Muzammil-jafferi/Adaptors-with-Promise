let database = {}

class ObjectAdapter {
	constructor(name) {
		this.name = name
	}

	save(newData) {
		return new Promise((resolve, reject) => {
			newData.id = (Math.floor((Math.random() * 1000) + 1)) + (new Date().getTime());
			var id = newData.id;
			// if not found  then create
			if (!database[this.name])
				database[this.name] = {}
			database[this.name][newData.id] = newData
			//database[this.name].push(database[this.name][id])
			console.log(database[this.name])
			resolve(database[this.name][newData.id].id)
		})
	}
	update(id, edit) {
		return new Promise((resolve, reject) => {
			// Merging data with one another
			var data = database[this.name];
			Object.assign(data[id], edit)
			console.log(database[this.name])
			resolve(database[this.name][id].id)
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			console.log(database[this.name][id])
				// Deleting Particular data
			delete database[this.name][id]
			console.log("deleted")
			resolve(null)
		})
	}
}

module.exports = ObjectAdapter