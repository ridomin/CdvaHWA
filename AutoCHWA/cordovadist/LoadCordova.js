var CordovaHostedWeb;
(function (CordovaHostedWeb) {
    var CordovaLoader;
    (function (CordovaLoader) {
        function init() {
            var platformQuery = getQueryVariable('platform');
            var platformCookie = CookieManager.readCookie('platform');
            if (isValidPlatform(platformCookie)) {
                console.log('found cookie ' + platformCookie);
                loadCordova(platformCookie);
            }
            else if (isValidPlatform(platformQuery)) {
                console.log('found query ' + platformQuery);
                CookieManager.createCookie("platform", platformQuery, 2);
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
            scriptEl.src = 'cordovaDist/' + platform + '/cordova.js';
            document.body.appendChild(scriptEl);
            // setTimeout(function () { console.log('..') }, 200);
            //var scriptApp: HTMLScriptElement = document.createElement('script');
            //scriptApp.src = '../../cordovaApp/app.js';
            //document.body.appendChild(scriptApp);
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
    var CookieManager = (function () {
        function CookieManager() {
        }
        CookieManager.createCookie = function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();
            }
            else
                var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        };
        CookieManager.readCookie = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0)
                    return c.substring(nameEQ.length, c.length);
            }
            return null;
        };
        CookieManager.eraseCookie = function (name) {
            this.createCookie(name, "", -1);
        };
        return CookieManager;
    })();
    window.onload = function () {
        console.log("loading cordova");
        CordovaLoader.init();
    };
})(CordovaHostedWeb || (CordovaHostedWeb = {}));
;
//# sourceMappingURL=LoadCordova.js.map