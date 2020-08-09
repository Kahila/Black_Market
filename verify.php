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
        
        <form action="/login.php" method="POST">
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
                <input type="text" placeholder="verification code" name="" value="">
            </div>

            <input type="submit" class="btn" name="" value="Enter">
        </div>
            </div>
        </form>
    </body>
</html>