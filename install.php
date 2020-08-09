<html>
    <body>
    <div class="nav" style="margin-top: 10px;">
            <a href="login.php" >Sign Out</a>
            <a href="index.php" style="float: left;">Home/logo</a>
            <!-- <input type="text" placeholder="search"> -->
        </div>
    </body>
</html>

<?php
    require_once 'core/init.php';

    $servername = "localhost";
    $username = 'root';
    $password = 'root';
    $db_name = 'market';

    // connecting to the mysqli server
    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error){
        die("<h4>failed to connect to $db_name");
    }else if (!$conn->connect_error){
        // if connected is made, a new database will be created
        echo "<h3>CONNECTED TO SERVER: $servername<br><br>";
        if ($conn->query('DROP DATABASE '.$db_name)){
            // dropping existing database 
            echo "<h4>~ Old Databas has been dropped !!<br>";
            echo "* A new one will be creted and all previous data will be 'lost' *<br>";
        }else{
            echo "- The database does not exist, a new one will be created. <br>";
        }

        //creating new database and tables
         //creating new database and tables
         $db_query = "CREATE DATABASE ".$db_name;
         if ($conn->query($db_query)){
             //Database successfully created
             echo "<h5>- Database ".$db_name." has been created  <br>";
             $users_query = "CREATE TABLE $db_name.users(
               user_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
               username VARCHAR(30) NOT NULL,
               password VARCHAR(100) NOT NULL,
               salt VARCHAR(50) NOT NULL,
               email VARCHAR(50) NOT NULL,
               confirmed VARCHAR(6) NOT NULL,
               cart_count INT(11) UNSIGNED
             )";

            //the query for creating the user_session table
            $session_query = "CREATE TABLE $db_name.user_session(
                id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT(11) NOT NULL,
                hash VARCHAR(64) NOT NULL
            )";
 
            //the query for creating the products table
             $products_query = "CREATE TABLE $db_name.products(
                 product_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                 product_name VARCHAR(100) NOT NULL,
                 product_price VARCHAR(20) NOT NULL,
                 product_description VARCHAR(1000) NOT NULL,
                 product_image1 VARCHAR(100) NOT NULL,
                 product_image2 VARCHAR(100) NOT NULL,
                 product_image3 VARCHAR(100) NOT NULL
             )";
 
            //the query for creating the cart table
             $cart_query = "CREATE TABLE $db_name.cart(
                 product_id INT(11) NOT NULL,
                 user_id INT(11) NOT NULL,
                 product_quantity INT(11) NOT NULL
             )";

            //creating the users table
            if ($conn->query($users_query)){
                echo "<h5>- creation of table users complete <br>";
            }else{
                echo "<h4>~ error creating the users table *<br>";
            }

            //creating the user_sessions table
            if ($conn->query($session_query)){
                echo "<h5>- creation of table user_sessions complete <br>";
            }else{
                echo "<h4>~ error creating the user_sessions table *<br>";
            }

            //creating the products table
            if ($conn->query($products_query)){
                echo "<h5>- creation of table products complete <br>";
            }else{
                echo "~ error creating the products table *<br>";
            }

            //creating the cart table
            if ($conn->query($cart_query)){
                echo "<h5>- creation of table cart complete <br>";
            }else{
                echo "<h4>~ error creating the cart table *<br>";
            }
        }
    }else{
        echo "<h4>~ Failed to create connection *<br>";
    }
    echo "<br><h3>ALL TABLES HAVE BEEN CREATED WITHOUT ANY ERRORS</h4>";
    $conn->close();//closing the connection to server
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/login.css">
    </head>
    <body style="text-align: center;">
        <style>
            h3, h5{
                color: #7CFC00;
            }
            h4{
                color: red;
            }

        </style>
            <button class="btn"  style="width: 50%;" onclick='window.location.href=window.location.href'>Create New Database</button>
            <button class="btn" style="width: 50%;" ><a href="#adminHome"></a>Admin Page</button>
    </body>
</html>