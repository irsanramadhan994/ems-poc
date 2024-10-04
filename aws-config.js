var env = process.env.NODE_ENV || 'development'
var awsexportconfig = {
    development: require('./aws-exports.js'),
    production: require('./aws-exports.js'),
    staging: require('./aws-exports.js')
}
module.exports = awsexportconfig[env]