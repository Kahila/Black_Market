var express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const body_parser = require('body-parser');
const nodemailer = require('nodemailer');
var router = express.Router();

//get login page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;