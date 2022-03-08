const mongoose = require('mongoose');
const User = require('../models/userSchema');
const { hashPassword, verifyPassword } = require('../helpers/passwordHelpers');
const { generateAccessToken } = require('../helpers/tokenHelpers');

exports.register = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		if (!fullName || !email || !password)
			return res.json({
				status: 'fail',
				message: 'all fields must be completed.',
			});
		const hashedPassword = await hashPassword(password);
		const user = new User({ fullName, email, password: hashedPassword });
		await user.save();
		if (!user)
			return res.json({
				status: 'fail',
				message: 'something went worng during registration.',
			});
		const accessToken = generateAccessToken(user._id);
		res.cookie('accessToken', accessToken);
		res.json({ status: 'success', message: 'user registered.' });
	} catch (err) {
		console.log(err);
		res.json({
			status: 'fail',
			message: 'something went wrong during registration.',
		});
	}
};
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return res.json({
				status: 'fail',
				message: 'email and password required.',
			});
		const user = await User.findOne({ email }).select('+password');
		if (!user) return res.json({ status: 'fail', message: 'user not found.' });
		const verified = verifyPassword(password, user.password);
		if (!verified)
			return res.json({
				status: 'fail',
				message: 'email or password not found.',
			});
		const accessToken = generateAccessToken(user._id);
		res.cookie('accessToken', accessToken);
		res.json({ status: 'success', message: 'logged in successfully.' });
	} catch (err) {
		console.log(err);
		res.json({ status: 'fail', message: 'something went wrong during login.' });
	}
};
exports.update = async (req, res) => {
	return res.json({
		status: 'success',
		message: 'user technically updated successfully.',
	});
};
exports.delete = async (req, res) => {
	const id = res.locals.currentUser._id;
	const user = await User.findByIdAndDelete(id);
	res.json({ status: 'success', message: 'user deleted successfully.' });
};
exports.logout = (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.json({
			status: 'fail',
			message: 'you were not logged in to begin with.',
		});
		return;
	}
	res.cookie('accessToken', '');
	res.json({ status: 'success', message: 'user logged out' });
};
exports.getUserInfo = async (req, res) => {
	return res.json({ status: 'success', data: res.locals.currentUser });
};

exports.getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.json({ status: 'success', data: users });
};
