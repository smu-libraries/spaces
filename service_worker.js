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

var precacheConfig = [["images/close_left_black.svg","18e3cc6bdf9a7866cd18fdd4a798f922"],["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","b1bcb38935e7850c320db4c6f8dd979e"],["images/favicon_120.png","e15d289982616d701d63f3f1b1990e7d"],["images/favicon_128.png","9ba43646753e8b98b6058f565e0c5ca7"],["images/favicon_144.png","99ad11910f2e0ab27e9090358585a2a0"],["images/favicon_152.png","2c96dbaae95487fd1245a13f618fab51"],["images/favicon_167.png","3335f51f08ff69ca5542ed275dd636c8"],["images/favicon_168.png","58f17c06c9cf7c96dbb68f63a20f2e19"],["images/favicon_180.png","e052ede910c120dc61787d74ef42c86a"],["images/favicon_192.png","784f77461c047ec0dd4aa025293b58ff"],["images/favicon_48.png","a839168a07df81a9bb5b065131c90c33"],["images/favicon_72.png","a8abf34b7b2f73b43cf1389b8aa435b4"],["images/favicon_96.png","1a8f6645fc01d623d3f1f15a88aa7148"],["images/hamburger_black.svg","df8c5f9b7cbf0168d08b4fc01df9433d"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/logo_black.svg","3ed0828b3426cd0ee92ac3451feae1a8"],["images/logo_color.svg","a5bbb12f70aeffad8e18c9afd297d716"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main_1.jpg","3c6c4c46e355e71eaa06a3b41354bd90"],["images/main_2.jpg","442b921d37605fa0cdd6bad37a8052a8"],["images/main_3.jpg","945c40dbe8555c0adcb2a431ea87130a"],["images/main_hive_1.jpg","7ed7ea361bbeb90a7490b2ff7407b10c"],["images/main_hive_2.jpg","ee2efb946e7ecb7f29569cb5ab92504d"],["images/main_hive_3.jpg","15035b6705ffedcd8b2e937a78888835"],["images/main_hive_4.jpg","67193cdeddeea464190ceecc775222be"],["images/main_hive_5.jpg","c127d055ff6b060c5d67041ffe8e4c54"],["images/main_investment_studio_2.jpg","3e088725a3a427e9489e01c12f995bbe"],["images/main_investment_studio_3.jpg","438d30a53e3aa20cf706324028c887d7"],["images/main_investment_studio_4.jpg","c472513580bc7808eb5f8e44b1aa87f9"],["images/main_investment_studio_5.jpg","c61296dbf7fcca226a3d43ae8408eefb"],["images/main_learning_commons_1.jpg","4595b46f52a66269100eb918a6cd4830"],["images/main_learning_commons_2.jpg","b3bb19245b0884cabe3def13f55fc7c3"],["images/main_learning_commons_3.jpg","6378628a3a9717d23a93a211319aa187"],["images/main_learning_labs_2.jpg","6896530ae2ff7c17c1f44b0b4073856a"],["images/main_learning_labs_3.jpg","38c685cbeba7d0b82eded0e34df36584"],["images/main_lounge_1.jpg","c87d51d9a742dcaf9cd4aac127621c53"],["images/main_lounge_2.jpg","49a89886a7050d4991a256f9a2dbe952"],["images/main_lounge_3.jpg","27c0b8eeb0fc45f18d75bd1080426842"],["images/main_lounge_4.jpg","013d220574277390db36e95fcf6a99eb"],["images/main_lounge_5.jpg","6550fe3dcb53c01f61092221e442e532"],["images/main_postgraduate_lounge_suite_1.jpg","f8e3062494a8045f08dd38fa4d602c61"],["images/main_rooftop_garden_1.jpg","5d2626bd437b90af50861066fd50dbfc"],["images/main_rooftop_garden_2.jpg","8927c89975f997507328983c641d3088"],["images/main_rooftop_garden_3.jpg","e6da9d81b6d173087aec0cba8e05c51e"],["images/main_rooftop_garden_4.jpg","4775f4e67e2dbed1efb017246e25b10b"],["images/main_study_booths_1.jpg","9fdb489e93bb551555e04d68445b0c92"],["images/main_study_booths_2.jpg","9813e0bdc9a680f77d7f26bd9f97b3b2"],["images/main_study_booths_3.jpg","0847aa618411d1f68b2999977699da83"],["index.html","8209aba551d2a734e9f8dfc4e7960877"],["kgc_atrium.html","22b36ddfe5360bb403800c7c0e06d270"],["kgc_learning_commons.html","760680e1f78d983928d70150aff2b893"],["kgc_learning_labs.html","ecd836c79390dcaa19f8d25c44a9ee3d"],["kgc_lounge.html","47e36a45406bfb73d5bd842bb1eaf528"],["kgc_overview.html","8683a79a03777422c558eb5d91df1fd3"],["kgc_postgraduate_lounge.html","c52833f9fc30469c7bf59b91bd7cb43a"],["kgc_terrace.html","e28e2eaebb3b4c29d59ff38bd3f7b605"],["main_hive.html","869bbbd0a34610125c97664eab0d25e5"],["main_investment_studio.html","b07e962bd051950dcbf3bc6d339ac5e1"],["main_learning_commons.html","ae5e22928235928fd1ffca02b471995a"],["main_learning_labs.html","9a57ba00f06a05ecf8f3e94c4ea60e44"],["main_lounge.html","006d6eb0f49e4d4ed9f5c38da0890e21"],["main_overview.html","7c0e447cccb255b184873df02d9bc68b"],["main_postgraduate_lounge_suite.html","33008824dc60609c60c8486c51f8a70b"],["main_rooftop_garden.html","5ce74014b30996d7ea9d6e6744271bcb"],["main_study_booths.html","77cbae1d595966ad49a535e1d6791f0c"],["manifest.json","d245c681ad07c35f2c7714424ec7fb25"]];
var cacheName = 'sw-precache-v2-nolita-' + (self.registration ? self.registration.scope : '');


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







