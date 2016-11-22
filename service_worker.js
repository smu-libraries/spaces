/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","633dc3cee3124176e1782051439435b1"],["images/favicon_120.png","34c54ede79ccfa160f5b4d4a61097169"],["images/favicon_128.png","fcf9c4171c0e5801b98215aaf5429f8d"],["images/favicon_144.png","2976123db2fb3502bc0570eb4fbbcc47"],["images/favicon_152.png","9ec252a4791845f2b36598ef9374633e"],["images/favicon_167.png","efa9c742c3b5cf8c66e1bcc49c11673b"],["images/favicon_168.png","09bfdd6f1a5cb5bed4f0980ab11e5518"],["images/favicon_180.png","453abfacda451a4c67c2cda5ab7e6d08"],["images/favicon_192.png","3952ca3405444a9d02810eae67005f22"],["images/favicon_48.png","1a04341a7691a3c5c77e42e9d8ab2107"],["images/favicon_72.png","bc3ebcc807d330afa99fe6f593f82011"],["images/favicon_96.png","aebf980fa1f6e28e8bddfcac233e7603"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","0403e238a7d7d4ada4b2d7ff1f85cf0d"],["images/main_1.jpg","dfa165f7ad597b9aace5ce88a004a3fc"],["images/main_2.jpg","931fdda6c4b46cac9996fdc556ba6ff0"],["images/main_blue.jpg","945c40dbe8555c0adcb2a431ea87130a"],["images/main_hive_1.jpg","7732b854e3703767e0243a657b33ef29"],["images/main_hive_4.jpg","36f34d0eca9799130133d21dc76515e6"],["images/main_hive_5.jpg","db59e934ae4a7ab7e894e101dee9c0f8"],["images/main_investment_studio_4.jpg","87ae2dbbf070bce347ac684acdff6fbc"],["images/main_investment_studio_5.jpg","ab837380f8a82243e58992f869f18859"],["images/main_learning_commons_1.jpg","2cfcc7bd2560b1f1b22234be17cd6974"],["images/main_learning_commons_2.jpg","e45b91ee2ad2260e95df7f4701625392"],["images/main_learning_commons_3.jpg","1715f742a10b59df7a712638e86499a3"],["images/main_learning_labs_2.jpg","a48b3a662f1bf91f3382d707902c7533"],["images/main_learning_labs_3.jpg","29b164ee7c90cfaf6245ab28fff377a0"],["images/main_lounge_3.jpg","2babfbae3df1865dd8c40cc5a44f1bb0"],["images/main_lounge_4.jpg","e305cc1ea87fa7ec78d64313e3800044"],["images/main_lounge_5.jpg","2081548c49e5b091494be3475e64008c"],["images/main_lounge_6.jpg","0cfc1b766deb79b04ac727f8c4364951"],["images/main_lounge_7.jpg","b5e00f3344659b6628d4d9dd2b843953"],["images/main_postgraduate_lounge_suite_1.jpg","fc8510ebd2750770e52cf0fbf15f093a"],["images/main_rooftop_garden_3.jpg","94da59b5af9c54d1b7b4d053905d90f6"],["images/main_rooftop_garden_5.jpg","9db49806bd03dcdff1eea7bc5a9b12e4"],["images/main_rooftop_garden_6.jpg","851becd2c49c9942565a9d6dd16f9530"],["images/main_rooftop_garden_7.jpg","4e67d85af3804f07061682da4b4d476c"],["images/main_study_booths_1.jpg","9a55967f7c74683ea4b37e38cc82db51"],["images/main_study_booths_3.jpg","cc6cef81a734eb9d6b4f8494ab19e345"],["images/smoo_smoo_white.svg","66ef5f4faea50f93f7e6569ef67fb100"],["index.html","d484a7b0c14a371beb2df4b1fa80d980"],["kgc_atrium.html","d87217e362826f7e470a4962adbb55b4"],["kgc_learning_commons.html","57014c20849fdd6f948f86ed01c13b9b"],["kgc_learning_labs.html","7d1e87c4bb1ab4faf4579247b8061424"],["kgc_lounge.html","0d3488ee02e240537cb05e9cf4bc45cb"],["kgc_overview.html","8520cc0a5f92a516c79ca03b008a3164"],["kgc_postgraduate_lounge.html","0de753dfe66f3c2f828a7d0323e8aaa6"],["kgc_terrace.html","b821881cc7878c52dacac73ab0dcdf17"],["main_investment_studio.html","4639b9acb18001c076cd5982b688ed7b"],["main_learning_commons_hive.html","f925e06f0327d776f3d5adaecb234352"],["main_learning_labs.html","a56ce9ba68804349978882592a1dc3a3"],["main_lounge.html","70927ebbc332271ac3c1bfe49f7da0d8"],["main_overview.html","b9393bb3b0451cfdcbc69acb0dd36de0"],["main_postgraduate_lounge_suite.html","c67a26137d2b387c582cbe7026d7329b"],["main_rooftop_garden.html","b6c2d401cc5da9c620397589505904cc"],["main_study_booths.html","1be20d151bc2ac1534a4e6b9e27dcf94"],["manifest.json","c791924472352e8aa0ea2c6b2f51d9de"]];
var cacheName = 'sw-precache-v2-spaces-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







