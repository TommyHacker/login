const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId) => {
	return (accessToken = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
		expiresIn: '1h',
	}));
};
exports.decodeToken = (token) => {
	return jwt.decode(token, process.env.TOKEN_SECRET).userId.toString();
};
exports.verifyToken = (token) => {
	try {
		jwt.verify(token, process.env.TOKEN_SECRET);
		console.log('verified');
		return true;
	} catch (err) {
		console.log('not verified');
		return false;
	}
};
