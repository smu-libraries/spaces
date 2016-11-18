# SMU Libraries Spaces

[Spaces](https://library.smu.edu.sg/spaces) introduces SMU Libraries’ two branches -- Li Ka Shing Library and Kwa Geok Choo Law Library -- through photos and quick facts.

## Build

1. Install [Node.js](https://nodejs.org).
2. Set up the repository and build the site:

  ```
  $ git clone https://github.com/smu-libraries/spaces.git
  $ cd spaces
  $ npm install
  $ npm run build
  ```

3. If everything went well, the site (as static HTML pages) should now be found in the `public` folder. To run a local server for testing, use the command:

  ```
  $ npm start
  ```

4. The local server should be running the site at [http://localhost:3000](http://localhost:3000).

## License

Except where otherwise noted, this project is licensed under the CC-BY-4.0 license. See [LICENSE.txt](LICENSE.txt) for more information.

This project adapts sample code from the [Accelerated Mobile Pages](https://www.ampproject.org) project (see linked [Apache-2.0](https://github.com/ampproject/amphtml/blob/master/LICENSE) license).
