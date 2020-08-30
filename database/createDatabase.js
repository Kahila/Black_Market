var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: "8889"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to server\n");
    
    //dropping the database if it exists
    var drop = "DROP DATABASE market";
    connection.query(drop, function(err, result){
        if (err){
            console.log("Error dropping database");
            // return;
        }else{
            console.log("Database has been dropped");
        }

        //creating a new database
        var createDatabase = "CREATE DATABASE market";
        connection.query(createDatabase, function(err, result){
            if (err){
                console.log("New Database could not be created");
                return;
            }
            else{
                 console.log("Success: Database market created");
            }
        });

        //creating the users table
        var userTable = "CREATE TABLE market.users (email VARCHAR(100) PRIMARY KEY, username VARCHAR(30), password VARCHAR(1000), account_verified VARCHAR(7))";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("Error creating users table");
                return;
            }
            else{
                 console.log("Success: user Table Created");
            }
        });

        //creating the product table
        var productTable = "CREATE TABLE market.products (user_email VARCHAR(100), product_name VARCHAR(100), product_price INT, product_description VARCHAR(200), product_image1 VARCHAR(100), product_image2 VARCHAR(100), product_image3 VARCHAR(100))";
        connection.query(productTable, function(err, result){
            if (err){
                console.log("Error creating products table");
                return;
            }
            else{
                 console.log("Success: products Table Created");
            }
        });
    });
  });