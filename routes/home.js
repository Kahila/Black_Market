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
router.get('/', function(req, res, next) {
  if (req.session.user.admin == true){
    res.redirect('/adminBooks');
  }else if (req.session.user.logged_in == true)
  {
    var products = [];
    var prod = [];
    var images = [];
    var price = [];
    var len;

    console.log(req.session);
    productsQuery = "SELECT * FROM market.products";
    con.query(productsQuery, function(err, result){
      if (err) throw err;
      // products = result;
      for (var i = 0; i < result.length; i++){
        products.push(result[i].product_name);
        images.push(result[i].product_image1);
        price.push(result[i].product_price);
      }
      Query = "SELECT * FROM market.cart WHERE user_email=?";
      con.query(Query, req.session.user.email , function(err, resu){
        if (err) throw err;
        console.log("query worked just fine\ncontent for current user retrieved");
        for (var i = 0; i < resu.length; i++){
          prod.push(resu[i].product_name);
        }
        len = resu.length;
      });
      // console.log(products);
      if (products.length > 0)
        console.log("home == "+products);
      res.render('home', { verified: 'req.session.user.verified', products: products, pImage: images, Pprice: price, length: products.length , len1: len});
    });
  }else{
    res.redirect('/error');
  }
});

module.exports = router;