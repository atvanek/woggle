const userController = {};
const path = require('path');
const userModel = require(path.resolve('UserModel.js'));

userController.createUser = async function (req, res, next) {
	const { username, password } = req.body;
	try {
		const newUser = await userModel.create({ username, password });
		res.locals.newUser = username;
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = userController;
