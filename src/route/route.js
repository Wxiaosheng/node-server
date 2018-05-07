const login = require('../api/login')
const showBooks = require('../api/showBooks')
const showchapters = require('../api/showCharters')
const addOrUpdata = require('../api/addOrUpdata')
const getBooksBuUser = require('../api/getBooksByUser')
const updateBookInfo = require('../api/updateBookInfo')
const updateBookChapter = require('../api/updateBookChapter')
const addBookChapter = require('../api/addBookChapter');


var route = function(data, response) {
    const transCode = data.transCode;
    switch(transCode) {
        case '00102': // 登录接口
            login(data, response);
            break;
        case '00103': // 所有书籍接口
            showBooks(data, response);
            break;
        case '00104': // 指定书籍下的 所有章节
            showchapters(data, response);
            break;
        case '00105': // 添加章节
            addOrUpdata(data, response);
            break;
        case '00106': // 当前用户下的所有书籍
            getBooksBuUser(data, response);
            break;
        case '00107': // 更新当前书籍信息
            updateBookInfo(data, response);
            break;
        case '00108': // 更新当前的章节内容
            updateBookChapter(data, response);
            break;
        case '00109': // 新增章节
            addBookChapter(data, response);
            break;

    }
}

module.exports = route;