// Initialize Firebase
var config = {
	apiKey: "AIzaSyCgqUGW3dxiBfzf1KnLrCgk_FYtTtVOqmU",
	authDomain: "shipla-oclock-72aee.firebaseapp.com",
	databaseURL: "https://shipla-oclock-72aee.firebaseio.com",
	storageBucket: "",
};
var database;

window.onload = function() {
	firebase.initializeApp(config);

	database = firebase.database();

	// Fields
	logs = [];
	tableHeaders = document.getElementById("headers");
	tableData = document.getElementById("data");
	myTimeZone = new Date().getTimezoneOffset();

	initialize();

	firebase.database().ref('logs').on('child_added', function(snapshot) {
		childAdded(snapshot.val());
	});
	firebase.database().ref('logs').on('child_removed', function(snapshot) {
		childRemoved(snapshot.val());
	});
}

var logs;
var myTimeZone;

function initialize() {
	for (var i = 0; i < 24; i++) {
		// Header
		var header = document.createElement("th");
		header.innerHTML = i;
		tableHeaders.appendChild(header);

		// Data
		var data = document.createElement("td");
		data.id = "p" + i;
		data.innerHTML = 0;
		tableData.appendChild(data);
	}
}

function childAdded(snapshotVal) {
	var p = loadData(snapshotVal);
	p.innerHTML = (parseInt(p.innerHTML) + 1);
}

function childRemoved(snapshotVal) {
	var p = loadData(snapshotVal);
	p.innerHTML = (parseInt(p.innerHTML) + 1);
}

function loadData(snapshotVal) {
	var d = new Date(snapshotVal.dateTime);

	// Extract the hour
	var hr = parseInt(d.getHours());
	return document.getElementById('p' + hr);
}
