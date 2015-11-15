module CordovaHostedApp {
    "use strict";
    export module StartHostedWebApp {
        var oReq = new XMLHttpRequest();
        export function checkConnectionAndRedirect (){
            

            //oReq.addEventListener("progress", updateProgress);
            oReq.addEventListener("load", transferComplete);
            oReq.addEventListener("error", transferFailed);
            oReq.addEventListener("abort", transferCanceled);

            oReq.open("GET", "https://cordovahostedweb.azurewebsites.net/");
            oReq.send();
        }
        function transferComplete(data) {
            var targetUrl: string = "https://cordovahostedweb.azurewebsites.net/cordova/setPlatformCookie?platform=" + cordova.platformId; 
            var bkpLink: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("bkpLink");
            bkpLink.setAttribute("href", targetUrl);
            window.location.replace(targetUrl);

        }

        function transferFailed(err) {
            console.log(err.target.reason);
            console.log(oReq.status);
            
        }

        function transferCanceled(data) {
            console.log(data.target.reason);
        }
        
    }
}