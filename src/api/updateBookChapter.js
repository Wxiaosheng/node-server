const mysql_connect = require('./common/mysql_connect')

function updateBookChapter(data, response){
	const connect = mysql_connect();
	const key_val = Object.entries(data.info);
	let completeDate = true;
	let sets = '';
	let resp = {}
	key_val.forEach( (item) => {
		if(!item[1]){ completeDate = false }
		sets += ` b_${item[0]}='${item[1]}',`;
	})
	if(!completeDate){
		response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		resp.hasErrorInfo = '无效数据！！！';
		response.end(JSON.stringify(resp));  
	}
	sets = sets.substring(0, sets.length-1);
	const sql = `UPDATE book_chapter SET${sets} WHERE b_id='${data.id}';`;
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

module.exports = updateBookChapter;