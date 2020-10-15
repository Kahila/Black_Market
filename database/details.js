var mysql = require('mysql');
const bcrypt = require('bcrypt');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: "8889"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to server\n");

        //creating sudo users
        var userTable = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('vikash@gmail.com', 'vikash','"+ bcrypt.hashSync('123456', 10)+"', '0')";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("ERROR inserting into table");
                return;
            }
            else{
                 console.log("Success: user added to table");
            }
        });


        var userTable = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('sudo@gmail.com', 'sudo','"+ bcrypt.hashSync('123456', 10)+"', '0')";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("ERROR inserting into table");
                return;
            }
            else{
                 console.log("Success: user added to table");
            }
        });

        var userTable = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('adonis7121@gmail.com', 'adonis','"+ bcrypt.hashSync('123456', 10)+"', '0')";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("ERROR inserting into table");
                return;
            }
            else{
                 console.log("Success: user added to table");
            }
        });

        var userTable = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('kenwood@gmail.com', 'kenwood','"+ bcrypt.hashSync('1q2w3e4r5', 10)+"', '0')";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("ERROR inserting into table");
                return;
            }
            else{
                 console.log("Success: user added to table");
            }
        });

        var userTable = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('natasha@gmail.com', 'natasha','"+ bcrypt.hashSync('3505050', 10)+"', '0')";
        connection.query(userTable, function(err, result){
            if (err){
                console.log("ERROR inserting into table");
                return;
            }
            else{
                 console.log("Success: user added to table");
            }
        });

        //creating the product table
        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'database principles', '250', 'https://media.takealot.com/covers_tsins/37780426/2348c39c964f1cb8f8bd7f8bfa890e8b-pdpxl.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'physics principles', '200', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5828/9780582820326.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'calculus early trans', '900', 'https://images-na.ssl-images-amazon.com/images/I/41XZVHND-aL._SX423_BO1,204,203,200_.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'molecular biology', '230', 'https://images-na.ssl-images-amazon.com/images/I/41W7P8HZ35L._SX379_BO1,204,203,200_.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'forensic medicine', '660', 'https://kbimages1-a.akamaihd.net/36114a8a-e2ef-48da-a49b-3a8afb6cb962/1200/1200/False/handbook-of-forensic-medicine.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'computer networking', '450', 'https://image.isu.pub/200207142005-cf022bf90b8c3b2533d6a56317723083/jpg/page_1.jpg')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });

        var productTable = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('adonis7121@gmail.com', 'clinical psychology', '250', 'https://static.raru.co.za/cover/2017/08/03/5798477-l.jpg?v=1501714800')";
        connection.query(productTable, function(err, result){
           if (err){
                console.log("ERROR adding product");
                return;
            }
            else{
                 console.log("Success: product added");
            }
        });
    });