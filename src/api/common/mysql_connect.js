function mysql_connect(){
	var mysql = require('mysql');
	var constant = require('../../constant/constant')

	var connection = mysql.createConnection({
	        host     : constant.DB_HOST_NAME,
	        user     : constant.DB_USER,
	        password : constant.DB_PWD,
	        database : constant.DB_NAME,
	        multipleStatements: true // 支持执行多条 sql 语句
	});
	return connection
}

module.exports = mysql_connect