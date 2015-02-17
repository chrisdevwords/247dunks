'use strict';

var express = require('express');
var router  = express.Router();
var Imgur = require('../lib/Imgur');
var YouTube = require('../lib/DunkTube');

var IMGUR_QUERY = 'dunk+ext%3Agif';

/* GET home page */
router.get('/', function (req, res) {

    var imgurData;
    var imgur = new Imgur(process.env.IMGUR_KEY || '');
    var youtube = new YouTube(process.env.YOUTUBE_KEY || '');

    var imgurReq = imgur.search(IMGUR_QUERY, 'top', 0)
        .always(function (imgurResp) {
            imgurData = imgurResp.data;
        });

    var ytReq = imgurReq
        .then(function () {
            return youtube.dunkSearch(YouTube.QUERY, YouTube.COUNT);
        });

    ytReq.always(function (ytData) {
        res.render('index', {
            title : '247 Dunks!',
            imgur : imgurData,
            youtube : ytData,
            serverVars : true
        });
    });
});

module.exports = router;
