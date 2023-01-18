const jwt = require('jsonwebtoken');
var CONFIG = require('../config/config');

verifyToken = (req, res, next) => {
	let token = ['x-access-token'];

	if (!token){
		return res.status(403).send({
			status: 403, message: 'No token provided.' 
		});
	}

	jwt.verify(token, CONFIG.jwt_encryption, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
				status: 403, 
				message: 'Fail to Authentication. Error -> ' + err 
			});
		}
		req.userId = decoded.id;
		next();
	});
}
 
const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;