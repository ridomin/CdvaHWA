var CordovaHostedApp;
(function (CordovaHostedApp) {
    "use strict";
    var StartHostedWebApp;
    (function (StartHostedWebApp) {
        var hwa_server = "https://cdvahwa.azurewebsites.net/";
        var hwa_launcher = "index.html?platform=";
        var oReq = new XMLHttpRequest();
        function checkConnectionAndRedirect() {
            //oReq.addEventListener("progress", updateProgress);
            oReq.addEventListener("load", transferComplete);
            oReq.addEventListener("error", transferFailed);
            oReq.addEventListener("abort", transferCanceled);
            oReq.open("GET", hwa_server);
            oReq.send();
        }
        StartHostedWebApp.checkConnectionAndRedirect = checkConnectionAndRedirect;
        function transferComplete(data) {
            var targetUrl = hwa_server + hwa_launcher + cordova.platformId;
            var bkpLink = document.getElementById("bkpLink");
            bkpLink.setAttribute("href", targetUrl);
            bkpLink.text = targetUrl;
            window.location.replace(targetUrl);
        }
        function transferFailed(err) {
            console.log(err.target.reason);
            console.log(oReq.status);
        }
        function transferCanceled(data) {
            console.log(data.target.reason);
        }
    })(StartHostedWebApp = CordovaHostedApp.StartHostedWebApp || (CordovaHostedApp.StartHostedWebApp = {}));
})(CordovaHostedApp || (CordovaHostedApp = {}));
window.onload = function () {
    CordovaHostedApp.StartHostedWebApp.checkConnectionAndRedirect();
};
//# sourceMappingURL=appBundle.js.map