var mysql = require('mysql');
var CONFIG = require("./config");

var pool = mysql.createPool({
	host: CONFIG.db_host,
	user: CONFIG.db_user,
	password: CONFIG.db_password,
	database: CONFIG.db_name,
    connectionLimit: 5, //mysql connection pool length
});

module.exports = pool;