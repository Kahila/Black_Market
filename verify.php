<?php
    require 'core/init.php';

    $user = new User();
    $conn = new PDO("mysql:host=localhost;dbname=market", "root", "root");
    $code = input::get('code');
    
    if (Session::exists('home')){
        echo '<p>'.Session::flash('home').'</p>';
        echo "in here";
    }else{
        echo 'no session';
    }
    
    if (isset($_POST['submit'])){
        $query = "SELECT * FROM market.users WHERE confirmed='$code'";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $res = array_reverse($stmt->fetchAll());
        if ($res){
            $query = "UPDATE `users` SET `confirmed` = '0' WHERE `users`.`confirmed` = '$code'";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            header("location: index.php");
        }
    }
?>

<DOCTYPE html>
<html>

    <head>
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/login.css">
        <title>Formulário de login HTML/CSS</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/estilo.css">
    </head>

    <body>
        
        <form action="" method="POST">
        <div class="login-box">

        <!-- login or register nav bar -->
        <div class="nav">
            <a href="register.php" > Register  </a>
            <a href="index.php" tyle="float: right;"> Home</a>
            <a href="login.php" style="float: left;">Login</a>
        </div>

            <h1>Verify</h1>
            <div class="textbox">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <input type="text" placeholder="verification code" name="code" value="">
            </div>

            <input type="submit" class="btn" name="submit" value="Enter">
        </div>
            </div>
        </form>
    </body>
</html>