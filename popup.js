var myTable = {};

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
	console.log(latitude, longitude);
	var curr_date = new Date();
	var curr_string_date = "" + curr_date.getFullYear() + (curr_date.getMonth() + 1) + curr_date.getDate();
	//console.log(curr_string_date);

	for(var i = 0; i < data.length; i++) {
		var distance_km = line(latitude, longitude, data[i].latitude, data[i].longitude);
		var crime_date = new Date(data[i].occurred_date_or_date_range_start);
		var crime_string_date = "" + crime_date.getFullYear() + (crime_date.getMonth() + 1) + crime_date.getDate();
		//console.log(crime_string_date);
		var notif_div = document.getElementById("notif");
		if (distance_km < 2) {
			$.post( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+data[i].latitude+"," + data[i].longitude+ "&sensor=true", callbackASDF(i, data, crime_date, distance_km, latitude, longitude));

		}
		//console.log(data[i].longitude + " " + data[i].latitude);
	}
    console.log(myTable);
}


function callbackASDF(numberThing, data, crime_date, distance_km, latitude, longitude) {
    console.log(data[numberThing].general_offense_number);
    return function(data_add) {
        if (!myTable[data[numberThing].general_offense_number]) {
            myTable[data[numberThing].general_offense_number] = "contain";

            var notif_div = document.getElementById("notif");
            $(".result").html(data);
            var address = data_add.results[0]["formatted_address"].split(",");
            // findMissingChild(address);
            var single_div = document.createElement("div");
            single_div.className = "small-nof";

            var addr_paragraph = document.createElement("p");
            var dist_paragraph = document.createElement("p");
            var time_paragraph = document.createElement("p");
            var crime_type_paragraph = document.createElement("p");
            var location_button = document.createElement("div");
            var a_tag = document.createElement("a");
            var crime_des = document.createElement("p");

            addr_paragraph.innerHTML = "Location: " + address;
            dist_paragraph.innerHTML = "Distance: " + distance_km.toFixed(2) + " kilometer(s) away";
            time_paragraph.innerHTML = "Time Occurred: " + crime_date.toDateString() + " " + crime_date.getHours() + ":" + crime_date.getMinutes() + " AM/PM";
            crime_des.innerHTML = "Crime Description: " + data[numberThing].summarized_offense_description;
            crime_type_paragraph.innerHTML = "Crime Type: " + data[numberThing].offense_type;
            
            var address_map = data_add.results[0]["formatted_address"].replace(/[ ,]+/g, "+");

            location_button.className = "map_button";
            a_tag.href = "https://google.com/maps?saddr="+ latitude +"," +longitude +"&daddr="+ address_map;
            a_tag.innerHTML = "map";
            a_tag.target="_blank";
            location_button.appendChild(a_tag);


            single_div.appendChild(addr_paragraph);
            single_div.appendChild(dist_paragraph);
            single_div.appendChild(time_paragraph);
            single_div.appendChild(crime_des);
            single_div.appendChild(crime_type_paragraph);
            single_div.appendChild(location_button);
            notif_div.appendChild(single_div);
        }
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





