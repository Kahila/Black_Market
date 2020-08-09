
<?php
    require_once 'core/init.php';

    if (Session::exists('home')){
        echo '<p>'.Session::flash('home').'</p>';
    }
    $user = new User();//current user
    if ($user->isLoggedIn()){
        echo "logged in, Welcome";
    }else{
?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/index.css">
    </head>
    <body class>
        <div class="nav">
            <a href="login.php">Login/Register</a>
            <a href="index.php" style="float: left;">Home/logo</a>
            <!-- <input type="text" placeholder="search"> -->
        </div>
    </body>
</html>

<?php 
    }
?>