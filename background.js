
chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {

        if (request.command == "gimmeGimme") {

            navigator.geolocation.getCurrentPosition (function (position) {
                sendResponse ( {
                    geoLocation: ( position.coords.latitude + ","+ position.coords.latitude
                    )
                });
            }, function(positionError) {
                console.error(positionError);
            } );
            return true; // Needed because the response is asynchronous
        }
    }
);