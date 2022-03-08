const { decodeToken, verifyToken } = require('../helpers/tokenHelpers');
const mongoose = require('mongoose');
const User = require('../models/userSchema');

exports.isLoggedIn = async (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	const verified = verifyToken(accessToken);
	if (!verified) return res.json({ status: 'fail', message: 'not authorized' });
	const decodedToken = decodeToken(accessToken);
	const user = await User.findById(decodedToken);
	res.locals.currentUser = user;
	next();
};

exports.isAdmin = async (req, res, next) => {
	if (res.locals.currentUser.isAdmin === false)
		return res.json({ status: 'fail', message: 'Not Authorized.' });
	next();
};
