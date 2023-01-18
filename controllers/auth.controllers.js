const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var CONFIG    = require('../config/config');
var AuthModel = require('../models/auth.models');

//** User Signup */
const user_signup = async function (req, res) {
    const body = req.body;
    bcrypt.hash(body.password, CONFIG.salt_round, function (err, hash) {
        if (err) {
            return res.send({
                status: CONFIG.status_zero,
                message: err
            });
        }
        var data = {
            password : hash,
            name : body.name,
            email: body.email,
        };

        AuthModel.userSignup(data, (err, response) => {
            if (err) {
                if (err.sqlMessage != undefined) {
                    return res.send({
                        status: CONFIG.status_zero,
                        message: err.sqlMessage
                    });
                } else {
                    return res.send({
                        status: CONFIG.status_zero,
                        message: (err.message != undefined ? err.message : "Something went wrong.")
                    });
                }
            } else {
                if (response.success) {
                    return res.send({
                        status: CONFIG.status_one,
                        message: response.message,
                        data : response.data
                    });
                } else {
                    return res.send({
                        status: CONFIG.status_zero,
                        message: response.message
                    });
                }
            }
        });
    });    
}
module.exports.userSignup = user_signup;

// ** user sign in */
const user_signin = async function (req, res) {
    const body = req.body

    AuthModel.userSignin(body, (err, response) => {
        if (err) {
            if (err.sqlMessage != undefined) {
                return res.send({
                    status: CONFIG.status_zero,
                    message: err.sqlMessage
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: (err.message != undefined ? err.message : "Something went wrong.")
                });
            }
        } else {
            if (response.success) {
                bcrypt.compare(body.password, response.data.password, function (bcrypt_err, res_bcrypt) {

                    console.log(res_bcrypt);
                    if (bcrypt_err) {
                        return res.send({
                            status: CONFIG.status_zero,
                            message: bcrypt_err
                        });
                    } else {
                        if (res_bcrypt) {
                            var token = jwt.sign({ id: response.data.id, login_token : response.data.login_token }, CONFIG.jwt_encryption);
                            res.setHeader('Token', token);
                            response.data.token = token;
                            delete response.data.password;

                            return res.send({
                                status: CONFIG.status_one,
                                message: response.message,
                                data : response.data
                            });
                        } else {
                            return res.send({
                                status: CONFIG.status_zero,
                                message: "Invalid password"
                            });
                        }
                    }
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: response.message
                });
            }
        }
    })
}
module.exports.userSignin = user_signin;

// ** add products */
const add_products = async function (req, res) {

    AuthModel.addProduct(req.body, (err, response) => {
        if (err) {
            if (err.sqlMessage != undefined) {
                return res.send({
                    status: CONFIG.status_zero,
                    message: err.sqlMessage
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: (err.message != undefined ? err.message : "Something went wrong.")
                });
            }
        } else {
            if (response.success) {
                return res.send({
                    status: CONFIG.status_one,
                    message: response.message,
                    data : response.data
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: response.message
                });
            }
        }
    });
}
module.exports.addProduct = add_products;

// ** get products */
const get_products = async function (req, res) {

    AuthModel.getProduct(req.body, (err, response) => {
        if (err) {
            if (err.sqlMessage != undefined) {
                return res.send({
                    status: CONFIG.status_zero,
                    message: err.sqlMessage
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: (err.message != undefined ? err.message : "Something went wrong.")
                });
            }
        } else {
        	if (response.success) {
	            return res.send({
	                status: CONFIG.status_one,
	                message: response.message,
                    data : response.data
	            });
        	} else {
        		return res.send({
	                status: CONFIG.status_zero,
	                message: response.message
	            });
        	}
        }
    });
}
module.exports.getProduct = get_products;

// ** edit product** /
const edit_product = async function (req, res) {

    AuthModel.editProduct(req.body, (err, response) => {
        if (err) {
            if (err.sqlMessage != undefined) {
                return res.send({
                    status: CONFIG.status_zero,
                    message: err.sqlMessage
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: (err.message != undefined ? err.message : "Something went wrong.")
                });
            }
        } else {
            if (response.success) {
                return res.send({
                    status: CONFIG.status_one,
                    message: response.message,
                    data : response.data
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: response.message
                });
            }
        }
    });
}
module.exports.editProduct = edit_product;

// ** delete product ** /
const delete_product = async function (req, res) {

    AuthModel.deleteProduct(req.body, (err, response) => {
        if (err) {
            if (err.sqlMessage != undefined) {
                return res.send({
                    status: CONFIG.status_zero,
                    message: err.sqlMessage
                });
            } else {
                return res.send({
                    status: CONFIG.status_zero,
                    message: (err.message != undefined ? err.message : "Something went wrong.")
                });
            }
        } else {
        	if (response.success) {
	            return res.send({
	                status: CONFIG.status_one,
	                message: response.message,
	            });
        	} else {
        		return res.send({
	                status: CONFIG.status_zero,
	                message: response.message
	            });
        	}
        }
    });
}
module.exports.deleteProduct = delete_product
