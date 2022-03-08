const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.hashPassword = (password) => {
	return (hashedPassword = bcrypt.hash(password, saltRounds));
};
exports.verifyPassword = (password, hashedPassword) => {
	return (verified = bcrypt.compareSync(password, hashedPassword));
};
