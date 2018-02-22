let login = require('../api/login');

var route = function(data, response) {
    console.log(data)
    const transCode = data.transCode;
    switch(transCode) {
        case '00102':
            login(data, response);
            break;
    }
}

module.exports = route;