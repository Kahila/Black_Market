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
  //   res.redirect('/adminBooks');
  // }else if (req.session.user.logged_in == true)
  // {
    var products = [];
    var images = [];
    var price = [];

    console.log(req.session);
    productsQuery = "SELECT * FROM market.users";
    con.query(productsQuery, function(err, result){
      if (err) throw err;
      // products = result;
      for (var i = 0; i < result.length; i++){
        if (result[i].email != "admin@market.co.za"){
          products.push(result[i].username);
          // images.push(result[i].product_image1);
          price.push(result[i].email);
        }
      }
      // console.log(products);
      if (products.length > 0)
        console.log("home == "+products);
      res.render('users', { verified: 'req.session.user.verified', products: products, pImage: images, Pprice: price });
    });
  // }else{
  //   res.redirect('/error');
  // }
});

module.exports = router;