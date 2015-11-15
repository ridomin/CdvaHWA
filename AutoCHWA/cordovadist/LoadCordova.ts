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
    }
   
    class CookieManager {
        public static createCookie(name: string, value: string, days: number) {
            if (days) {
                var date: Date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        public static readCookie(name): string {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        public static eraseCookie(name) {
            this.createCookie(name, "", -1);
        }
    }
   
    window.onload = function () {
        CordovaLoader.init();
     
    }
};