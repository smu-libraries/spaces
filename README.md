# SMU Libraries Spaces

[Spaces](https://library.smu.edu.sg/spaces) introduces SMU Libraries’ two branches -- Li Ka Shing Library and Kwa Geok Choo Law Library -- through photos and quick facts.

## Building the site

1. Install [Node.js](https://nodejs.org).
2. Install [gulp](https://gulpjs.com).

  ```
  $ npm install -g gulp-cli
  ```

3. Set up the repository and build the site:

  ```
  $ git clone https://github.com/smu-libraries/spaces.git
  $ cd spaces
  $ npm install
  $ gulp dev
  ```

If everything went well, a development server (using [Browsersync](https://www.browsersync.io)) should be running the site at the URL [http://localhost:3000](http://localhost:3000). The default web browser on your system should open automatically to display the welcome page. The entire site (as static HTML pages) should now be found in the `public` folder.

Use Ctrl-C to stop the server.

### Development vs. release build

There are two gulp tasks that can be used to build the site:

 gulp task | `gulp dev` | `gulp rel`
-----------|------------|------------
Minify HTML files | No | Yes
Enable precaching using service worker | No | Yes
Enable Google Analytics | No | Yes
Validate AMP HTML files | No | Yes

## Customizing the site

The following folders are used to store source content:

 Folder | Description
--------|-------------
images | For images (including photos) -- .jpg, .png, .svg
less | For embedded styles that will be pre-processed into CSS using Less -- .less
schema | For embedded linked data -- .json
static | For additional content meant to be copied over to the site -- manifest.json, web.config
templates | For page templates that will be rendered into HTML using Hogan -- .mustache

Each page template corresponds to an actual HTML page in the site, or a partial HTML snippet that is embedded within another HTML page.

For the most basic content customization, for example, to add new photos, place the photo files inside `images` folder and edit the file `templates/context.json` to create new slides for the page template.

After building the site (by invoking either `gulp dev` or `gulp rel`) several temporary folders are created:

 Folder | Description
--------|-------------
html | For processed HTML files
public | For the final combined output
styles | For process CSS files

## Publishing the site

1. Publish the website to the `gh-pages` branch for verification and testing.

```
$ gulp publish
```

2. Publish the website to the `release` branch for actual deployment.

```
$ gulp publish_release
```

## License

Except where otherwise noted, this project is licensed under the CC-BY-4.0 license. See [LICENSE.txt](LICENSE.txt) for more information.

This project adapts sample code from the [Accelerated Mobile Pages](https://www.ampproject.org) project (see linked [Apache-2.0](https://github.com/ampproject/amphtml/blob/master/LICENSE) license).
