const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (data) => {
	return jwt.sign(data, JWT_SECRET, { expiresIn: 7200 });
};

const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};

module.exports = {
	generateToken,
	verifyToken,
};
