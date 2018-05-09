const mysql_connect = require('./common/mysql_connect')

function addBookChapter(data, response){
	const connect = mysql_connect();
	let completeDate = true;
	let resp = {}
	if(!data.id || !data.info.chapter || !data.info.chapter_name || !data.info.info){
		completeDate = false;
	}
	if(!completeDate){
		response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		resp.hasErrorInfo = '无效数据无法保存！！！';
		response.end(JSON.stringify(resp));  
	}
	const sql = `INSERT INTO book_chapter VALUES(NULL, '${data.id}', '${data.info.chapter}', '${data.info.chapter_name}', '${data.info.info}');`;
	connect.query(sql, (err, result) => {
		console.log(err, result)
		if(err){
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

module.exports = addBookChapter;