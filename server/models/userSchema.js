const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	verified: {
		type: Boolean,
		required: true,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model('User', UserSchema);
