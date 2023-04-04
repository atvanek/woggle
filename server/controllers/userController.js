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

module.exports = userController;
