const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: '1234',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: '12345',
			entries: 0,
			joined: new Date()
		}
	]
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) =>  {
	next();
});

app.get('/', (req, res) => {
	res.json(database.users);
});

app.post('/signin', (req, res) => {
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password ) {
		res.json(database.users[0]);
	} else {
		res.status(400).json("error log in");
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()

	});
	res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;

	database.users.forEach(user => {
		if (user.id === id) {
			return res.json(user);
		} 
	})

	res.status(404).json('no such user.')
});

app.put('/image', (req, res) => {
	const { id } = req.body;

	database.users.forEach(user => {
		if (user.id === id) {
			user.entries++;
			return res.json(user.entries);
		} 
	})

	res.status(404).json('no found user.')
});


app.listen(3001);