document.getElementById('nelorManage').onclick = function(event){
	document.getElementById('welcome').style = 'display:none;'
	document.getElementById('otherBox').style = 'display:none;'
	document.getElementById('manage').style = 'display:block;'
	if(event.target.getAttribute('class') === 'active'){ return }
	const hasActive = event.target.parentNode.getElementsByClassName('active')[0]
	if(hasActive){
		hasActive.setAttribute('class', '')
	}
	event.target.setAttribute('class', 'active')
	const param = {
		transCode: '00103'
	}
	tianzun.ajax(param, (data) => {
		data = JSON.parse(data)
		let html = `<a id='addBook'>新增书籍</a><h3>书籍列表</h3><ul id='bookList'>`
		if(data.books){
			data.books.forEach((book, index) => {
				html += `
				<li class='book'>
                        <div class='listTop'>
                            <span>${index+1}</span>
                            <span>${book.name}</span>
                            <span class='edit_book'>编辑</span>
                        </div>
                        <div class="listBottom">
                            <form action="#" id='bookInfo' data-id='${book.id}' class="hide">
                                <a class='closeForm'>&times;</a>
                                <h3>书籍的详细信息：</h3>
                                <label for="author">作者：<input type="text"  name='author' readonly value="${book.author}" /></label>
                                <label for="img">海报：<input type="text"  name='img' readonly value="${book.img}" /></label>
                                <label for="category">分类：<input  type="text"  name='category' readonly value="${book.category}" /></label><br/><br/>
                                <label for="descript">分类：<br/><textarea  form='bookInfo' readonly name='descript' >${book.descript}</textarea></label>
                                <label>
                                    <a class='edit'>编辑</a>
                                    <a class='submit'>提交</a>
                                    <a class='editChapter' data-id='${book.id}'>编辑章节</a>
                                </label>
                            </form>
                        </div>
                     </li>`;
			})
		}
		html += "</ul>";
		document.getElementById('manage').innerHTML = html;
	}, (err) => {
		console.log(err)
	})
}

document.getElementById('manage').onclick = (event) => {
	const target = event.target
	const eleClass = target.getAttribute('class')
	const element = document.getElementById('bookList').getElementsByClassName('show')[0]
	if(target.getAttribute('id') == 'addBook'){ document.getElementById('bookModal').style = 'display:block;' }
	switch(eleClass){
		case 'edit_book':
			if(element){
				const eleClass = element.getAttribute('class')
				element.setAttribute('class',eleClass.replace('show','hide') )
			}
			const parent = target.parentNode.parentNode
			const form = parent.getElementsByTagName('form')[0];
			form.setAttribute('class', form.getAttribute('class').replace('hide', 'show'))
			break;
		case 'edit':
			changeEdit(target, 'edit')
			break;
		case 'closeForm':
			if(element){
				const eleClass = element.getAttribute('class')
				element.setAttribute('class',eleClass.replace('show','hide') )
			}
			break;
		case 'submit':
			submitHandle(target)
			break;
		case 'editChapter':
			showChapter(target);
			break;
	}
}

const showChapter = (target) => {
	document.getElementById('modal').style = 'display:block;'
	const id = target.getAttribute('data-id')
	const param = {
		transCode: '00104',
		id,
	}
	tianzun.ajax(param, (data) => {
		data = JSON.parse(data)
		let tempHtml = `<li>
                    <span>章节</span>
                    <span>章节名</span>
                    <span>操作</span>
                </li>`
		data.chapters.forEach( (chapter) => {
			tempHtml += `
			<li>
                    <span><input type="text" name='chapter' id='chapter' readonly value="${chapter.chapter}" /></span>
                    <span><input type="text" name='chapter_name' id='chapter_name' readonly value="${chapter.chapterName}" /></span>
                    <span class='edit_chapter'><a class='edit_chapter'>编辑</a></span>
                    <div class="chapter_info">
                        <textarea name="info" id="info" >${chapter.info}</textarea>
                    <div><a id='save_info' data-id='${chapter.id}' >保存</a><a class='cancel_chapter'>取消</a></div>
                    </div>
                </li>`;
		})
		document.getElementById('chapter').innerHTML = tempHtml
	}, (err) => {
		console.log(err)
	})
}

const getAllInputs = (parent) => {
	const input = parent.getElementsByTagName('input')
	const textarea = parent.getElementsByTagName('textarea')
	const targets = Array.from(input).concat(Array.from(textarea))
	return targets
}
const changeEdit = (target, flage) => {
	const parent = target.parentNode.parentNode
	const targets = getAllInputs(parent)
	parent.getElementsByClassName('submit')[0].setAttribute('data-state','active')
	targets.forEach( (element) => {
		element.removeAttribute('readonly')
		element.style.borderColor = 'rgba(6,6,6,0.8)'
	})
}

const submitHandle = (target) => {
	let isEffective = true;
	const parent = target.parentNode.parentNode
	const isActive = parent.getElementsByClassName('submit')[0].getAttribute('data-state')
	if(isActive !== 'active'){
		return alert('请修改后再提交！！！')
	}
	const targets = getAllInputs(parent).map( (element) => [element.name, element.value] )
	const param = {
		transCode: '00107',
		info: {}
	}
	targets.forEach( (item) => {
		if(!item[1]){ isEffective = false }
		param.info[item[0]] = item[1] 
	})
	if(!isEffective){
		return alert('请输入有效数据！！！')
	}
	param.id = parent.getAttribute('data-id')
	tianzun.ajax(param, (data) => {
		data = JSON.parse(data)
		if(data.errCode === '0000'){
			alert('保存失败请重试！！！')
		}
		alert('保存成功！！！')
	}, (err) => {
		console.log(err)
	})
}

document.getElementById('closeModal').onclick = () => document.getElementById('modal').style = 'display:none;'
document.getElementById('closebookModal').onclick = () => document.getElementById('bookModal').style = 'display:none;'

const changeEditChapter = (event, flag) => {
	const target = event.target;
	let parent = target.parentNode;
	while(parent.nodeName !== "LI"){
		parent = parent.parentNode;
	}
	const inputs = Array.from(parent.getElementsByTagName('input'))
	inputs.forEach((element) => {
		if(flag === 'edit_chapter'){
			element.removeAttribute('readonly')
			element.style.borderColor = 'rgba(6,6,6,0.8)'
		}
		if(flag === 'cancel_chapter'){
			element.setAttribute('readonly','')
			element.style.borderColor = 'rgba(6,6,6,0)'
		}
	})
	if(flag === 'edit_chapter'){
		parent.getElementsByClassName('chapter_info')[0].style = 'display: block;';
	}
	if(flag === 'cancel_chapter'){
		parent.getElementsByClassName('chapter_info')[0].style = 'display: none;';
	}
}

document.getElementById('chapter').onclick = (event) => {
	if(event.target.getAttribute('class') === 'edit_chapter'){
		return changeEditChapter(event, 'edit_chapter')
	}
	if(event.target.getAttribute('class') === 'cancel_chapter'){
		return changeEditChapter(event, 'cancel_chapter')
	}
	if(target.getAttribute('id') === 'save_info'){
		let isEffective = true
		const target = event.target
		const parent = target.parentNode.parentNode.parentNode;
		const inputs = Array.from(parent.getElementsByTagName('input'))
		const textarea = Array.from(parent.getElementsByTagName('textarea'))
		const targets = inputs.concat(textarea).map( (element) => [element.name, element.value] )
		const param = {
			transCode: '00108',
			id: '',
			info:{}
		}
		targets.forEach( (item) => {
			if(!item[1]){ isEffective = false }
			param.info[item[0]] = item[1] 
		})
		if(!isEffective){
			return alert('请输入有效数据！！！')
		}
		param.id = target.getAttribute('data-id')
		tianzun.ajax(param, (data) => {
			data = JSON.parse(data)
			if(data.errCode === '0000'){
				return alert('保存失败请重试！！！')
			}
			return alert('保存成功！！！')
		}, (err) => {
			console.log(err)
		})
	}
}

document.getElementById('add_book').onclick = (event) => {
	let isEffective = true
	const parent = event.target.parentNode.parentNode
	const inputs = parent.getElementsByTagName('input')
	const textarea = parent.getElementsByTagName('textarea')
	const targets = Array.from(inputs).concat(Array.from(textarea)).map( 
		(element) => {
			if(!element.value) { isEffective=false }
			return [element.name, element.value]
		})
	if(!isEffective){
		return alert('请输入有效数据！！！')
	}
	const param = {
		transCode: '00110',
		info: {}
	}
	targets.forEach( (item) => {
		if(item[0] === 'name'){ param[item[0]] = item[1] }
		param.info[item[0]] = item[1]
	})
	tianzun.ajax(param, (data) => {
		data = JSON.parse(data)
		if(data.result){
			return alert('保存成功！！！')
		}
	}, (err) => {
		console.log(err)
	})


}

document.getElementById('saveChapter').onclick = (event) => {
	let isEffective = true
	const parent = document.getElementById('addChapter')
	const inputs = parent.getElementsByTagName('input')
	const textarea = parent.getElementsByTagName('textarea')
	const targets = Array.from(inputs).concat(Array.from(textarea))
	const param = {
		transCode: '00109',
		id: '',
		info: {}
	}
	targets.map( (element) => [element.name, element.value]).forEach( (item)  => {
		if(!item[1]){ isEffective = false }
		param.info[item[0]] = item[1]
	})
	if(!isEffective){
		return alert('请输入有效数据！！！')
	}
	param.id = event.target.getAttribute('data-id')
	tianzun.ajax(param, (data) => {
		data = JSON.parse(data)
		if(data.errCode === '0000'){
			return alert('保存失败请重试！！！')
		}
		if(data.hasErrorInfo){
			return alert(data.hasErrorInfo)
		}
		return alert('保存成功！！！')
	}, (err) => {
		console.log(err)
	})
}

document.getElementById('add_chapter').onclick = () => document.getElementById('addChapter').style = 'display:block;'
document.getElementById('cancel_add').onclick = () => document.getElementById('addChapter').style = 'display:none;'
document.getElementById('other').onclick = (event) => {
	document.getElementById('welcome').style = 'display:none;'
	document.getElementById('manage').style = 'display:none;'
	document.getElementById('otherBox').style = 'display:inline-block;'
}
























