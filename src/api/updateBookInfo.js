const mysql_connect = require('./common/mysql_connect')

function updateBookInfo(data, response){
	const connect = mysql_connect();
	const key_val = Object.entries(data.info);
	let sets = '';
	let resp = {};
	key_val.forEach( (item) => sets += ` b_${item[0]}='${item[1]}',` );
	sets = sets.substring(0, sets.length-1);
	let sql = `UPDATE book_info SET ${sets} WHERE b_id='${data.id}';`;
	console.log(sql)
	connect.query(sql, (err, result) => {
		if(err || result.affectedRows == '0'){
			resp = { 
				errCode:'0000',
				result: ''
			}
		}else{
			resp = {
				errCode: '',
				result: 'success'
			}
		}
		response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
   		response.end(JSON.stringify(resp));  
		
	})
}

module.exports = updateBookInfo;