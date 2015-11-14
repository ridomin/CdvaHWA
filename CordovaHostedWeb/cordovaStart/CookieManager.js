var CordovaHostedWeb;
(function (CordovaHostedWeb) {
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
    CordovaHostedWeb.CookieManager = CookieManager;
})(CordovaHostedWeb || (CordovaHostedWeb = {}));
;
//# sourceMappingURL=CookieManager.js.map