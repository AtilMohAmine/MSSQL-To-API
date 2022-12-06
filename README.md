# MSSQL-To-API
Convert any Microsoft SQL Server to CRUD API using NodeJS. You can use it to Create, Read, Update or Delete data from any tables, Getting data from views.


## Getting started

### Instalation

``` sh
$ npm i
```

### Configuration

You must add you SQL Server login credentials in the file *'/db/connect.js'*.


``` js
...
// config for your database
var config = {
    user: 'USERNAME',
    password: 'PASSWORD',
    server: 'HOST', 
    database: 'DB_NAME',
    trustServerCertificate: true 
};
...
```

### Starting the API


``` sh
$ npm start
```

## 
