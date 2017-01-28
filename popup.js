

window.onload = function() {
	setVisible();
	// console.log("This is location" + location);
}



function setVisible() {
	chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
        $.post( "https://maps.googleapis.com/maps/api/geocode/json?latlng=47.6,-122.30511159999999&key=AIzaSyCngncdCEqVb_fy5xpIs1MTxSaYn9sszkc", function( data ) {
            // $( ".result" ).html( data );
            console.log(data.results[0]["formatted_address"])
        });
	    // console.log(response.geoLocation);
	    // console.log("123");
	} );
}

