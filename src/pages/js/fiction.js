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
        transCode: '00104'
    }
    tianzun.ajax(param, (data) => {
        data = JSON.parse(data)
        var html = document.getElementById('chapterList').innerHTML;
        data.responseBody.chapters.forEach((charpter) => {
            html += `<tr>
                   <th>${charpter.b_chapter}</th>
                   <th>${charpter.b_chapter_name}</th>
                   <td onclick='eidtCharter()' data-code='${charpter.b_id}'>编辑</td>
               </tr> `
        })
    })
}

window.eidtCharter = () => {

}