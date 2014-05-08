/*
 * howmany-img
 * https://github.com/howmany/howmany-img
 *
 * Copyright (c) 2014 Huei Tan
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var request = require('request');
var cheerio = require('cheerio');

var howmanyImg = function (url) {

    var index = 0;
    var errors = 0;

    request(url, function (error, response, html) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(html);

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
                    console.log(chalk.green('✓ correctly'));
                } else {
                    errors = errors + 1;
                }
            });

            console.log('--------------------');
            console.log('Total suggestions line ' + chalk.red(error) + '/' + index);
            console.log('--------------------');

        } else {
            console.log(error);
        }
    });

};

module.exports = function (url) {
    console.log(chalk.underline.gray('loading howmany-img ...'));
    howmanyImg(url);
};