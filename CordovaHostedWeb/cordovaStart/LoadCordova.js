/// <reference path="CookieManager.ts" />
/// <reference path="../cordovaApp/app.ts" />
var CordovaHostedWeb;
(function (CordovaHostedWeb) {
    var CordovaLoader;
    (function (CordovaLoader) {
        function init() {
            var platformQuery = getQueryVariable('platform');
            var platformCookie = CordovaHostedWeb.CookieManager.readCookie('platform');
            if (isValidPlatform(platformCookie)) {
                console.log('found cookie ' + platformCookie);
                loadCordova(platformCookie);
            }
            else if (isValidPlatform(platformQuery)) {
                console.log('found query ' + platformQuery);
                CordovaHostedWeb.CookieManager.createCookie("platform", platformQuery, 2);
                loadCordova(platformQuery);
            }
            else {
                console.error('platform not found in cookie or query');
            }
        }
        CordovaLoader.init = init;
        function isValidPlatform(platform) {
            return (platform === 'android' || platform === 'ios' || platform === 'windows');
        }
        function loadCordova(platform) {
            var scriptEl = document.createElement('script');
            scriptEl.src = '../../cordovaDist/' + platform + '/cordova.js';
            document.body.appendChild(scriptEl);
            setTimeout(function () { console.log('..'); }, 200);
            //var scriptApp: HTMLScriptElement = document.createElement('script');
            //scriptApp.src = '../../cordovaApp/app.js';
            //document.body.appendChild(scriptApp);
            CordovaHostedApp.Application.initialize();
        }
        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }
    })(CordovaLoader = CordovaHostedWeb.CordovaLoader || (CordovaHostedWeb.CordovaLoader = {}));
    window.onload = function () {
        CordovaLoader.init();
    };
})(CordovaHostedWeb || (CordovaHostedWeb = {}));
;
//# sourceMappingURL=LoadCordova.js.map