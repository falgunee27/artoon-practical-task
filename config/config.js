require('dotenv').config();//instatiate environment variables

let CONFIG = {}

CONFIG.app          = process.env.APP   || 'development';
CONFIG.port         = process.env.PORT  || 4040;
CONFIG.appName      = process.env.APP_NAME  || 'Artoon Practical Test';

//** MySQL Creds */
CONFIG.db_host      = process.env.DB_HOST       || '';
CONFIG.db_port      = process.env.DB_PORT       || '';
CONFIG.db_name      = process.env.DB_NAME       || '';
CONFIG.db_user      = process.env.DB_USER       || '';
CONFIG.db_password  = process.env.DB_PASSWORD   || '';

//** JWT Creds */
CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || '';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '';

//** salt for hash password */
CONFIG.salt_round = 10

//** Status Codes */
CONFIG.status_zero  			= process.env.STATUS_ZERO || 0; //If error
CONFIG.status_one   			= process.env.STATUS_ONE  || 1; //If success

module.exports = CONFIG;