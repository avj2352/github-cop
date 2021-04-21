const config = require('config');
const serverConfig = config.get('server');

function secret () {
    return process.env.PORT || serverConfig.secret;
}

module.exports = secret;