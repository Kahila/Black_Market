var express = require('express');
const bcrypt = require('bcrypt');
const body_parser = require('body-parser');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const http = require('http').Server(app);
const nodemailer = require('nodemailer');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "8889"
});

// router.use(body_parser.urlencoded({extended: true}));
router.post('/verify', function(req, res, next){

    var codeQuery = "SELECT account_verified FROM market.users WHERE email=?";
    console.log("verification " + req.session.user.email);
    con.query(codeQuery, req.session.user.email, function(err, result){
        if (err) throw err;
        // console.log(res[0]);
        if (result[0].account_verified == req.body.verify){
            var codeQuery = "UPDATE market.users SET account_verified=0 WHERE email=?";
            con.query(codeQuery, req.session.user.email, function(err, result){
                if (err) throw err;
                // console.log("this shit works");
                req.session.user.verified = true;
                
                 //sending vifirication code to the new users
                 var email = req.session.user.email;
                 var username = req.session.user.username;
                 console.log(" to email: "+ email);
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
                   subject: 'Account Verified',
                   text: 'Hello '+ username+'\n\nThank you for updating your email, you may now proceed to checking out'
                 };

                 // res.send("hello can you see me");
                 transporter.sendMail(mailOptions, function(error, info){
                     if (error){
                     console.log(error);
                     }else{
                     console.log('email sent');
                     }
                 });

                res.redirect('/home');
            });
        }
    })
})

router.get('/', function(req, res, next) {
    if (req.session.user.logged_in == true && req.session.user.verified == false){
        // console.log(req.session);
        // console.log(req.session.user.email);
        res.render('verify', { username: req.session.user.username,  email: req.session.user.email});
    }else{
        res.redirect('/error');
    }
});

module.exports = router;