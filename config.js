var env = process.env.NODE_ENV || 'development'

var config = {
    development: require('./config/dev.js'),
    production: require('./config/prd.js'),
    staging: require('./config/prd.js')
}

module.exports = config[env]