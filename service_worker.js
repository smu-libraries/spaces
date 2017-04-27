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

var precacheConfig = [["about.html","3dabaafd2b6f54cab5f7c4f133977ae4"],["images/KGC_L3_Atrium_1.jpg","4855b90860a6df3886609898286b95ef"],["images/KGC_L3_Atrium_2.jpg","2732e00b8fdac3ad20270635500cb686"],["images/KGC_L3_Atrium_3.jpg","3a5719679ff93b1f7e1a8a726b734836"],["images/KGC_L3_LearnCommons_1.jpg","2b88eb1c81f0f34e7d6c150c322452cd"],["images/KGC_L4_GradLounge_1.jpg","fc7dc2903318ac8ada2ce614b98b9780"],["images/KGC_L4_GradLounge_2.jpg","b2ce2b7f7c55618ae441e4db489e08a2"],["images/KGC_L4_ProjectRms_1.jpg","a5dd2cacb4ff219d9d3c440da7d3989c"],["images/KGC_L4_ProjectRms_3.jpg","466d5f74fd61cb6b3552887716952415"],["images/KGC_L4_QuietArea_1.jpg","4f76545e8d4efa68a4e1606af8da3c52"],["images/KGC_L4_QuietArea_2.jpg","6d6c0b8ac56154377cc69af5fc0ed4fe"],["images/KGC_L4_QuietArea_3.jpg","956075de887b3bf9078d8c2450e8ac6c"],["images/KGC_L5_QuietArea_1.jpg","a8669cd9b32194d84551890da16b5540"],["images/KGC_L5_QuietArea_2.jpg","8debca2dfe95526ebcc9b8b31306f39b"],["images/KGC_L5_QuietArea_3.jpg","dfd5b829e2d14ef066d107fdae16d4ff"],["images/KGC_L5_Terrace_1.jpg","c8ad62ee2169b812721466a25658b115"],["images/KGC_L5_Terrace_2.jpg","47ece6b242c26c6dbe575feaae438ea7"],["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","633dc3cee3124176e1782051439435b1"],["images/favicon_120.png","34c54ede79ccfa160f5b4d4a61097169"],["images/favicon_128.png","fcf9c4171c0e5801b98215aaf5429f8d"],["images/favicon_144.png","2976123db2fb3502bc0570eb4fbbcc47"],["images/favicon_152.png","9ec252a4791845f2b36598ef9374633e"],["images/favicon_167.png","efa9c742c3b5cf8c66e1bcc49c11673b"],["images/favicon_168.png","09bfdd6f1a5cb5bed4f0980ab11e5518"],["images/favicon_180.png","453abfacda451a4c67c2cda5ab7e6d08"],["images/favicon_192.png","3952ca3405444a9d02810eae67005f22"],["images/favicon_48.png","1a04341a7691a3c5c77e42e9d8ab2107"],["images/favicon_72.png","bc3ebcc807d330afa99fe6f593f82011"],["images/favicon_96.png","aebf980fa1f6e28e8bddfcac233e7603"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/kgc.jpg","fcc918f23e67cb74c3c4ad431de9a79c"],["images/kgc_exterior.jpg","24a8573ba93f0679d7b9d0152313046c"],["images/law_1.jpg","a687cbfbadfff4e05437b7a3635a2418"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","87e587944d77bc911fac2240e43522b4"],["images/main_1.jpg","e507b70b21c0bc711d4078c4a12328f2"],["images/main_2.jpg","dbfdd48a0c720b2b80b118682d40526e"],["images/main_hive_1.jpg","ee4c2df9a35fbc9982d2bfc9d7df5e33"],["images/main_hive_4.jpg","378f0e7db58e523a578c52f8e7f68f06"],["images/main_investment_studio_1.jpg","035368eecc7c26ffa9df225c36e44d9e"],["images/main_investment_studio_2.jpg","6f2dae9da06053277d0e768390b37757"],["images/main_learning_commons_1.jpg","e776c28815c4633aba0ce530c6acfbc3"],["images/main_learning_commons_2.jpg","bf0e859994e4f75b6e1f01b2cac1c245"],["images/main_learning_commons_3.jpg","5759c36531293f611e23cbd8d1f24898"],["images/main_learning_labs_2.jpg","b1547df569e4a4fa769298fc78e047bf"],["images/main_learning_labs_3.jpg","277927bbf131988783a3852e14617de6"],["images/main_lounge_6.jpg","a2b546f1b00396fd3a9e2a862f7bc305"],["images/main_lounge_7.jpg","5a64815c36ae94ac6f0a3cddeff2cf4b"],["images/main_lounge_dvds.jpg","f8d814007276ba51416168577bf1858a"],["images/main_lounge_newspaper.jpg","08428775be6cdb24487ecd121587cc25"],["images/main_postgraduate_lounge_suite_1.jpg","f079d3e1ae6b8b0a372ac3fe9f43fa2f"],["images/main_postgraduate_lounge_suite_2.jpg","3f5be8a14598679680a2b4993c84c028"],["images/main_project_rooms_1.jpg","e8b05bef904ee6f99245d6994915709c"],["images/main_project_rooms_2.jpg","fda29503aed7c67c7ab328d384e5ca44"],["images/main_project_rooms_3.jpg","7cc8e471eb6ebdbd2f180c90c56bbc0a"],["images/main_quiet_area_1.jpg","69acb198c32201f51a8fcdfe85d11e91"],["images/main_quiet_area_3.jpg","08315d29232ab07751669af51d4bb1df"],["images/main_quiet_area_4a.jpg","df785438c9adda94096e030c718f2e6f"],["images/main_quiet_area_4b.jpg","29ef22468cb1d8d350380e086508d7a6"],["images/main_quiet_area_5.jpg","420848b990c33994a0a2494db2198aa2"],["images/main_rooftop_garden_3.jpg","c4cc2d4153dffc7430a16ecdc32fa932"],["images/main_rooftop_garden_5.jpg","b7fb422fa071eec0ab12f3b1a8ca225e"],["images/main_rooftop_garden_7.jpg","a422f559bbb587d2e402699c171b312a"],["images/main_study_booths_1.jpg","4d98579af1704c72176197d1af815987"],["images/main_study_booths_3.jpg","6d6b0f9bfed8b385fec58e56e433f73e"],["images/main_study_booths_level3.jpg","f744425718b460eb04e74ccd61b6086b"],["images/smoo_smoo_blue_tiny.svg","6c58a858f0537625ebcf6513cdcd8be6"],["images/smoo_smoo_white.svg","66ef5f4faea50f93f7e6569ef67fb100"],["images/smoo_smoo_white_tiny.svg","f9bd335d263ed26bbb6d3ea11ff7ab60"],["index.html","bca4de90e72a0cca9c175a5226ecf475"],["kgc_atrium.html","9cef8bb296d3e7ded5a48da2fa2965fe"],["kgc_graduate_lounge.html","e1a9b1e0ec94aad4d3b395a92a8e1b0f"],["kgc_learning_commons.html","4f8394b239030adf7c5702e5a2cb6399"],["kgc_learning_labs.html","8aecc3ba464d8519553213becf58a0e5"],["kgc_overview.html","b2b102ff27ba6a5203e85342d1e1936a"],["kgc_project_rooms.html","dc06bb0899835aa73fac4fe057083252"],["kgc_quiet_area.html","0929a6a05421fc140092020033875677"],["kgc_terrace.html","e6a436a9f08a4700b2170adcb0d5e3b2"],["main_graduate_lounge_suite.html","2b7cecba44388e988e1e6081c52a9bc0"],["main_hive.html","202493020ffea005d0681a69b9c7ec90"],["main_investment_studio.html","2ea4f447c36a9fab70e6d82958f210df"],["main_learning_commons.html","1426559b634dbefcaaeb85cb738af225"],["main_learning_labs.html","2a5d03bee194f140780429ec8f1ba2f2"],["main_lounge.html","0d201994c628e10aefc9a81e2cc36cf4"],["main_overview.html","a516df24a224c81cc2b40b57801c9401"],["main_project_rooms.html","125edcdfc8233e541808ce3a558e7c53"],["main_quiet_area.html","ae4f84a855e174fc31fda64b65e3ccee"],["main_rooftop_garden.html","5d82ed965a690113803da45f8086b0cd"],["main_study_booths.html","b837e8852c85772907c4143d4b3e3f26"],["manifest.json","c791924472352e8aa0ea2c6b2f51d9de"]];
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
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
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







