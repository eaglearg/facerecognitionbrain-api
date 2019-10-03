const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '58787d370ec548bd982d6e71801c8544'
});

const handleCallApi = (req, res) => { 
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json(err))
};


const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	}).catch(err => res.status(400).json("unable to get entries"))

};



module.exports = {
	handleImage: handleImage,
	handleCallApi: handleCallApi
}