window.onload = function(){
    var param = {
        transCode: '00103'
    }
    tianzun.ajax(param, (data) => {
        data = JSON.parse(data);
        var books = data.responseBody.books;
        var html = '';
        books.forEach((book) => {
            html += `<tr>
                <td>${book.id}</td>
                <td>${book.b_name}</td>
                <td onclick='eidtBook()' data-code='${book.b_id}'>编辑</td>
            </tr>`;
        });
        document.getElementById('bookList').innerHTML = html;
    }, (error) => {}
    )
}
window.eidtBook = () => {
    console.log('编辑')
    var param = {
        'transCode': '00104'
    }
    tianzun.ajax(param, (data) => {
        data = JSON.parse(data)
        console.log(data)
        var charpters = document.getElementById('chapterList')
        var html = charpters.innerHTML;
        data.responseBody.chapters.forEach((charpter) => {
            html += `<tr>
                   <td>${charpter.b_chapter}</td>
                   <td>${charpter.b_chapter_name}</td>
                   <td>
                    <a onclick='eidtCharter("${charpter.b_id}")'>编辑</a>
                    <a onclick='showAdd("${charpter.b_id}")'>新增</a>
                   </td>
               </tr> `
        })
        charpters.innerHTML = html;
        document.getElementById('chapter').style.display = 'block';
    })
}

window.eidtCharter = (code) => {
    var param = {
        'transCode': '00104',
        'code': code,
    }
    tianzun.ajax(param, (data) => {
        data = JSON.parse(data)
        var chaLsit = document.getElementById('chaLsit')
        var html = chaLsit.innerHTML
        data.responseBody.chapters.forEach((charpter) => {
            html += `<li>
            <span>章节</span>
            <input class='readonly' readonly value="${charpter.b_chapter}" />
        </li>
        <li>
            <span>章节名</span>
            <input class='readonly' readonly value="${charpter.b_chapter_name}" />
        </li>
        <li>
            <span>内容</span>
            <textarea class='readonly' readonly  cols="100" rows="10">${charpter.info}</textarea>
        </li>`
        })
        chaLsit.innerHTML = html
    })
}

window.addCharter = () => {
    var code = document.getElementById('addCharpter').getAttribute('data-code')
    var add = document.getElementsByClassName('add')
    var param = {
        'transCode': '00105',
        'code': code,
        'type': 'add',
        'No': add[0].value,
        'title': add[1].value,
        'info': add[2].value 
    }
    tianzun.ajax(param, (data) => {
        console.log(data)
    })

}

window.showAdd = (code) => {
    document.getElementById('addCharpter').style.display = 'block';
    document.getElementById('addCharpter').setAttribute('data-code',code)
} 