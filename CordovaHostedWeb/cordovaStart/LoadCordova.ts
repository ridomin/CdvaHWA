/// <reference path="CookieManager.ts" />
module CordovaHostedWeb {
    export module CordovaLoader {
        export function init() {
            var platformQuery: string = getQueryVariable('platform');   
            var platformCookie: string = CookieManager.readCookie('platform');
            if (isValidPlatform(platformCookie)) {
                console.log('found cookie ' + platformCookie);
                loadCordova(platformCookie);
            } else if (isValidPlatform(platformQuery)) {
                console.log('found query ' + platformQuery);
                CookieManager.createCookie("platform", platformQuery, 2);
                loadCordova(platformQuery);
            } else {
                console.error('platform not found in cookie or query');
            }
        }

        function isValidPlatform(platform: string) {
            return (platform === 'android' || platform === 'ios' || platform === 'windows')            
        }

        function loadCordova(platform) {
            var scriptEl: HTMLScriptElement =document.createElement('script');
            scriptEl.src = '../../cordovaDist/' + platform + '/cordova.js';
            document.body.appendChild(scriptEl);
            var scriptApp: HTMLScriptElement = document.createElement('script');
            scriptApp.src + '../../cordovaApp/app.js';
            document.body.appendChild(scriptApp);
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
    }
      
    window.onload = function () {
        CordovaLoader.init();
        
    }
};