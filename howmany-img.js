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


var howmanyImginFile = function (file, cb) {

    var errorList = [],
        successList = [];

    var input = fs.readFileSync(file, 'utf8');

    if (!isHtml(input)) {
        cb('This is not a html code', null);
        return;
    }

    var $ = cheerio.load(input);

    $('img').each(function () {
        var attr = $(this)[0].attribs,
            isError = false,
            errorType = [];

        if (!attr.alt) {
            errorType.push('lack of alt');
            isError = true;
        }

        if (attr.style) {
            errorType.push('Remove inline style');
            isError = true;
        }

        if (attr.height) {
            errorType.push('Remove height attribute');
            isError = true;
        }

        if (attr.width) {
            errorType.push('Remove width attribute');
            isError = true;
        }

        if (!isError) {
            successList.push({
                html: $(this)
            });
        } else {
            errorList.push({
                html: $(this),
                error: errorType
            });
        }
    });

    cb(null, {
        success: successList,
        error: errorList
    });

};

module.exports = function (file, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    cb = cb || function () {};
    opts = opts = {};


    if (fs.existsSync(file)) {
        howmanyImginFile(file, function (err, data) {
            cb(err, data);
        });
    } else {
        cb('no file found', null);
    }

    // howmanyImginUrl(url);
};

// check file
// module.exports('test/test.html', function (err, data) {
//    console.log(err,data)
// });