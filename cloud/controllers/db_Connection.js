var mysql = require("mysql");

exports.query = function(table){
    var connection=mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"exyman@mysql",
        database:"275_lab2"
    });
    var sql= "SELECT * FROM "+table;
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    connection.query(sql,function(err,results){
        if(err){
            console.error("error quering: "+err.stack);
            return;
        }
        console.log(results);
    });
}

