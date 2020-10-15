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
router.get('/admin', function(req, res, next) {
  if (req.session.user.admin == true){
    productsQuery = "DELETE FROM market.uploads WHERE product_name=?";

    con.query(productsQuery, req.query.name , function(err, result){
      if (err) throw err;
        res.redirect("/uploads");
    });
  }else{
    res.redirect('/error');
  }
});

module.exports = router;