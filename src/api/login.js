var mysql = require('mysql');

 var login = function(data, response) {
    var { userName, pwd } = data;
    var resp = '';
    var connection = mysql.createConnection({
            host     : '106.15.201.255',
            user     : 'root',
            password : '123456',
            database : 'bookbase'
        });
    var sql = `SELECT u_pwd FROM b_user where u_name='${userName}'`;
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
        if(result.length < 1){
            resp = JSON.stringify({
                errCode: 0,
                errMessage: '无此用户'
            });
            response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
            response.end(resp);  
        }else{
            if(result[0]['u_pwd'] == pwd){
                resp = JSON.stringify({ errCode:1, errMessage:'' });
                response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
                response.end(resp);
            }else{
                resp = JSON.stringify({
                    errCode: 0,
                    errMessage: '密码错误'
                });
                response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
                response.end(resp);   
            }
        }  
    })
}

module.exports = login;