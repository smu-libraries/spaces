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

var precacheConfig = [["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","633dc3cee3124176e1782051439435b1"],["images/favicon_120.png","34c54ede79ccfa160f5b4d4a61097169"],["images/favicon_128.png","fcf9c4171c0e5801b98215aaf5429f8d"],["images/favicon_144.png","2976123db2fb3502bc0570eb4fbbcc47"],["images/favicon_152.png","9ec252a4791845f2b36598ef9374633e"],["images/favicon_167.png","efa9c742c3b5cf8c66e1bcc49c11673b"],["images/favicon_168.png","09bfdd6f1a5cb5bed4f0980ab11e5518"],["images/favicon_180.png","453abfacda451a4c67c2cda5ab7e6d08"],["images/favicon_192.png","3952ca3405444a9d02810eae67005f22"],["images/favicon_48.png","1a04341a7691a3c5c77e42e9d8ab2107"],["images/favicon_72.png","bc3ebcc807d330afa99fe6f593f82011"],["images/favicon_96.png","aebf980fa1f6e28e8bddfcac233e7603"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","f645e1b8a8455ba766365894b0b8a622"],["images/main_1.jpg","0f1e1ff79489c16a3a74d4eb296c1261"],["images/main_2.jpg","902ea8f255b53a4ffcb2731794863261"],["images/main_blue.jpg","945c40dbe8555c0adcb2a431ea87130a"],["images/main_green.jpg","442b921d37605fa0cdd6bad37a8052a8"],["images/main_hive_1.jpg","f1a8fcf05514d542a7168ea707684542"],["images/main_hive_2.jpg","b0eb657b89d5720c2b82d7ba69d1a49b"],["images/main_hive_4.jpg","d35dda6d0114a84c5ff53f2d974c3d40"],["images/main_hive_5.jpg","4498a80f725bef19ac774b77bef32acd"],["images/main_investment_studio_2.jpg","3e088725a3a427e9489e01c12f995bbe"],["images/main_investment_studio_3.jpg","8d1bef00643a03e80219309b01f02455"],["images/main_investment_studio_4.jpg","c1ebca30591e2163bb15ec2bb5829330"],["images/main_investment_studio_5.jpg","ff197e4d679fc8a027086109e62e05c2"],["images/main_learning_commons_1.jpg","89fdff7490f83945d83c883c5cde2d21"],["images/main_learning_commons_2.jpg","b3bb19245b0884cabe3def13f55fc7c3"],["images/main_learning_commons_3.jpg","65769345597a4ded5d300eea7c7f0e88"],["images/main_learning_labs_2.jpg","6896530ae2ff7c17c1f44b0b4073856a"],["images/main_learning_labs_3.jpg","065c660e060273a82438e07590d64631"],["images/main_lounge_1.jpg","c87d51d9a742dcaf9cd4aac127621c53"],["images/main_lounge_2.jpg","49a89886a7050d4991a256f9a2dbe952"],["images/main_lounge_3.jpg","27c0b8eeb0fc45f18d75bd1080426842"],["images/main_lounge_4.jpg","013d220574277390db36e95fcf6a99eb"],["images/main_lounge_5.jpg","6550fe3dcb53c01f61092221e442e532"],["images/main_lounge_6.jpg","0cfc1b766deb79b04ac727f8c4364951"],["images/main_lounge_7.jpg","b5e00f3344659b6628d4d9dd2b843953"],["images/main_postgraduate_lounge_suite_1.jpg","d610d8108b1fb881e55e5843c61fb55f"],["images/main_red.jpg","3c6c4c46e355e71eaa06a3b41354bd90"],["images/main_rooftop_garden_1.jpg","5d2626bd437b90af50861066fd50dbfc"],["images/main_rooftop_garden_2.jpg","8927c89975f997507328983c641d3088"],["images/main_rooftop_garden_3.jpg","e6da9d81b6d173087aec0cba8e05c51e"],["images/main_rooftop_garden_4.jpg","4775f4e67e2dbed1efb017246e25b10b"],["images/main_rooftop_garden_5.jpg","9db49806bd03dcdff1eea7bc5a9b12e4"],["images/main_rooftop_garden_6.jpg","851becd2c49c9942565a9d6dd16f9530"],["images/main_rooftop_garden_7.jpg","4e67d85af3804f07061682da4b4d476c"],["images/main_study_booths_1.jpg","8d30c6b2e0bb8912ec5fb5cc4c3662c3"],["images/main_study_booths_2.jpg","77ee46c1ee50c18478845e429732d169"],["images/main_study_booths_3.jpg","afc5a22ffc563bb97a9cb594ee8f1551"],["images/smoo_smoo_white.svg","66ef5f4faea50f93f7e6569ef67fb100"],["index.html","cd476728e5140f72064091c6c669cbcc"],["kgc_atrium.html","a22b6abb57dc4671c4b1673b09bdb27d"],["kgc_learning_commons.html","13141fddb11d735023902164a2dbd2a5"],["kgc_learning_labs.html","49a9cdeef216d9abdfba968e1b90849a"],["kgc_lounge.html","9ebb00b33b3a58e10a44ee5835cc4a18"],["kgc_overview.html","4bce518832585e4778647a7b85c77e31"],["kgc_postgraduate_lounge.html","8bd617220e3b3e724ffb824c4f9ed5e6"],["kgc_terrace.html","994bec842e2749e3f84f2d00e5f9a3b5"],["main_investment_studio.html","211099c9364c40ad106e293b3423ec6f"],["main_learning_commons_hive.html","e92c61354894bd93e243910cb6ebb4a6"],["main_learning_labs.html","4374d924000ca4b4599cb9cc68531e19"],["main_lounge.html","74647313fc727cc4496affe44f348f8d"],["main_overview.html","42de1c1ac4db213b4b8af0b5eafacc8a"],["main_postgraduate_lounge_suite.html","6c60fb432b4f055d9bb9428c5c2a2e1b"],["main_rooftop_garden.html","daf188767999d90648cffcefa439ab3b"],["main_study_booths.html","3999f9a9fc7a244f701f8e154be52675"],["manifest.json","0a9885ec4e993a25795115a78578a113"]];
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







