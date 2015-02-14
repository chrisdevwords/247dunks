"use strict";

var express = require('express');
var router  = express.Router();
var Imgur = require('../lib/Imgur');
var Youtube = require('youtube-node');

var IMGUR_QUERY = 'dunk+ext%3Agif';
var YOU_TUBE_QUERY = 'slam+dunk+basketball';

/* GET home page */
router.get('/', function(req, res){
    var imgurData;
    var imgur = new Imgur(process.env.IMGUR_KEY || '');
    var youtube = new Youtube();
    imgur.search(IMGUR_QUERY, 'top', 0)
        .always( function (resp) {
            imgurData = resp.data;
            youtube.setKey(process.env.YOUTUBE_KEY || '');
            youtube.search(YOU_TUBE_QUERY, 50, function(resultData) {
                res.render('index', {
                    title : '247 Dunks!',
                    imgur : imgurData,
                    youtube : resultData,
                    serverVars : true
                });
            });
        });
});

module.exports = router;