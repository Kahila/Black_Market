var express = require('express');
const bcrypt = require('bcrypt');
const body_parser = require('body-parser');
const app = express();
const mysql = require('mysql');
const router = express.Router();
// const http = require('http').Server(app);
var invalid = false;
// var inputPassword = null;

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
      verified: false,
      products: [],
      amount: 0,
      admin: false
    };

    var products = {
      amount: 0,
      products: null
    }

    if (result){
      var passQuery = "SELECT `password` FROM market.users WHERE email=?";
      con.query(passQuery, req.body.email, function(err, result){
        if (err) throw err;

        // console.log("===========" + result.length);
        if (result.length == 0){
          invalid = true;
          res.redirect("back");
          return;
        }
        //password not found
        // if (result.length == 0){
          //   invalid = true;
          //   res.redirect("back");
          // }
          bcrypt.compare(req.body.password, result[0].password, function(err, result){
            // console.log(req.body.email+"++++++++++++++++++");
          console.log(result);
          if (result){
            var qry = "SELECT * FROM market.users WHERE email=?";
            con.query(qry, req.body.email, function(err, result){
              if (result[0].account_verified == 0){
                invalid = false;
                req.session.user = user;
                req.session.user.email = req.body.email;
                // req.session.user.username = req.body.username;
                req.session.user.logged_in  = true;
                req.session.user.verified = true;
                req.session.user.username = result[0].username;
                if (req.body.email.trim().localeCompare("admin@market.co.za") == 0){
                  req.session.user.admin = true;
                }
                console.log(req.session.user);
                res.redirect("/home");
                //getting all the products
                // var productsQuery = "SELECT * FROM market.products";
                // con.query(productsQuery, function(err, result){
                //   if (err) throw errr;
                  
                //   req.session.user.amount = result.length;
                //   console.log(req.session.user.products);
                // })

              }else{
                // rconsole.log("Invalid paasword or email");
                invalid = false;
                req.session.user = user;
                req.session.user.email = req.body.email;
                // req.session.user.username = req.body.username;
                req.session.user.logged_in  = true;
                req.session.user.verified = false;
                req.session.user.username = result[0].username;
                if (req.body.email.trim().localeCompare("admin@market.co.za") == 0){
                  req.session.user.admin = true;
                }
                console.log("----" + req.session.user);
                res.redirect("/home");
              }
            })
          }else{
            console.log("Invalid paasword or email----");
            invalid = true;
            console.log(req.session.user);
            res.redirect("back");
          }
        })
      });
    }else{
      console.log("Invalid paasword or email----");
      invalid = true;
      console.log(req.session.user);
      res.redirect("back");
    }
  })
})

//get login page
router.get('/', function(req, res, next) {
  if (!req.session.user){
    // invalid = false;
    res.render('login', { inv: invalid });
  }else{
    res.redirect("/home");
  }
});

module.exports = router;