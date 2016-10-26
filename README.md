# NoLiTA

[NoLiTA](https://library.smu.edu.sg/nolita) is an online photo gallery of SMU's two libraries -- Li Ka Shing Library and Kwa Geok Choo Law Library.

This project makes use of [Accelerated Mobile Pages (AMP)](https://www.ampproject.org) to provide an enhanced experience on mobile devices.

## Build

1. Install [Node.js](https://nodejs.org). The project was developed using v7.0.0.
2. Install [Gulp](http://gulpjs.com):

```
$ npm install -g gulp
```

3. Set up the repository and build the site:

```
$ git clone https://github.com/smu-libraries/nolita.git
$ cd nolita
$ npm install
$ gulp build
```

4. If everything went well, the site (as static HTML pages) should now be found in the `dest` folder.

## License

Except where otherwise noted, this project is licensed under the CC-BY-4.0 license. See [LICENSE.md](LICENSE.md) for more information.

The project source is adapted from the [AMP by Example](https://ampbyexample.com) project, which is released under the Apache-2.0 license. See linked [LICENSE](https://github.com/ampproject/amp-by-example/blob/master/LICENSE) file for more information. The following list of files are copied or modified from the AMP by Example project:

- images/ic_menu_white_1x_web_24dp.png
- images/ic_menu_white_2x_web_24dp.png
