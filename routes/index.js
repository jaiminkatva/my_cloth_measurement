var express = require('express');
var router = express.Router();
var connection = require('../public/db/db.connection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/dashbord', function(req, res, next) {
    res.render('dashbord');
});

module.exports = router;