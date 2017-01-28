
window.onload = function() {
	setVisible();
	// console.log("This is location" + location);
}



function setVisible() {
	chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
		var location = response.geoLocation;
		var loc = location.split(",");
		findMissingChild(loc[0], loc[1]);
        // $.post( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+loc[0]+"," + loc[1]+ "&key=AIzaSyCngncdCEqVb_fy5xpIs1MTxSaYn9sszkc", function( data ) {
        //     // $( ".result" ).html( data );
        //     var address = data.results[0]["formatted_address"].split(",");
        //     findMissingChild(address);
        // });
	    // console.log(response.geoLocation);
	    // console.log("123");
	} );
}

function findMissingChild(latitude, longtitude) {
	
		$.get( "https://data.seattle.gov/resource/b7bc-eh2a.json", function( data ) {
            determineNearby(data, latitude, longtitude);
        });
   
}

function determineNearby(data, latitude, longitude) {
	console.log(data);

	for(var i = 0; i < data.length; i++) {
		var distance_km = line(latitude, longitude, data[i].latitude, data[i].longitude);
		var notif_div = document.getElementById("notif");
		if (distance_km < 2) {
			$.post( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+data[i].latitude+"," + data[i].longitude+ "&key=AIzaSyCngncdCEqVb_fy5xpIs1MTxSaYn9sszkc", function( data ) {
            	$( ".result" ).html( data );
            	var address = data.results[0]["formatted_address"].split(",");
            	// findMissingChild(address);
            	var single_div = document.createElement("div");
				single_div.innerHTML = address + "555555";
				notif_div.appendChild(single_div);
        	});

		}
		//console.log(data[i].longitude + " " + data[i].latitude);
	}
}

// return distance
function line(lat1, lon1, lat2, lon2) {
	    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
 var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));

}



