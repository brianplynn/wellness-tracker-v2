const request = require('request');
const logInFB = (req, res, db) =>  {
	const { id } = req.body;
	const userid = "fb_" + id;
	db.select()
	.from('users')
	.where('id', '=', userid)
	.then(user => {
		if (user[0]) {
			req.session.userId = user[0].id;
			res.json(user[0]);
		} else {
			throw new Error;
		}
	})
	.catch(err => {
	 	res.status(400).json('No such user. Please register');
	})
}


const logInGithub = (req, res, db) =>  {
	const { code } = req.body;
	request.post({ url: `https://github.com/login/oauth/access_token/?client_id=c7bdc63f0a88829cb6f2&client_secret=81e4ae8221fd323b103bab4cca15433b26f42ff4&code=${code}`,
				   headers: { 'User-Agent': 'request' }},
				   (error, response, body) => {
					  request({ url: `https://api.github.com/user?${body}`,
					  			headers: { 'User-Agent': 'request' }},
						  (error, response, body) => {
						  		const profile = JSON.parse(body)
							    const userid = "gh_" + profile.id;
								db.select()
								.from('users')
								.where('id', '=', userid)
								.then(user => {
									if (user[0]) {
										req.session.userId = user[0].id;
										res.json(user[0]);
									} else {
										throw new Error;
									}
								})
								.catch(err => {
								 	res.status(400).json({ message: 'No such user. Please register',
								 						   id: userid });
								})
					   })
	})
}

const guest = (req, res, db) => {
	db('nutrition')
		.where('user_id', 'guest')
		.del()
		.then(delCount => {
			db('sleep')
				.where('user_id', 'guest')
				.del()
				.then(delCount => {
					db('workouts')
						.where('user_id', 'guest')
						.del()
						.then(delCount => {
							res.json({ id: "guest" });
						})
				})
		})
}

module.exports = {
	logInFB,
	logInGithub,
	guest
}