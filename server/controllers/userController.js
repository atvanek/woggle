const userController = {};
const path = require('path');
const userModel = require(path.resolve('UserModel.js'));
const bcrypt = require('bcrypt');

userController.createUser = function (req, res, next) {
	try {
		const { username, password } = req.body;
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				const newUser = await userModel.create({ username, password: hash });
				res.locals.newUser = username;
				return next();
			});
		});
	} catch (err) {
		return next(err);
	}
};

userController.verifyUser = async function (req, res, next) {
	try {
		const { username, password } = req.body;
		console.log(username);
		const user = await userModel.findOne({ username: username });
		console.log(user);
		if (user === null) {
			return res.json({ verified: false });
		}
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) {
				return next(err);
			}
			if (result) {
				return next();
			} else {
				return res.send(JSON.stringify({ verified: false }));
			}
		});
	} catch (err) {
		return next(err);
	}
};

module.exports = userController;
