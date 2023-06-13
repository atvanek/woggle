import { Schema, connect, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

connect(process.env.DB_URI)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => console.log(err));

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
});

const userModel = model('user', userSchema);

export default userModel;
