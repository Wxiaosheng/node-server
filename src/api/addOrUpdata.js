var mysql = require('mysql');

function addOrUpdata(data, response){
    console.log(data.type)
    var connect = mysql.createConnection({
        host     : '106.15.201.255',
        user     : 'root',
        password : '123456',
        database : 'bookbase'
    })
    var sql = '';
    if(data.type == 'add'){
        sql = `INSERT INTO chapter VALUE(
            NULL, '${data.code}', '${data.No}', '${data.title}', '${data.info}'
        )`
        console.log(sql)
        connect.query(sql, (err, result) => {
            if (err) console.log(err)
            console.log(result)
        })
    }
    if(data.type == 'updata'){
        
    }
}

module.exports = addOrUpdata;