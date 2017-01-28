
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {

        if (request.command == "gimmeGimme") {
            $.post("https://data.seattle.gov/resource/b7bc-eh2a.json", function (data) {
                console.log(data);
            });

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