"use strict";

var express = require('express');
var router  = express.Router();
var YouTube = require('youtube-node');
var Imgur   = require('../lib/Imgur');


var searchImgur = function (q, page, sort, cb) {
    var imgur = new Imgur(process.env.IMGUR_KEY || req.param('imgur_key') || '');
    imgur.search(q, sort, page, cb);
};

/**
 * enpoints to be consumed by the front end (ie. Backbone.Model.fetch)
 */
router.get('/imgur', function(req, res) {
    var q = escape((req.param('q')|| '').split(' ').join('+'));
    var page = req.param('page') || 0;
    var sort = req.param('sort') || 'top';
    searchImgur(q, page, sort, function (status, data) {
        res.send(data);
    });
});

router.get('/imgur/dunks', function(req, res) {
    var page = req.param('page') || 0;
    var q = 'dunk+ext:gif&page=' + page;
    var sort = req.param('sort') || 'top';
    searchImgur(q, page, sort, function (status, data) {
        res.send(data);
    });
});

router.get('/youtube', function(req, res) {
    var q = req.param('q') || '';
    var count = Number(req.param('count'));
    var youTube = new YouTube();
    count = !isNaN(count) && (count > 0) ? count : 5;
    youTube.setKey(process.env.YOUTUBE_KEY || req.param('youtube_key') || '');
    youTube.search(q, count, function(resultData) {
        res.send(resultData);
    });
});

module.exports = router;
