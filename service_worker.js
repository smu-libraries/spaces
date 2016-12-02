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

var precacheConfig = [["about.html","1dc21c8da317a3e44e5232c5ff7b5cff"],["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","633dc3cee3124176e1782051439435b1"],["images/favicon_120.png","34c54ede79ccfa160f5b4d4a61097169"],["images/favicon_128.png","fcf9c4171c0e5801b98215aaf5429f8d"],["images/favicon_144.png","2976123db2fb3502bc0570eb4fbbcc47"],["images/favicon_152.png","9ec252a4791845f2b36598ef9374633e"],["images/favicon_167.png","efa9c742c3b5cf8c66e1bcc49c11673b"],["images/favicon_168.png","09bfdd6f1a5cb5bed4f0980ab11e5518"],["images/favicon_180.png","453abfacda451a4c67c2cda5ab7e6d08"],["images/favicon_192.png","3952ca3405444a9d02810eae67005f22"],["images/favicon_48.png","1a04341a7691a3c5c77e42e9d8ab2107"],["images/favicon_72.png","bc3ebcc807d330afa99fe6f593f82011"],["images/favicon_96.png","aebf980fa1f6e28e8bddfcac233e7603"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/kgc.jpg","77518067be29f0d385b407c9fb9f8540"],["images/kgc_1.jpg","b296c985a7930550dd67ee7fcae43a21"],["images/kgc_2.jpg","7bbc1be56bd150a78069b72f43d90edb"],["images/kgc_3.jpg","da4a885ec2e33542a8aea4eabd527687"],["images/law_1.jpg","a687cbfbadfff4e05437b7a3635a2418"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","87e587944d77bc911fac2240e43522b4"],["images/main_1.jpg","e507b70b21c0bc711d4078c4a12328f2"],["images/main_2.jpg","dbfdd48a0c720b2b80b118682d40526e"],["images/main_hive_1.jpg","ee4c2df9a35fbc9982d2bfc9d7df5e33"],["images/main_hive_4.jpg","378f0e7db58e523a578c52f8e7f68f06"],["images/main_hive_5.jpg","e869f6cff2442893ff2bfd97e9778570"],["images/main_investment_studio_4.jpg","a1f1a3f40896423a3867d9c0d6f76d5a"],["images/main_investment_studio_5.jpg","b6418fa3c264640acbb4e8e660ea8147"],["images/main_learning_commons_1.jpg","e776c28815c4633aba0ce530c6acfbc3"],["images/main_learning_commons_2.jpg","bf0e859994e4f75b6e1f01b2cac1c245"],["images/main_learning_commons_3.jpg","5759c36531293f611e23cbd8d1f24898"],["images/main_learning_labs_2.jpg","b1547df569e4a4fa769298fc78e047bf"],["images/main_learning_labs_3.jpg","277927bbf131988783a3852e14617de6"],["images/main_lounge_3.jpg","7ac46d4eacdeb31faedd3d2bd698e547"],["images/main_lounge_4.jpg","516c0b41e49527e1050ffcd9fb1a7d84"],["images/main_lounge_5.jpg","b0ca13a8dd4145ca4ee4e72e9bf35c25"],["images/main_lounge_6.jpg","a2b546f1b00396fd3a9e2a862f7bc305"],["images/main_lounge_7.jpg","5a64815c36ae94ac6f0a3cddeff2cf4b"],["images/main_postgraduate_lounge_suite_1.jpg","f079d3e1ae6b8b0a372ac3fe9f43fa2f"],["images/main_rooftop_garden_3.jpg","c4cc2d4153dffc7430a16ecdc32fa932"],["images/main_rooftop_garden_5.jpg","b7fb422fa071eec0ab12f3b1a8ca225e"],["images/main_rooftop_garden_6.jpg","ae88e65f2a7d33cf2198555cd55c74cc"],["images/main_rooftop_garden_7.jpg","a422f559bbb587d2e402699c171b312a"],["images/main_study_booths_1.jpg","4d98579af1704c72176197d1af815987"],["images/main_study_booths_3.jpg","6d6b0f9bfed8b385fec58e56e433f73e"],["images/smoo_smoo_white.svg","66ef5f4faea50f93f7e6569ef67fb100"],["index.html","e5914ae99dbed9ba5eae52ab42c25310"],["kgc_atrium.html","8fde7e00d073e9cace37f2f9c996cb8a"],["kgc_learning_commons.html","b042b66f817d2bf9ee28c733442c6c31"],["kgc_learning_labs.html","a39276a285a98e6349e9e4d8499cc00f"],["kgc_lounge.html","f1185c7705563b0cd98a80be44b7a18b"],["kgc_overview.html","6ef94fdfb1803c7a5fcce24be9cb6174"],["kgc_postgraduate_lounge.html","35d5d6ef21be38215fbfae28a7595c15"],["kgc_terrace.html","7ae891e03ecf4d966a75d254e8da32e2"],["main_investment_studio.html","d12d9e30116d4220526f5534c2faff99"],["main_learning_commons_hive.html","045c858e8599249e0ba3462e4f94877d"],["main_learning_labs.html","6b1b20b3a4ab72f8e16cc5afc9add1de"],["main_lounge.html","62f80aa3261dde1fdc5a8fdeddc7f8d8"],["main_overview.html","156943e5ff482358b62b97874ee9b48b"],["main_postgraduate_lounge_suite.html","28f84703f8b80c38b81e48081b628b82"],["main_rooftop_garden.html","710c282491e825579cd32d90cc09d41c"],["main_study_booths.html","7f2dbf87c59169c2d47e00fcb4705b6c"],["manifest.json","c791924472352e8aa0ea2c6b2f51d9de"]];
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







