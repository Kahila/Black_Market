var express = require('express');
const body_parser = require('body-parser');
const app = express();
const mysql = require('mysql');
const { setMaxListeners } = require('../app');
const router = express.Router();

var products = [];
var spli = [];
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: "8889"
  });

router.get('/', function(req, res, next) {
    historyQuery = "SELECT * FROM market.history WHERE user_email=?";
    con.query(historyQuery, req.session.user.email, function(err, result){
        if (err) throw err;
        products = [];
        spli = [];
        for (var i = 0; i < result.length; i++){
            // products[i] = result[i].product_list.trim().split("\n");
            // console.log(products);
          
            products.push(result[i].product_list);
            spli.push(result[i].date);
        }
        // product = result;
        console.log(products);
        res.render('history', {prod: products, Date: spli});
    });
});

module.exports = router;