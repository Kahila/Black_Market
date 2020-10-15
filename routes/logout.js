var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');


router.use(body_parser.urlencoded({extended: true}));
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    console.log(req.session);
    res.redirect('/login');
});

module.exports = router;