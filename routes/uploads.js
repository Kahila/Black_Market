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
    // if (req.session.user.admin == true){
        // res.redirect('/adminBooks');
        var products = [];
        var images = [];
        var price = [];
    
        console.log(req.session);
        productsQuery = "SELECT * FROM market.uploads";
        con.query(productsQuery, function(err, result){
          if (err) throw err;
          // products = result;
          for (var i = 0; i < result.length; i++){
            products.push(result[i].product_name);
            images.push(result[i].product_image);
            price.push(result[i].product_price);
            console.log(result[i].product_image);
          }
          if (products.length > 0)
            console.log("home == "+products);
          res.render('uploads', { verified: 'req.session.user.verified', products: products, pImage: images, Pprice: price });
        });
    // }
});

module.exports = router;