let config = require("../config.json")
	// To check the source available by config file of adapter.
	// if not set then take a default adapter(arrayAdapter).
let adaptor = require('../adaptors/arrayAdaptor')
if (config.adaptors)
	adaptor = require('../adaptors/' + config.adaptors)

class Middleware {
	constructor(name) {
		this.adaptor = new adaptor(name)
	}
	connect() {
		return new Promise ((resolve, reject) => {
		if (config.adaptors == "mongoAdaptor") {
			resolve(this.adaptor.connect())
		} else {
				// return blank callback if connect not found
			resolve("no Connect")
		}
			
		})
	}
	save(newData) {
		return this.adaptor.save(newData)
	}
	update(id, edit) {
		return this.adaptor.update(id, edit)
	}
	delete(id) {
		this.adaptor.delete(id)
	}
}
module.exports = Middleware