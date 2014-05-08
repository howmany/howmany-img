#! /usr/bin/env node

'use strict';
var multiline = require('multiline');
var howmanyImg = require('./howmany-img');

var userArgs = process.argv;
var searchParam = userArgs[2];

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || searchParam === undefined) {
    return console.log(multiline.stripIndent(function () { /*
     ================================
     Checking how many img in your file and give some suggestions

     Usage :
     howmany-img <url>

     Example:
     howmany-img http://github.com
     ================================
     */
    }));
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
    return console.log(require('./package').version);
}

require('./howmany-img')(searchParam);