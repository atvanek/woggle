const userController = {};
import userModel from '../UserModel.js';
import { genSalt, hash, compare } from 'bcrypt';

userController.createUser = function (req, res, next) {
	try {
		const { username, password } = req.body;
		genSalt(10, (err, salt) => {
			hash(password, salt, async (err, hash) => {
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
		compare(password, user.password, (err, result) => {
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

export default userController;
