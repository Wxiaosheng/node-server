const mysql_connect = require('./common/mysql_connect')

function addBook(data, response){
	let resp = {}
	let completeDate = true
	const connect = mysql_connect()
	response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'})
	if(!completeDate){
		resp.hasErrorInfo = '无效数据！！！'
		response.end(JSON.stringify(resp))
	}
	connect.query('SELECT COUNT(b_id) FROM books;', (err, result) => {
		if(err){
			resp.hasErrorInfo = '数据库错误！！！'
			resp.err = err
			response.end(JSON.stringify(resp))
		}
		console.log(result)
		const b_id = getBID(result[0]['COUNT(b_id)'])
		const sql1 = `INSERT INTO books VALUES(NULL, '${b_id}', '${data.name}');`
		console.log(sql1)
		connect.query(sql1, (err, result) => {
			if(err){
				resp.hasErrorInfo = '数据库错误！！！'
				resp.err = err
				response.end(JSON.stringify(resp))
			}
			const sql2 = `INSERT INTO book_info VALUES(NULL, '${b_id}', '${data.info.author}', '${data.info.img}', '${data.info.category}', '${data.info.descript}');`
			console.log(sql2)
			connect.query(sql2, (err, result) => {
				if(err || result.affectedRows  != 1){
					resp.hasErrorInfo = '数据库错误！！！'
					resp.err = err
					response.end(JSON.stringify(resp))
				}
				resp.errCode = ''
				resp.result = 'success'
				response.end(JSON.stringify(resp))
			})		
		})
	})
}

const getBID = (index) => {
	let result = (index + 1 )+ ''
	while(result.length < 4){
		result = '0' + result
	}
	return result
}

module.exports = addBook