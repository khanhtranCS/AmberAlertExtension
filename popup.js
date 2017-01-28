
window.onload = function() {
	setVisible();
	// console.log("This is location" + location);
}



function setVisible() {
	chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
		var location = response.geoLocation;
		var loc = location.split(",");
        $.post( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+loc[0]+"," + loc[1]+ "&key=AIzaSyCngncdCEqVb_fy5xpIs1MTxSaYn9sszkc", function( data ) {
            // $( ".result" ).html( data );
            var address = data.results[0]["formatted_address"].split(",");
            findMissingChild(address);
        });
	    // console.log(response.geoLocation);
	    // console.log("123");
	} );
}

function findMissingChild(address) {
	
}

