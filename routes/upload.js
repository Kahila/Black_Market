var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');
const mysql = require('mysql');
var formidable = require('formidable');
const path = require("path");
const multer = require("multer");
// const upload = multer({dest: __dirname + '/uploads'});

var invalid = false;
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: "8889"
});

var img = "";
var submitted = 0;
var tmp = "";
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
        tmp = file.fieldname + '-' + Date.now()+".jpg";
        var path = "/images/uploads/";
        cb(null, tmp);
        img = path+tmp;
        console.log(img);
    }
  })
  var upload = multer({ storage: storage })


router.use(body_parser.urlencoded({extended: true}));
router.post('/upload',  upload.single('photo'),function(req, res, next){
    submitted = 0;
    
    const file = req.body.photo;
    if (tmp == ""){
      submitted = -1;
    }else{
      submitted = 1;
      var insert = "INSERT INTO market.uploads (user_email, product_name, product_price, product_image) VALUES ('"+ req.session.user.email +"','"+ req.body.name +"', '"+ req.body.price +"', '"+ img +"')";
      con.query(insert, function(err, result){
        // submitted = -1;
        if (err) throw err;
      });
    }

    console.log("+++++++++++++++++++++++++++");
    console.log(req.body.name);
    console.log(req.body.price);
    console.log(tmp);
    res.redirect("back");
});

// router.use(body_parser.urlencoded({extended: true}));
router.get('/', function(req, res, next) {
  if (req.session.user.logged_in == true)
  {
    res.render('upload', {submitted: submitted});
    submitted = 0;
  }else{
    res.redirect('/error');
  }
});

module.exports = router;