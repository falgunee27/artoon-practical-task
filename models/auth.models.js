var async = require("async");
var CONFIG   = require('../config/config');
var db = require('../config/dbconnection');
const bcrypt = require('bcrypt');

//** User Signup */
const user_signup = async function (data, callback) {
    db.query('INSERT INTO users SET ?', [data], function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.affectedRows > 0) {
                data.id = result.insertId;
                db.query('SELECT id, name, email FROM users WHERE id = ?', [result.insertId], function (err, user_result) {
                    if (err) {
                        callback(err);
                    } else { 
                        if (user_result.length > 0) {                                     
                            let response = {
                                success: true,
                                message: "User signed up successfully",
                                data : user_result[0]
                            }
                            callback(null, response);
                        } else {
                            let response = {
                                success: false,
                                message: "Failed to fetch user's details"
                            }
                            callback(null, response);
                        }
                    }
                });
            } else {
                let response = {
                    success: false,
                    message: "Failed to signup"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.userSignup = user_signup;

// ** User Signin */
const user_signin = async function (data, callback) {

    db.query('SELECT id, name, email, password FROM users WHERE email = ? ORDER BY id DESC LIMIT 1;', [data.email], function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length > 0) {
            
                result[0].id = result[0].id == null ? "" : result[0].id;    
                result[0].name = result[0].name == null ? "" : result[0].name;
                result[0].email = result[0].email == null ? "" : result[0].email;

                let response = {
                    success: true,
                    message: "User has signed in successfully",
                    data : result[0]
                }
                callback(null, response);
            } else {
                let response = {
                    success: false,
                    message: "Opps, account from this email address does not exist"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.userSignin = user_signin;

// ** add products*/
const add_products = async function (data, callback) {

    var insert_data = {
        name  : data.name,
        price   : data.price,
        quantity : data.quantity
    }
    db.query('INSERT INTO products SET ? ;',[insert_data], function (err, result) {
        if(err) {
            callback(err);
        } else {
            if (result.affectedRows > 0) {
                let response = {
                    success: true,
                    message: "Product added successfully"
                }
                callback(null, response);
            } else {
                let response = {
                    success: false,
                    message: "Failed to add product, please try again"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.addProduct = add_products;


// ** Get all products */
const get_products = async function (data, callback) {

    db.query('SELECT * FROM products' , function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length > 0) {

                async.eachSeries(result, function(product, next) {

                    product.id          = product.id
                    product.name        = product.name == null ? "" :product.name;
                    product.price       = product.price == null ? 0 :product.price;
                    product.quantity    = product.quantity == null ? 0 :product.quantity;
                    
                    next();

                }, function(err_es) {
                    if (err_es) {
                        var response = {
                            success: false,
                            message: err_es
                        }
                    } else {
                        var response = {
                            success: true,
                            message: "products found sussessfully",
                            data: result
                        }
                    }
                    callback(null, response);
                })
            } else {
                let response = {
                    success: false,
                    message: "No product available"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.getProduct = get_products;

// ** edit product ** /
const edit_product = async function (data, callback) {

    var update_data = {
        name   : data.name,
        price   : data.price,
        quantity   : data.quantity,
    }

    db.query('UPDATE products SET ? WHERE id = ? LIMIT 1 ;', [update_data,data.product_id], function (err, result) {
        if(err) {
            callback(err);
        } else {

            if (result.affectedRows > 0) {
                let response = {
                    success: true,
                    message: "Product has been updated successfully"
                }
                callback(null, response);
            } else {
                let response = {
                    success: false,
                    message: "Failed to update product"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.editProduct = edit_product;

// ** delete product ** /
const delete_product = async function (data, callback) {

    db.query('DELETE FROM products WHERE id = ? LIMIT 1 ;', [data.product_id], function (err, result) {
        if(err) {
            callback(err);
        } else {

            if (result.affectedRows > 0) {
                let response = {
                    success: true,
                    message: "Product deleted successfully"
                }
                callback(null, response);
            } else {
                let response = {
                    success: false,
                    message: "Failed to delete, please try again"
                }
                callback(null, response);
            }
        }
    });
}
module.exports.deleteProduct = delete_product;