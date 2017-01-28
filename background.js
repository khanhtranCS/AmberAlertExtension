chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {

        if (request.command == "gimmeGimme") {

            navigator.geolocation.getCurrentPosition (function (position) {
                sendResponse ( {
                    geoLocation: (
                          + position.coords.latitude + ","
                         + position.coords.longitude
                    )
                } );
            } );
            return true; // Needed because the response is asynchronous
        }
    }
);