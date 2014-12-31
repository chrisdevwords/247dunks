# 247dunks
Hello world. With dunks.

![DUNKS](https://i.imgur.com/iCTugx8.gif)

A work in progress. [Check it out](https://twentyfoursevendunks.herokuapp.com/).

Searches [imgur](http://imgur.com) for sweet GIFs and Youtube for sweet Tubes... of dunks. 

## Requires
Node, NPM, [RVM](https://rvm.io/rvm/install), [Heroku Toolbelt](https://toolbelt.heroku.com/) or [Foreman](https://github.com/ddollar/foreman), gulp, and bower

## To install dependencies:
```
$ npm install && bower install
```
## To run locally:
```sh
$ node index
```
or with Heroku Toolbelt/Foreman:
```sh
$ foreman start web
```
### to watch and build dev assets, in a seperate bash tab:
```
$ gulp
```

## to build minified code:
```
gulp build
```

### .env file
This repo is set up to ignore the .env file. To run this locally, create a file: .env in the root of the project and add the following line:
```
IMGUR_KEY=your_imgur_app_key
YOUTUBE_KEY=your_youtube_app_key
```


