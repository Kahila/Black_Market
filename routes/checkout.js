var express = require('express');
const body_parser = require('body-parser');
const app = express();
const mysql = require('mysql');
const router = express.Router();

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: "8889"
});

var pricee = [];
var Pproducts = [];
// var total = 0;
var Utotal = 0;
var taxes = 0;
var Udiscount = 0.00;
var auth = false;
var check = false;
var set = 0;

router.use(body_parser.urlencoded({extended: true}));
router.post('/checkout', function(req, res, next){

  console.log("Correct content 1 " + req.body.name.length);
  if (req.body.name.length > 0 && req.body.cardnumber.length > 0 && req.body.securitycode.length > 0 && req.body.expirationdate.length > 0 && req.body.securitycode.length > 0){
    console.log("Correct content 1 " + req.body.cardnumber.length + " " + req.body.securitycode.length);
    if (req.body.cardnumber.length == 16 && req.body.expirationdate.length == 4 && req.body.securitycode.length == 2){
      auth = true;
      var content_list = "";
      //geting products the user checked out
      for (var i=0; i < Pproducts.length; i++){
        content_list += Pproducts[i] + "-";
        content_list += pricee[i] + "\n";
      }
      console.log(content_list);

      //query for inserting the content into history database
      var insert = "INSERT INTO market.history (user_email, product_list, tax, total, discount, date) VALUES ('"+ req.session.user.email +"','"+ content_list +"', '"+ taxes +"', '"+ Utotal +"', '"+ Udiscount +"', '"+ new Date() +"')";
      con.query(insert, function(err, result){
        if (err) throw err;
        productsQuery = "DELETE FROM market.cart WHERE user_email=?";
        con.query(productsQuery, req.session.user.email, function(err, result){
          if (err) throw err;
          auth = true;
          console.log("+++++++++++++data has been removed from the database");
        });
      });
      res.redirect("back");
    }else{
      check = true;
      res.redirect("back");
    }
  }else{
    check = true;
    res.redirect("back");
  }
  console.log("============\n");
  console.log(req.body.name);
  console.log(req.body.cardnumber);
  console.log(req.body.securitycode);
  console.log(req.body.expirationdate);
  console.log("---"+req.body.securitycode.length);
  console.log("============\n");
});



router.get('/', function(req, res, next) {

  var price = [];
  var products = [];
  var total = 0;
  var tax = 0;
  var discount = 0.00;
  var set = 0;

  if (req.session.user.logged_in == true){
    productsQuery = "SELECT * FROM market.cart WHERE user_email=?";
    con.query(productsQuery, req.session.user.email , function(err, result){
      if (err) throw err;
     
      for (var i = 0; i < result.length; i++){
        products.push(result[i].product_name);
        price.push(result[i].product_price);
        total += result[i].product_price;
      }
      tax = (total/1000);
      discount = ((total - total/10) * 0.05).toFixed(2);
      Pproducts = products;
      pricee = price;
      taxes = tax;
      Utotal = total
      Udiscount = discount;
      console.log("------ THe Total Value is" + total +" At tax" + tax);
      total = (total + tax) - discount;
      // if (set == 0){
      res.render('checkout', { itemCount: products.length, products: products, Price: price, Total: total.toFixed(2), Tax: tax.toFixed(2), Discount: discount, Auth: auth, Check: check});    
        // set++;
      // }
    });
    // res.render('checkout');
  }else{
      res.redirect('/error');
  }
});

module.exports = router;