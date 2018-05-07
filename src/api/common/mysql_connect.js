function mysql_connect(){
	var mysql = require('mysql');
	var constant = require('../../constant/constant')

	var connection = mysql.createConnection({
	        host     : constant.DB_HOST_NAME,
	        user     : constant.DB_USER,
	        password : constant.DB_PWD,
	        database : constant.DB_NAME
	});
	return connection
}

module.exports = mysql_connect