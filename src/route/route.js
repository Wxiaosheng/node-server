let login = require('../api/login');
let showBooks = require('../api/showBooks');
let showchapters = require('../api/showCharters');
let addOrUpdata = require('../api/addOrUpdata');

var route = function(data, response) {
    console.log(data)
    const transCode = data.transCode;
    switch(transCode) {
        case '00102':
            login(data, response);
            break;
        case '00103':
            showBooks(data, response);
            break;
        case '00104':
            showchapters(data, response);
            break;
        case '00105':
            addOrUpdata(data, response);
            break;
    }
}

module.exports = route;