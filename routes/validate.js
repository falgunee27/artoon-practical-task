const BaseJoi       = require('@hapi/joi');
const Extension     = require('@hapi/joi-date');
const Joi           = BaseJoi.extend(Extension);
const async         = require("async");
var CONFIG          = require('../config/config');
var db              = require('../config/dbconnection');

/** User signup validation */
user_signup = (req, res, next) => {

    // fetch the request data
    const data = { email: req.body.email, name : req.body.name, password: req.body.password};

    // define the validation schema
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    // validate the request data against the schema
    const { error, value } = schema.validate(data);

    if (error) {
        // send a 200 error response if validation fails
        res.status(200).json({
            status: CONFIG.status_zero,
            message: error.details[0].message
        });
    } else {
        db.query('SELECT id, email, name FROM users WHERE email = ? LIMIT 1', [data.email], function (err, result) {
            if (err) {
                callback(err);
            } else {
                if (result.length > 0) {
                    return res.send({
                        status: CONFIG.status_zero,
                        message: "Email registered already"
                    });
                } else {
                    next();
                }
            }
        });
    }
}


/** User login validation */
user_signin = (req, res, next) => {
    /** Validate Request Params */
    const data = { email: req.body.email, password: req.body.password};

    // define the validation schema
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    // validate the request data against the schema
    const { error, value } = schema.validate(data);

    if (error) {
        // send a 200 error response if validation fails
        res.status(200).json({
            status: CONFIG.status_zero,
            message: error.details[0].message
        });
    } else {
        next();
    }
}

// ** add Products */
add_product = (req, res, next) => {

    const data = {name : req.body.name, price : req.body.price, quantity : req.body.quantity};

    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
    });

    const {error ,value} = schema.validate(data);
    
    if (error) {
        res.status(200).json({
            status: CONFIG.status_zero,
            message: error.details[0].message
        });
    } else {
       next();
    }
}

edit_product = (req, res, next) => {
    const data = {product_id: req.body.product_id, name: req.body.name, price: req.body.price, quantity: req.body.quantity};

    const schema = Joi.object({
        product_id : Joi.number().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
    });

    const {error ,value} = schema.validate(data);
    
    if (error) {
        res.status(200).json({
            status: CONFIG.status_zero,
            message: error.details[0].message
        });
    } else {
       next();
    }
}

// ** delete product */
delete_product = (req, res, next) => {
    const data = {product_id: req.body.product_id};

    const schema = Joi.object({
        product_id : Joi.number().required(),
    });

    const {error ,value} = schema.validate(data);
    
    if (error) {
        res.status(200).json({
            status: CONFIG.status_zero,
            message: error.details[0].message
        });
    } else {
       next();
    }
}

const validateInfo = {};
validateInfo.userSignup             = user_signup;
validateInfo.userSignin             = user_signin;
validateInfo.addProduct             = add_product;
validateInfo.editProduct            = edit_product;
validateInfo.deleteProduct          = delete_product;
module.exports = validateInfo;