<!-- php code for the login will be going bellow -->
<?php
    require_once 'core/init.php';

    
?>

<!DOCTYPE html>
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
        
        <form action="/register.php" method="POST">
        <div class="login-box">

        <!-- login or register nav bar -->
        <div class="nav">
            <a href="verify.php" style="float: left;">Verify</a>
            <a href="login.php" >  Login </a>
            <a href="index.php" > Home   </a>
            <!-- <a href="index.php" class="active" style="float: left;">Register</a> -->
        </div>

            <h1>Register</h1>

            <div class="textbox">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input type="text" placeholder="username" name="" value="">
            </div>

            <div class="textbox">
                <i class="fa fa-at" aria-hidden="true"></i>
                <input type="mail" placeholder="email" name="" value="">
            </div>

            <div class="textbox">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input type="password" placeholder="password" name="" value="">
            </div>

            <div class="textbox">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input type="password" placeholder="comfirm password" name="" value="">
            </div>

            <input type="submit" class="btn" name="" value="Enter">
        </div>
            </div>
        </form>
    </body>
</html>