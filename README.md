# 247dunks
Hello world. With dunks.

A work in progress. [Check it out](https://twentyfoursevendunks.herokuapp.com/).

Based on [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article.

Searches [imgur](http://imgur.com) for sweet GIFs of slam dunks. 

## Requires
Node, NPM, [RVM](https://rvm.io/rvm/install), [Heroku Toolbelt](https://toolbelt.heroku.com/) or [Foreman](https://github.com/ddollar/foreman)

## To run locally:
```sh
$ node index
```
or with Heroku Toolbelt/Foreman:
```sh
$ foreman start web
```

### .env file
This repo is set up to ignore the .env file. To run this locally, create a file: .env in the root of the project and add the following line:
```
IMGUR_KEY=your_imgur_app_key
```
