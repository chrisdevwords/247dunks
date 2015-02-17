'use strict';

var express = require('express');
var router  = express.Router();
var YouTube = require('../lib/DunkTube');
var Imgur   = require('../lib/Imgur');

var searchImgur = function (q, page, sort) {
    var imgur = new Imgur(process.env.IMGUR_KEY || req.param('imgur_key') || '');
    return imgur.search(q, sort, page);
};

/**
 * endpoints to be consumed by the front end (ie. Backbone.Model.fetch)
 */
router.get('/imgur', function (req, res) {
    var q = req.param('q') || '';
    var page = req.param('page') || 0;
    var sort = req.param('sort') || 'top';
    searchImgur(q, page, sort).always(function (resp) {
        res.send(resp.data);
    });
});

router.get('/imgur/dunks', function (req, res) {
    var page = req.param('page') || 0;
    var q = 'dunk+ext:gif&page=' + page;
    var sort = req.param('sort') || 'top';
    searchImgur(q, page, sort).always(function (resp) {
        res.send(resp.data);
    });
});

router.get('/youtube', function (req, res) {

    var q = req.param('q') || '';
    var count = Number(req.param('count'));
    var apiKey = process.env.YOUTUBE_KEY || req.param('youtube_key') || '';
    var youTube = new YouTube(apiKey);

    count = !isNaN(count) && (count > 0) ? count : 5;

    youTube.dunkSearch(q, count)
        .always(function (resultData) {
            res.send(resultData);
        });

});

router.get('/youtube/dunks', function (req, res) {

    var pageToken = req.param('page');
    var count = Number(req.param('count')) || YouTube.COUNT;
    var apiKey = process.env.YOUTUBE_KEY || req.param('youtube_key') || '';
    var youTube = new YouTube(apiKey);

    if (pageToken && pageToken !== '0') {
        youTube.addParam('pageToken', pageToken);
    }

    youTube.dunkSearch(YouTube.QUERY, count)
        .always(function (resultData) {
            res.send(resultData);
        });

});

module.exports = router;
