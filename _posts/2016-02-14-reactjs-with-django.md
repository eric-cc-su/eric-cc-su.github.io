---
title: Integrating ReactJS with Your Django Project (Part 1)
category: tech
tags: [python, django, web-development, reactjs]
---

If you're familiar with the Javascript community there's a chance you've heard of [ReactJS](https://facebook.github.io/react/),
a Javascript library developed by Facebook. It's supposed to make for quick front end development using a virtual DOM of sorts.
ReactJS tells you [how to get started](https://facebook.github.io/react/docs/getting-started.html)
and they offer a [tutorial here](https://facebook.github.io/react/docs/tutorial.html) but they basically assume you 
develop with NodeJS. I wanted to integrate ReactJS with my Django project and for those who are like me and are not 
primarily NodeJS developers, there's some work required. This is only meant to be a supplement to the existing ReactJS
documentation so please make sure you read their information as well.

## Getting Started

I decided to go the recommended route and install [NodeJS](https://nodejs.org/en/) and the 
[webpack module bundler](https://webpack.github.io/). You can install webpack globally, but it is also 
important to install webpack as a dependency for your project. Since my project is a Django project at heart, 
I opted to install all JS dependencies in my static directory so it's out of the way. By installing NodeJS, a 
`node_modules` directory and a `package.json` file should've been created for you. Simply make sure you're in your
static directory before running:

`npm install webpack --save-dev`
 
You will also want to install ReactJS and a couple more packages. To do so, run the following command:

`npm install --save react react-dom babel-core babel-loader babel-preset-react`

You may notice that this is similar to ReactJS's documentation to install React. However I added babel-core 
and babel-loader since we will need it for our webpack configuration. 

**BEFORE** you run the command `webpack`, you will need to create
the file `webpack.config.js` in your static directory (or whichever directory is the parent of `node_modules`) as follows
(courtesy of [egghead.io](https://egghead.io/lessons/react-building-a-react-js-app-up-and-running-with-react-and-webpack)):

    module.exports = {
        entry: "./app/components/Main.js",
        output: {
            filename: "public/bundle.js"
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['react']
                    }
                }
            ]
        }
    }

You will notice we mentioned two files in our configuration, the entry and the output (`./app/components/Main.js` and 
`public/bundle.js` respectively). You will not be creating the output file, but you will need to create the entry file. 
In your entry file you can put in ReactJS's "Getting Started" code:

    // main.js
    var React = require('react');
    var ReactDOM = require('react-dom');
    
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );
    
Now that you have your entry file set up, you can run the command `webpack` and your ReactJS bundle should be assembled.
 You're now all set up to start using ReactJS in your project! Look for part 2 to learn about how I adapted the tutorial
 code to work with a Django/Python back-end.
