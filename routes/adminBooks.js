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

router.get('/', function(req, res, next) {
//   res.render('adminBooks', { title: 'Express' });
if (req.session.user.logged_in == true && req.session.user.admin == true)
{
    var products = [];
    var images = [];
    var price = [];
    
    console.log(req.session);
    productsQuery = "SELECT * FROM market.products";
    con.query(productsQuery, function(err, result){
      if (err) throw err;
      for (var i = 0; i < result.length; i++){
        products.push(result[i].product_name);
        images.push(result[i].product_image1);
        price.push(result[i].product_price);
      }
      if (products.length > 0)
        console.log("home == "+products);
      res.render('adminBooks', { verified: 'req.session.user.verified', products: products, pImage: images, Pprice: price });
  });
    }else{
    res.redirect('/error');
    }
});

module.exports = router;