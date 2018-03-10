let login = require('../api/login');
let showBooks = require('../api/showBooks');

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
    }
}

module.exports = route;