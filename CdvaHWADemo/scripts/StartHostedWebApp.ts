module CordovaHostedApp {
    "use strict";
    export module StartHostedWebApp {
        const hwa_server: string = "https://cdvahwa.azurewebsites.net/";
        const hwa_launcher: string = "index.html?platform=";
        var oReq = new XMLHttpRequest();
        export function checkConnectionAndRedirect (){
            

            //oReq.addEventListener("progress", updateProgress);
            oReq.addEventListener("load", transferComplete);
            oReq.addEventListener("error", transferFailed);
            oReq.addEventListener("abort", transferCanceled);

            oReq.open("GET", hwa_server);
            oReq.send();
        }
        function transferComplete(data) {
            var targetUrl: string = hwa_server + hwa_launcher + cordova.platformId; 
            var bkpLink: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById("bkpLink");
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
        
    }
}

window.onload = () => {
    CordovaHostedApp.StartHostedWebApp.checkConnectionAndRedirect();
}