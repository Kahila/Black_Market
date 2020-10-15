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
  if (req.session.user.logged_in == true){
    var products = [];
    var images = [];
    var price = [];

    productsQuery = "SELECT * FROM market.cart WHERE user_email=?";
    con.query(productsQuery, req.session.user.email , function(err, result){
      if (err) throw err;
      console.log("query worked just fine\ncontent for current user retrieved");
      for (var i = 0; i < result.length; i++){
        products.push(result[i].product_name);
        images.push(result[i].product_image1);
        price.push(result[i].product_price);
      }
      console.log("========" + products);
      res.render('cart', {products: products, pImage: images, Pprice: price, length: products.length });
    });
  }else{
      res.redirect('/error');
  }
});

module.exports = router;