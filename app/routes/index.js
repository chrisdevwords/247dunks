var express = require('express');
var router  = express.Router();
var Imgur = require('../lib/Imgur');

/* GET home page */
router.get('/', function(req, res){
    var gifs;
    var imgur = new Imgur(process.env.IMGUR_KEY || req.param('imgur_key') || '');
    imgur.search('dunk+ext%3Agif', function (status, resp) {
        gifs = JSON.parse(resp).data;
        res.render('index', {
            title : 'DUNKS!',
            gif : gifs[Math.floor(gifs.length*Math.random())]
        });
    });
});

module.exports = router;