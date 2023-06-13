import { Schema, connect, model } from 'mongoose';

connect(
	'mongodb+srv://atvanek:GkIu8WkNciV8tnRi@woggle.qpwf3fs.mongodb.net/?retryWrites=true&w=majority'
)
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
