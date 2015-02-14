"use strict";

var express = require('express');
var router  = express.Router();
var Imgur = require('../lib/Imgur');

/* GET home page */
router.get('/', function(req, res){
    var imgurData;
    var imgur = new Imgur(process.env.IMGUR_KEY || req.param('imgur_key') || '');
    imgur.search('dunk+ext%3Agif', 'top', 0)
        .always( function (resp) {
            imgurData = resp.data;
            res.render('index', {
                title : '247 Dunks!',
                imgur : imgurData,
                serverVars : true
            });
        });
});

module.exports = router;