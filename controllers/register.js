const registerFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "fb_" + id;
	db('users').returning('id')
			   .insert({ id: userid })
			   .then(user => {
			   	req.session.userId = user[0];
			   	res.json(user)
			   });
	
}

const registerGithub = (req, res, db) =>  {
	const { id } = req.body;
	db('users').returning('id')
			   .insert({ id: id })
			   .then(user => {
			   	req.session.userId = user[0];
			   	res.json(user)
			   });
}

module.exports = {
	registerFB: registerFB,
	registerGithub: registerGithub
}