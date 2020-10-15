var express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const body_parser = require('body-parser');
const nodemailer = require('nodemailer');
const session = require('express-sessions');
const cryptoRandomString = require('crypto-random-string');
const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4.8}$/; //regex for the password strength
var router = express.Router();
var express = require('express');
var router = express.Router();

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "8889"
});

router.use(body_parser.urlencoded({extended: true}));


//getting user input from the frontend
router.post('/register', function(req, res, next){
  var fail = false;

  if (pass.exec(!req.body.password)){
    res.send ("invalid code");
    fail = true;
  }if (req.body.password != req.body.password2){
    res.send("your passwords do not match");
    fail = true;
  }if (fail==false){
    //checking if the email exists in the database
    var emailQuery = "SELECT * FROM matcha.users WHERE email=?";
    var email = req.body.email;

    con.query(emailQuery, emailQuery.toLowerCase(), function(err, result){
      if (result.length > 0){
        console.log("user already exists");
      }else{
        var code = cryptoRandomString({length: 7, type: 'distinguishable'});//string to be send to the new client for verification
        console.log(code + " to email: "+ email);
        //sending vifirication code to the new users
        var email = req.body.email;
        var username = req.body.username;
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          // port: 2525,
          auth:{
            user: 'email address here',
            pass: 'email password here'
          }
        });
  
        var mailOptions = {
          from: "email address here",
          to: email,
          subject: 'Account verification',
          text: 'Hello '+ username+'\n\nthank you for registering to Bibliotheca'
        };

        // res.send("hello can you see me");
        transporter.sendMail(mailOptions, function(error, info){
          if (error){
            console.log(error);
          }else{
            console.log('email sent');
          }
        });

        var pass = bcrypt.hashSync(req.body.password, 10);
        console.log(pass);
        // mail = req.body.email.toLowerCase;
        console.log(email);
        var insert = "INSERT INTO market.users (email, username, password, account_verified) VALUES ('"+ email +"','"+ username +"', '"+ pass +"', '"+ code +"')";//remember to add code
        con.query(insert, function(err, result){
          if (err) throw err;
          console.log("user has been added to the database");
          res.redirect("/login");
        });
      }
    })
  }
})

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

module.exports = router;