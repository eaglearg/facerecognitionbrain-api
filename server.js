const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>  {
	console.log("hagoo");
	next();
});

app.get('/', (req, res) => {
	res.send("getting root");
});


app.listen(3000);