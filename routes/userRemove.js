var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "8889"
});

router.use(body_parser.urlencoded({extended: true}));
router.get('/userRemove', function(req, res, next) {
    //   if (req.session.user.logged_in == true){
         
    productsQuery = "DELETE FROM market.products WHERE user_email=?";
    usersQuery = "DELETE FROM market.users WHERE email=?";
    historyQuery = "DELETE FROM market.history WHERE user_email=?";
    cartQuery = "DELETE FROM market.cart WHERE user_email=?";
    uploadsQuery = "DELETE FROM market.uploads WHERE user_email=?";
    console.log("+++++++++++++++"+req.query.name);
    con.query(productsQuery, req.query.name , function(err, result){
        if (err) throw err;
        con.query(usersQuery, req.query.name , function(err, result){
            if (err) throw err;
            con.query(historyQuery, req.query.name , function(err, result){
                if (err) throw err;
                con.query(cartQuery, req.query.name , function(err, result){
                    if (err) throw err; 
                    con.query(uploadsQuery, req.query.name , function(err, result){
                        if (err) throw err; 
                        res.redirect("/users");
                    });
                });
            });
        });
    });
    
//   }else{
//     res.redirect('/error');
//   }
});

module.exports = router;