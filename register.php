<!-- php code for the login will be going bellow -->
<?php
    require_once 'core/init.php';

    $val = true;
    $pattern = 'regex here'; //regex for password strength
    //code bellow should only be uncomented is there is a selected regex

    // if(preg_match($pattern, input::get('password'))){
    // $val = true;
    // } else {
    // echo "Password is not strong enough";
    // }

    // if (!$val){
    //     echo "password is not secure enough";
    // }

    if (input::exists() && $val) {

        //for testing perposes, this can be uncomented
        // echo input::get('password')."<br>";
        // echo input::get('password2')."<br>";
        // echo input::get('email')."<br>";
        // echo input::get('username')."<br>";
        
        
        if (token::check(input::get('token'))) {
            echo "in here";
            $validate = new Validate();
            $validation = $validate->check($_POST, array(
                'username' => array(
                    'required' => true,
                    'min' => 2,
                    'max' => 20,
                    'unique' => 'users',
                ),
                'password' => array(
                    'required' => true,
                    'min' => 6, 
                ),
                'password2' => array(
                    'required' => true,
                    'matches' => 'password',
                ),
                'email' => array(
                    'required' => true,
                    'unique' => 'users'
                )
            ));

            if ($validation->passed()) {
                $user = new User(); //creating a new intsance of the user if the pass match
                $salt = Hash::salt(32);
                //using string shuffle to get a confermation code
                $code = str_shuffle("1234567890-+=~abcdefABCDEFghijklmnopqrstuvwxyzGHIJKLMNPOQRSTUVWXYZ!@#$%^&*()?><:");     
                try {
                    $user->create(array(
                        'username' => input::get('username'),
                        'password' => Hash::make(input::get('password'), $salt), //hashing password
                        'salt' => $salt, //salt for unhashing password
                        'email' => input::get('email'),
                        'confirmed' => substr($code, 0, 5), //confirmation code (randomly generated by the str_shuffle function)
                        'cart_count' => 0
                    ));
                    $id = substr($code, 0, 5);
                    Session::flash('home', 'welcome to Market');
                
                    //for sending email (net yet working)
                    $code = $user->login(input::get('confirmed'));
                    $to = input::get('email');
                    $subject = "Email Verification";
                    $message =  "your verification code is : $id";
                    $headers = "From:noreply@localhost:8080 \r\n";
                    $headers .= "MIME-Version: 1.0" . "\r\n";
                    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";

                    if (mail($to,$subject,$message,$headers))
                    {
                    echo ("success");
                    }
                    else {
                    echo("Fail");
                    }

                redirect::go_to('verify.php');
                } catch (Exception $e) {
                    die($e->getMessage());
                }
            } else {
                foreach ($validation->errors() as $error) {
                    echo '<i>' . $error . '</i>', '<br>';
                }
                echo '<br>';
            }
        }
    }
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
        
        <form action="" class="register" method="POST">
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
                    <input type="text" placeholder="username" name="username" autocomplete="off" value="<?php echo escape(Input::get('username')); ?>"  required>
                </div>

                <div class="textbox">
                    <i class="fa fa-at" aria-hidden="true"></i>
                    <input type="email" placeholder="email" name="email" value="<?php echo escape(Input::get('email')); ?>" required>
                </div>

                <div class="textbox">
                    <i class="fa fa-key" aria-hidden="true"></i>
                    <input type="password" placeholder="password" name="password" value="" required>
                </div>

                <div class="textbox">
                    <i class="fa fa-key" aria-hidden="true"></i>
                    <input type="password" placeholder="comfirm password" name="password2" value="" required>
                </div>
                <input type="hidden" name="token" value="<?php echo token::generate(); ?>">
                <input type="submit" class="btn" name="Register" value="Enter" required>
            </div>
                </div>
        </form>
    </body>
</html>