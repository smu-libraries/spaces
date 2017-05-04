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

var precacheConfig = [["about.html","3b12ef3bc9ea6e49a8c4cd8f86c28955"],["images/close_left_white.svg","43fdb1d490d0cb364a72d6f61ba38e18"],["images/favicon.svg","633dc3cee3124176e1782051439435b1"],["images/favicon_120.png","34c54ede79ccfa160f5b4d4a61097169"],["images/favicon_128.png","fcf9c4171c0e5801b98215aaf5429f8d"],["images/favicon_144.png","2976123db2fb3502bc0570eb4fbbcc47"],["images/favicon_152.png","9ec252a4791845f2b36598ef9374633e"],["images/favicon_167.png","efa9c742c3b5cf8c66e1bcc49c11673b"],["images/favicon_168.png","09bfdd6f1a5cb5bed4f0980ab11e5518"],["images/favicon_180.png","453abfacda451a4c67c2cda5ab7e6d08"],["images/favicon_192.png","3952ca3405444a9d02810eae67005f22"],["images/favicon_48.png","1a04341a7691a3c5c77e42e9d8ab2107"],["images/favicon_72.png","bc3ebcc807d330afa99fe6f593f82011"],["images/favicon_96.png","aebf980fa1f6e28e8bddfcac233e7603"],["images/feedback_1.svg","3d3c5a07a1e9de5cba1fd38472c22594"],["images/feedback_2.svg","8577bfdd20756673e74b3b053813354e"],["images/feedback_3.svg","e3a0f591ce749863a3965ac6d15c53b7"],["images/feedback_4.svg","4fd89ef87793489a34f75f51474f2901"],["images/feedback_5.svg","d456cce9588ab7b3820ea73934dc5738"],["images/hamburger_white.svg","54d2e5a6725fbd89f072297e9e4188ae"],["images/kgc.jpg","fcc918f23e67cb74c3c4ad431de9a79c"],["images/kgc_exterior.jpg","76587b5e8994158ca9431374d726137e"],["images/kgc_l3_atrium_1.jpg","87ad9572fbe48dafd43bb83787d1ef7b"],["images/kgc_l3_atrium_2.jpg","7fb4d38b58ef99ef25aa0b3e69fc1be4"],["images/kgc_l3_atrium_3.jpg","2c4aed1cf5f2c3612b0fbae907bfebbd"],["images/kgc_l3_atrium_4.jpg","8e0659ca25539a65d3f6d95da4299c94"],["images/kgc_l3_learncommons_1.jpg","01599a0232632fb114c93e507acb2417"],["images/kgc_l3_learncommons_2.jpg","bfa0766600794674d639bcee40eb8789"],["images/kgc_l3_learncommons_4.jpg","8051d7f69afc2c541a3d51a0cee8516a"],["images/kgc_l3_learnlabs_1.jpg","85e63d630639760c979874718891ce77"],["images/kgc_l3_learnlabs_2.jpg","3bc290752ac64bae05e2ce57ae399e45"],["images/kgc_l3_learnlabs_3.jpg","aadeb875fd9ad30534b7334460993a8d"],["images/kgc_l4_gradlounge_1.jpg","dc16a26e0e344be9605cb6664b938db7"],["images/kgc_l4_gradlounge_2.jpg","50ef2989411a02dabad422bc475bc781"],["images/kgc_l4_gradlounge_3.jpg","4e32be27602e62baf9485745076a3f99"],["images/kgc_l4_projectrms_1.jpg","f3cc24fe6891db172f734637c9011502"],["images/kgc_l4_projectrms_3.jpg","c670928cd87b29cb2f620f8bd3a906bd"],["images/kgc_l4_quietarea_1.jpg","eeb2736bc6ff8dfbb1db6f145071c3f6"],["images/kgc_l4_quietarea_2.jpg","4b491eba41f83fc25e8cf1f0720b6387"],["images/kgc_l4_quietarea_3.jpg","acb7d6744cd72eaede7e128f3cd49215"],["images/kgc_l5_quietarea_1.jpg","b89d5ee862799ac99a2e3992756ac6a5"],["images/kgc_l5_quietarea_2.jpg","6718bf587da94002a0a1dad49568840a"],["images/kgc_l5_quietarea_3.jpg","f04e0b5c3d0f4d5e32462a68a6194742"],["images/kgc_l5_terrace_1.jpg","2e1776fe95b4cb5a973afe4a28ef5931"],["images/kgc_l5_terrace_2.jpg","651ee6fd8a80a7a282d8c71b81370f0a"],["images/kgc_l5_terrace_3.jpg","423ff699adbb668d02b5511189d18262"],["images/logo_white.svg","dd7a3acff4a1c83f7663a33ca0a1a102"],["images/main.jpg","f07ad6afd2a38e1a417976122801a739"],["images/main_1.jpg","e507b70b21c0bc711d4078c4a12328f2"],["images/main_2.jpg","dbfdd48a0c720b2b80b118682d40526e"],["images/main_hive_1.jpg","ee4c2df9a35fbc9982d2bfc9d7df5e33"],["images/main_hive_4.jpg","378f0e7db58e523a578c52f8e7f68f06"],["images/main_investment_studio_1.jpg","035368eecc7c26ffa9df225c36e44d9e"],["images/main_investment_studio_2.jpg","6f2dae9da06053277d0e768390b37757"],["images/main_learning_commons_1.jpg","e776c28815c4633aba0ce530c6acfbc3"],["images/main_learning_commons_2.jpg","bf0e859994e4f75b6e1f01b2cac1c245"],["images/main_learning_commons_3.jpg","5759c36531293f611e23cbd8d1f24898"],["images/main_learning_labs_1a.jpg","06be37538c89b5a90805919d229c47f9"],["images/main_learning_labs_1b.jpg","f393480391705b1c4177233f37c46cd6"],["images/main_learning_labs_1c.jpg","49c92b43802bca3c592a80f1c8862b92"],["images/main_lounge_6.jpg","a2b546f1b00396fd3a9e2a862f7bc305"],["images/main_lounge_7.jpg","5a64815c36ae94ac6f0a3cddeff2cf4b"],["images/main_lounge_dvds.jpg","f8d814007276ba51416168577bf1858a"],["images/main_lounge_newspaper.jpg","b7cb9a41bc8cc00eb31b64b87977a794"],["images/main_postgraduate_lounge_suite_1.jpg","f079d3e1ae6b8b0a372ac3fe9f43fa2f"],["images/main_postgraduate_lounge_suite_2.jpg","3f5be8a14598679680a2b4993c84c028"],["images/main_project_rooms_1.jpg","e8b05bef904ee6f99245d6994915709c"],["images/main_project_rooms_2.jpg","fda29503aed7c67c7ab328d384e5ca44"],["images/main_project_rooms_3.jpg","7cc8e471eb6ebdbd2f180c90c56bbc0a"],["images/main_quiet_area_1.jpg","69acb198c32201f51a8fcdfe85d11e91"],["images/main_quiet_area_3.jpg","08315d29232ab07751669af51d4bb1df"],["images/main_quiet_area_4a.jpg","df785438c9adda94096e030c718f2e6f"],["images/main_quiet_area_4b.jpg","29ef22468cb1d8d350380e086508d7a6"],["images/main_quiet_area_5.jpg","420848b990c33994a0a2494db2198aa2"],["images/main_rooftop_garden_3.jpg","24ff2448d383817fd54e22fffdbc56cc"],["images/main_rooftop_garden_5.jpg","b7fb422fa071eec0ab12f3b1a8ca225e"],["images/main_rooftop_garden_7.jpg","5f6d84b5e3dc345e539c1d8252360c45"],["images/main_rooftop_garden_8.jpg","ab29168884f19c5d4e8204bb58819b10"],["images/main_study_booths_1.jpg","4d98579af1704c72176197d1af815987"],["images/main_study_booths_3.jpg","6d6b0f9bfed8b385fec58e56e433f73e"],["images/main_study_booths_level3.jpg","f744425718b460eb04e74ccd61b6086b"],["images/smoo_smoo_blue_tiny.svg","6c58a858f0537625ebcf6513cdcd8be6"],["images/smoo_smoo_white.svg","66ef5f4faea50f93f7e6569ef67fb100"],["images/smoo_smoo_white_tiny.svg","f9bd335d263ed26bbb6d3ea11ff7ab60"],["images/social_media_facebook.svg","de2d5d9ace6b0c889e8479177f95fa77"],["images/social_media_instagram.svg","c29cba9229de62f591d372ee1d1f95f2"],["images/social_media_twitter.svg","22f991fbbe7b4d57cba717f9dfc10e27"],["index.html","b30edd58394b007822d0c476e7d5582c"],["kgc_atrium.html","2ec06a770eb91228be2adb38de5b6a5b"],["kgc_graduate_lounge.html","e667703fcb34e9c3f3e9895ffe0e7e97"],["kgc_learning_commons.html","e8e59e03244533cc091ea5383964415b"],["kgc_learning_labs.html","f918c52d1ea12b303f502cf237006ef7"],["kgc_overview.html","de35b7d175700936fda659b6dac137f4"],["kgc_project_rooms.html","71efc9ebd1eac99ecf3783f1a1073088"],["kgc_quiet_area.html","f1bc95d823051f743c8ad39505faa941"],["kgc_terrace.html","5b03d9846b23cddcd8a45d32c38a72e4"],["main_graduate_lounge_suite.html","430ca6a1e14ab74ae941e3e993b15f04"],["main_hive.html","10cafaeeb1bb4f7a1d87c7a29abb615b"],["main_investment_studio.html","bfe14672290f5cf53a209f64c336f15d"],["main_learning_commons.html","051cdd59c4cffaec1d0bd845572eda96"],["main_learning_labs.html","dc68340acade767047655d2295c1da09"],["main_lounge.html","b03248cf6bc5aef7ae2886e886501989"],["main_overview.html","16f35a9bf64c649f9ec4942948b49f77"],["main_project_rooms.html","894d26ac9bcd4cd80626133041cc2439"],["main_quiet_area.html","2e34e67d91e9b494a0e268d13b291023"],["main_rooftop_garden.html","6301c71330519d41ac05fab60da6598d"],["main_study_booths.html","4c2a9cbe1a8fcd62580aded717b065e7"],["manifest.json","c791924472352e8aa0ea2c6b2f51d9de"]];
var cacheName = 'sw-precache-v3-spaces-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
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
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
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







