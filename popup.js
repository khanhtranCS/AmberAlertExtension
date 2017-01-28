window.onload = function() {
	setVisible();
}

function setVisible() {
	chrome.runtime.sendMessage ( {command: "gimmeGimme"}, function (response) {
	    console.log (response.geoLocation);
	    console.log("123");
	} );
}