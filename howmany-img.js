/*
 * howmany-img
 * https://github.com/howmany/howmany-img
 *
 * Copyright (c) 2014 Huei Tan
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var cheerio = require('cheerio');
var isHtml = require('is-html');
var chalk = require('chalk');


var howmanyImg = function (file) {

    var index = 0;
    var errors = 0;

    fs.readFile(file, 'utf8',function (err, data) {
        if (err) {
            throw err;
        }

        if (!isHtml(data)) {
            console.log(chalk.red('This is not a html code'));
            return;
        }

        var $ = cheerio.load(data);

        $('img').each(function () {
            var attr = $(this)[0].attribs,
              isError = false;

            console.log('--------------------');
            console.log(chalk.blue(++index + ' : ') + $(this));

            if (!attr.alt) {
                console.log(chalk.red('X') + ' ' + chalk.red('lack of alt'));
                isError = true;
            }

            if (attr.style) {
                console.log(chalk.red('X') + ' ' + chalk.red('Remove inline style'));
                isError = true;
            }

            if (attr.height) {
                console.log(chalk.red('X') + ' ' + chalk.red('Remove height attribute'));
                isError = true;
            }

            if (attr.width) {
                console.log(chalk.red('X') + ' ' + chalk.red('Remove width attribute'));
                isError = true;
            }

            if (!isError) {
                console.log(chalk.green('✓ Correct'));
            } else {
                errors = errors + 1;
            }
        });

        console.log('--------------------');
        console.log('Total suggestions line ' + chalk.red(errors) + '/' + index);
        console.log('--------------------');

    });

};

module.exports = function (file) {
    console.log(chalk.underline.gray('loading howmany-img ...'));
    howmanyImg(file);
};