var sql = require("mssql")

// config for your database
var config = {
    user: 'USERNAME',
    password: 'PASSWORD',
    server: 'HOST', 
    database: 'DB_NAME',
    trustServerCertificate: true 
};

// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

});

module.exports = sql
