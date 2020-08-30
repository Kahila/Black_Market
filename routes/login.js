var express = require('express');
const bcrypt = require('bcrypt');
const body_parser = require('body-parser');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const http = require('http').Server(app);

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "8889"
});

router.post('/login', function(req, res, next){
  
  //checking if the user is registered
  var select = "SELECT email FROM market.users WHERE email=?";
  con.query(select, req.body.email, function(err, result){
    // if (err) throw err;

    //creating the user array that will be used for the session
    var user = {
      email: null,
      logged_in: false,
      username:null,
      verified: 1
    };

    if (result){
      var passQuery = "SELECT `password` FROM market.users WHERE email=?";
      con.query(passQuery, req.body.email, function(err, result){
        if (err) throw err;
        bcrypt.compare(req.body.password, result[0].password, function(err, result){
          // console.log(req.body.email+"++++++++++++++++++");
          if (result){
            var qry = "SELECT * FROM market.users WHERE email=?";
            con.query(qry, req.body.email, function(err, result){
              if (err) throw err;
              if (result[0].account_verified == 0){
                req.session.user = user;
                req.session.user.email = req.body.email;
                // req.session.user.username = req.body.username;
                req.session.user.logged_in  = true;
                req.session.user.verified = result[0].account_verified;
                console.log(req.session.user);
                res.redirect("/home");
              }else{
                rconsole.log("Invalid paasword or email");
              }
            })
          }
        })
      });
    }else{
      console.log("Invalid paasword or email----");
      console.log(req.session.user);
    }
  })
})

//get login page
router.get('/', function(req, res, next) {
  if (!req.session.user)
    res.render('login', { title: 'Express' });
  else{
    res.redirect("/home");
  }
});

module.exports = router;