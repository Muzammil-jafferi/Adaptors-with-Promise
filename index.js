let Middleware = require("./middleware");

class User extends Middleware {
	constructor() {
		super('user')
	}
	connect() {
		return super.connect()
	}
	save(data) {
		return super.save(data)
	}
	update(id, edit) {
		return super.update(id, edit)
	}
	delete(id) {
		super.delete(id)
	}
}

let data = {
	name: "muzzu",
	age: "24",
	email: "muzzu@gmail.com"
}

let edit = {
	name: "muzammil",
	age: 34
}

let a = new User

a.connect()
.then((connectiondone) => {	
	console.log(connectiondone)
	return a.save(data)
},(failure) => {
	console.log(failure);
})
.then((successMessage) => {
    console.log("saved");
    return a.update(successMessage, edit)
},(failure) => {
	console.log(failure);
})
.then((successMessage1) => {
    console.log("updated")
    a.delete(successMessage1)
},(failure) => {
	console.log(failure);
})
