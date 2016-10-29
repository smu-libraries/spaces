# NoLiTA

[NoLiTA](https://library.smu.edu.sg/nolita) is an online photo gallery of SMU's two libraries -- Li Ka Shing Library and Kwa Geok Choo Law Library.

This project makes use of [Accelerated Mobile Pages (AMP)](https://www.ampproject.org) to provide an enhanced experience on mobile devices.

## Build

1. Install [Node.js](https://nodejs.org). The project is developed using v7.0.0.
2. Set up the repository and build the site:

  ```
  $ git clone https://github.com/smu-libraries/nolita.git
  $ cd nolita
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

This project adapts sample code from the [Accelerated Mobile Pages Project](https://www.ampproject.org) (in particular, the sub-projects [AMP by Example](https://ampbyexample.com) and [amphtml-validator](https://www.npmjs.com/package/amphtml-validator)), which is released under the Apache-2.0 license. See linked [LICENSE](https://github.com/ampproject/amphtml/blob/master/LICENSE) file for more information.
