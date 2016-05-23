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

  document.getElementById('btn').onclick = logShiplaOClock;
}

function logShiplaOClock() {
  var now = new Date();

  var postData = {
    dateTime: now.toJSON(),
    timeZone: now.getTimezoneOffset(),
    contributor: null
  };

  var id = database.ref('logs').push().key;

  database.ref('logs/' + id).set(postData);
}