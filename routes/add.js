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
router.get('/add', function(req, res, next) {
  if (req.session.user.logged_in == true){

    productsQuery = "SELECT * FROM market.products WHERE product_name=?";
    con.query(productsQuery, req.query.name , function(err, result){
      if (err) throw err;
      console.log("--------- adding product to cart table");
      if (req.session.user.admin == true){
        var insert = "INSERT INTO market.products (user_email, product_name, product_price, product_image1) VALUES ('"+ req.session.user.email +"','"+ req.query.name +"', '"+ req.query.price+"', '"+ req.query.image +"')";//remember to add code
        Query = "DELETE FROM market.uploads WHERE product_name=?";
        con.query(Query, req.query.name , function(err, result){
          if (err) throw err;
          console.log("==========\nproduct added and removed from uploads\n============");
        });
      }else{
        var insert = "INSERT INTO market.cart (user_email, product_name, product_price, product_image1) VALUES ('"+ req.session.user.email +"','"+ req.query.name +"', '"+ result[0].product_price +"', '"+ result[0].product_image1 +"')";//remember to add code
      }
      con.query(insert, function(err, result){
        if (err) throw err;
        console.log("==========\nproduct added\n============");
      });
    });
    res.redirect("/home");
  }else{
    res.redirect('/error');
  }
});

module.exports = router;