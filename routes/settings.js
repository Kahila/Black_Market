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

var changed = false;
router.use(body_parser.urlencoded({extended: true}));
router.post('/settings', function(req, res, next){

    // console.log(req.session+" ============");
    var passQuery = "SELECT password FROM market.users WHERE email=?";
    con.query(passQuery, req.session.user.email, function(err, result){
        if(err) throw err;
            bcrypt.compare(req.body.password, result[0].password, function(err, result){
                if (result){
                    //query for updating passwords
                    if ((req.body.password1).localeCompare(req.body.password2) == 0 && (req.body.password1).length > 0)
                    {
                        //encrypting the password
                        var pass = bcrypt.hashSync(req.body.password, 10)
                        newPasswordQuery = "UPDATE market.users SET password=? WHERE email="+"'"+ req.session.user.email+"'";
                        con.query(newPasswordQuery, pass, function(err, result){
                            if (err) throw err;
                            changed = true;
                            console.log("password charnged");
                        })
                    }else{
                        //passwords do not match
                        console.log("no match");
                    }
    
                    //query for updating username
                    if (req.session.user.username != req.body.username){
                        newUsernameQuery = "UPDATE market.users SET username=? WHERE email="+"'"+ req.session.user.email+"'";
                        con.query(newUsernameQuery, req.body.username, function(err, result){
                            if (err) throw err;
                            changed = true;
                            req.session.user.name = req.body.username;
                            //log user out
                            console.log("name changed");
                        })
                        changed = true;
                    }
                    // req.session.user = null;
                    // result.redirect('/login');
                }else{
                        console.log("invalid code");
                    }
                    if (changed == true)
                    {
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
                          subject: 'Account Updated',
                          text: 'Hello '+ username+'\n\nAccount details successfuly updated'
                        };

                        // res.send("hello can you see me");
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error){
                            console.log(error);
                            }else{
                            console.log('email sent');
                            }
                        });
                    }
                    res.redirect('/logout/logout');
            });

    });//
    // res.redirect('logout/logout');
})

/* GET settings page. */
router.get('/', function(req, res, next) {
    if (req.session.user.logged_in == true){
        console.log(req.session);
        console.log(req.session.user.email);
        res.render('settings', { username: req.session.user.username,  email: req.session.user.email});
    }else{
        res.redirect('/error');
    }
});

module.exports = router;