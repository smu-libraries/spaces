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

var precacheConfig = [["images/close_left_black.svg","18e3cc6bdf9a7866cd18fdd4a798f922"],["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","6780ca2d02daffb44936993ed906dcf4"],["images/favicon_120.png","89f88ea901d3b317406cd17c9ecfd74d"],["images/favicon_128.png","11bccf23496ec001c8e51f3992b26be8"],["images/favicon_144.png","a39d96dadbda4436e803bb6504a0b518"],["images/favicon_152.png","298503af063decefe8a71b7e53bad431"],["images/favicon_167.png","69a41a498de31b21d6bd9a69af91c782"],["images/favicon_168.png","a7243bbac6582d8af715eb58c8814697"],["images/favicon_180.png","776c854065fbbf42ae7924f9cc8c56aa"],["images/favicon_192.png","f5c4ed3a8030f049dffacd3a72fa3b4a"],["images/favicon_48.png","602203358746eb5e717623ca38aa6d8d"],["images/favicon_72.png","bcd7384893317ce0dafcca4bae6d600b"],["images/favicon_96.png","f3a6d021cf3255317f64cc8eebac4c3c"],["images/hamburger_black.svg","df8c5f9b7cbf0168d08b4fc01df9433d"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/logo_black.svg","3ed0828b3426cd0ee92ac3451feae1a8"],["images/logo_color.svg","a5bbb12f70aeffad8e18c9afd297d716"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","f645e1b8a8455ba766365894b0b8a622"],["images/main_1.jpg","3c6c4c46e355e71eaa06a3b41354bd90"],["images/main_2.jpg","442b921d37605fa0cdd6bad37a8052a8"],["images/main_3.jpg","945c40dbe8555c0adcb2a431ea87130a"],["images/main_hive_1.jpg","f1a8fcf05514d542a7168ea707684542"],["images/main_hive_2.jpg","b0eb657b89d5720c2b82d7ba69d1a49b"],["images/main_hive_3.jpg","3f1df05f3c217432aedb0a8e8795820a"],["images/main_hive_4.jpg","d35dda6d0114a84c5ff53f2d974c3d40"],["images/main_hive_5.jpg","4498a80f725bef19ac774b77bef32acd"],["images/main_investment_studio_2.jpg","3e088725a3a427e9489e01c12f995bbe"],["images/main_investment_studio_3.jpg","8d1bef00643a03e80219309b01f02455"],["images/main_investment_studio_4.jpg","c1ebca30591e2163bb15ec2bb5829330"],["images/main_investment_studio_5.jpg","ff197e4d679fc8a027086109e62e05c2"],["images/main_learning_commons_1.jpg","89fdff7490f83945d83c883c5cde2d21"],["images/main_learning_commons_2.jpg","b3bb19245b0884cabe3def13f55fc7c3"],["images/main_learning_commons_3.jpg","65769345597a4ded5d300eea7c7f0e88"],["images/main_learning_labs_2.jpg","6896530ae2ff7c17c1f44b0b4073856a"],["images/main_learning_labs_3.jpg","065c660e060273a82438e07590d64631"],["images/main_lounge_1.jpg","c87d51d9a742dcaf9cd4aac127621c53"],["images/main_lounge_2.jpg","49a89886a7050d4991a256f9a2dbe952"],["images/main_lounge_3.jpg","27c0b8eeb0fc45f18d75bd1080426842"],["images/main_lounge_4.jpg","013d220574277390db36e95fcf6a99eb"],["images/main_lounge_5.jpg","6550fe3dcb53c01f61092221e442e532"],["images/main_postgraduate_lounge_suite_1.jpg","d610d8108b1fb881e55e5843c61fb55f"],["images/main_rooftop_garden_1.jpg","5d2626bd437b90af50861066fd50dbfc"],["images/main_rooftop_garden_2.jpg","8927c89975f997507328983c641d3088"],["images/main_rooftop_garden_3.jpg","e6da9d81b6d173087aec0cba8e05c51e"],["images/main_rooftop_garden_4.jpg","4775f4e67e2dbed1efb017246e25b10b"],["images/main_study_booths_1.jpg","8d30c6b2e0bb8912ec5fb5cc4c3662c3"],["images/main_study_booths_2.jpg","77ee46c1ee50c18478845e429732d169"],["images/main_study_booths_3.jpg","afc5a22ffc563bb97a9cb594ee8f1551"],["index.html","f94df04f070bc47678bd96d703be3e9f"],["kgc_atrium.html","cccc1e609980c4219dc175282e97da2a"],["kgc_learning_commons.html","52663a15029575bf5bd5985f5783518d"],["kgc_learning_labs.html","bfd12684448c240b2f166898ff0cbe35"],["kgc_lounge.html","cc322c1d05d6417a796a474c3eab6a45"],["kgc_overview.html","cb26033344ba71bd0ed290571c0339d5"],["kgc_postgraduate_lounge.html","b5a13d63a07bc41ffc2e8478980f8465"],["kgc_terrace.html","5c3cc7da4a395170223ceb9efdda69db"],["main_hive.html","19997262b9b689984c28c2582a52135b"],["main_investment_studio.html","a90fb41e5ed354b3810949f1a4eb16bd"],["main_learning_commons.html","049a2fe448398fe6aa2693e871098af4"],["main_learning_labs.html","fe5057e41c9b4cbedeceafb0d45e5b23"],["main_lounge.html","7a5b4f43031478d0b617a4ff8961b72b"],["main_overview.html","ba208d51201e89c3b55d18f40a9db4a8"],["main_postgraduate_lounge_suite.html","db26ded5a742e577edba7fc460dce81e"],["main_rooftop_garden.html","f5f4d6f8d4552f85151d0ece6334e866"],["main_study_booths.html","ab25049d0fb0be8224672239ecbb943a"],["manifest.json","c791924472352e8aa0ea2c6b2f51d9de"]];
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







