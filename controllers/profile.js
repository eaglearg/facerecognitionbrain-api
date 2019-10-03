const handleProfile = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json("unable to find the user")
		}
		
	}).catch(err => res.status(400).json("Error gettingunable to register"));

	//res.status(404).json('no such user.');
}

module.exports = {
	handleProfile: handleProfile
}