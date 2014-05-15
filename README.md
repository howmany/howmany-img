# howmany-img [![Build Status](https://secure.travis-ci.org/howmany/howmany-img.png?branch=master)](http://travis-ci.org/howmany/howmany-img)

Checking how many img in your file and give some suggestions

## Getting Started
Install the module with: `npm install --save howmany-img`

```javascript
var howmanyImg = require('howmany-img');
howmanyImg('test/test.html');
// => output result

howmanyImg('filenotfound');
// => Error: ENOENT, open 'filenotfound'

howmanyImg('filenothtml');
// => This is not a html code
```

## Screenshot
![](https://cloud.githubusercontent.com/assets/2560096/2911443/46b60554-d65c-11e3-8264-25c550b71948.png)

## License
Copyright (c) 2014 [Huei Tan](https://github.com/huei90). Licensed under the MIT license.
