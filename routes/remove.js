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
router.get('/remove', function(req, res, next) {
  if (req.session.user.logged_in == true){

    if (req.session.user.admin == true){
        productsQuery = "DELETE FROM market.products WHERE product_name=?";
    }else
        productsQuery = "DELETE FROM market.cart WHERE product_name=?";

    con.query(productsQuery, req.query.name , function(err, result){
      if (err) throw err;
      if (req.session.user.admin == true){
        res.redirect("/adminBooks");
      }else{
        res.redirect("/cart");
      }
    });
  }else{
    res.redirect('/error');
  }
});

module.exports = router;