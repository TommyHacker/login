const mongoose = require('mongoose');
const User = require('../models/userSchema');

exports.getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.json({ status: 'success', data: users });
};

exports.getUser = async (req, res) => {
	const { id } = req.body;
	if (!id) return res.json({ status: 'fail', message: 'user info required.' });
	const user = await User.findById(id);
	if (!user) return res.json({ status: 'fail', message: 'user not found' });
	return res.json({ status: 'success', data: user });
};

exports.updateUser = async (req, res) => {
	const { id, isAdmin, verified } = req.body;
	if (!id) return res.json({ status: 'fail', message: 'user info required.' });
	const user = await User.findByIdAndUpdate(id, { isAdmin, verified });
	if (!user) return res.json({ status: 'fail', message: 'user not found' });
	await user.save();
	res.json({ status: 'success', message: 'user updated successfully.' });
};

exports.deleteUser = async (req, res) => {
	const { id } = req.body;
	if (!id) return res.json({ status: 'fail', message: 'user info required.' });
	const user = await User.findByIdAndDelete(id);
	if (!user) return res.json({ status: 'fail', message: 'user not found' });
	res.json({ status: 'success', message: 'user deleted successfully.' });
};
