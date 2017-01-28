

window.onload = function() {
	setVisible();
	console.log("This is location" + location);
}


function setVisible() {
	chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
	    console.log(response.geoLocation);
	    console.log("123");
	} );
}

