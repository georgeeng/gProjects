// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

'use strict'

// Request API access: http://www.yelp.com/developers/getting_started/api_access
// var Yelp = require('yelp');

// var yelp = new Yelp({
//   consumer_key: 'consumer-key',
//   consumer_secret: 'consumer-secret',
//   token: 'token',
//   token_secret: 'token-secret',
// });

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'food', location: 'Montreal' })
// .then(function (data) {
//   console.log(data);
// })
// .catch(function (err) {
//   console.error(err);
// });

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);

// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);

// // A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });




function initialize(){
	initMap();
	initAutocomplete();
}

var midlat;
var midlng;
var lat1;
var lng1;
var lat2;
var lng2;
var latMid;
var lngMid;
var midpoint = {
  lat: midlat,
  lng: midlng
};


  var firstDirection = document.getElementById("halfway");

  firstDirection.addEventListener('click', function(){
  	var directionOne = document.getElementById("autocomplete").value
  	console.log("Friend's address: " + directionOne);

  		//Grabbed direction of first person
  });


// console.log(firstDirection);


var map;
var coordinates = {}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.774, lng: -122.419},
    zoom: 13
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log("Your Location: " + "latitude " + pos.lat + " longitude: " + pos.lng);

      lat1 = pos.lat
      lng1 = pos.lng

      // console.log(lat1)

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());

      // let lat1 = pos.lat
      // let lat2 = pos.lng

    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}



console.log(lat1)


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 37.774, lng: -122.419},
//       zoom: 8
//     });
//   }

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

window.onload = function() {
  // var className = document.getElementsByClassName("btn-large waves-effect waves-light")[0];
  var className = document.getElementsByClassName("btn-large")[0];
  // className.addEventListener('click', function(){
  //   // console.log("i'm working")
  // })
  className.addEventListener('click', doAjax);
  // console.log(className);
}


// event.preventDefault();
// console.log(className);

function doAjax(event) {
  // let title = document.getElementById('search').value;

  let address = document.getElementById('autocomplete').value;

  // console.log(address)

  var string = encodeURI(address)

  console.log(string)
//   var arr = address.split('');

//   for(var i = 0; i < str.length; i++){
//    if(arr[i] === ' '){
//      arr[i] = "+"
//    }
//   }
// var string = arr[i].join('');
  // console.log(title);

  event.preventDefault();
  console.log(listings)


 /*
 
Consumer Key  iBU8jgY9J9BMPCyi-v9Brg
Consumer Secret b9IEGWAtWokvvilZ3UHIEFZO8Ns
Token 1bGVX415fasx7hR1Ns2opsuqqv_BdoqF
Token Secret  -EDC4ftHy9cE5YiAoRD5zUIr1rI
 */
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://api.yelp.com/v3/businesses/search',
  //   data: {
  //     latitude: '1234',
  //     longitude: '3456',
  //     key: 
  //   }
  // })

  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=AIzaSyAF8IVxkffX0Yt2A-7Ez_MwG25aGR49GiM`,
    // url: `https://maps.googleapis.com/maps/api/geocode/json?address=1600%20Amphitheatre%20Parkway,%20Mountain%20View,%20CA,%20United%20States&key=AIzaSyAF8IVxkffX0Yt2A-7Ez_MwG25aGR49GiM`,
    // url: `https://www.omdbapi.com/?t=${title}&y=&plot=full&r=json`,
    method: "GET",
  })
  .done(function(data) {

    console.log(data.results["0"].geometry.location)
    var infoArea = document.getElementById('listings')
    console.log(listings)
    infoArea.innerHTML = '';

    let par = document.createElement('p')
    let p = document.createElement('p');
    let img = document.createElement('img');


    lat2 = data.results["0"].geometry.location.lat
    lng2 = data.results["0"].geometry.location.lng

    var rLat1 = lat1 * Math.PI / 180
    var rLng1 = lng1 * Math.PI / 180
    var rLat2 = lat2 * Math.PI / 180
    var rLng2 = lng2 * Math.PI / 180


      function getMid(lat1, lat2, lng1, lng2){
        var Bx = Math.cos(lat2) * Math.cos(lng2-lng1);
        var By = Math.cos(lat2) * Math.sin(lng2-lng1);
        latMid = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt( (Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ) );
        lngMid = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);
      }
    // console.log(rLat1, rLat2, rLng1, rLng2)
    getMid(rLat1, rLat2, rLng1, rLng2);

    console.log("LAT MID: " + latMid/Math.PI*180 + " LONG MID: " + lngMid/Math.PI*180)

    midlat = latMid/Math.PI*180
    midlng = lngMid/Math.PI*180

    // console.log("THIS IS MO1: " + mo1);
    // console.log("THIS IS MO2: " + mo2);

    // another ajax call to 

  var location = new google.maps.LatLng(midlat,midlng);


  var request = {
     location: location,
     radius: '3000',
     type: 'restaurant'
   };

  var service = new google.maps.places.PlacesService(map);
   service.nearbySearch(request, function(places){
    var newArr = [];
    console.log(places)
    for(var i = 0; i < places.length; i++){
      newArr.push(places[i].name) 
    }
    console.log(newArr)
   });

  var flightPlanCoordinates = [
    {lat: lat1, lng: lng1},
    {lat: lat2, lng: lng2}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
  console.log(map, midpoint)

  // var infoWindow = new google.maps.InfoWindow({map: map});

  flightPath.setMap(map);
  
  
  // map.setCenter(midpoint);

  infoWindow.setPosition(midpoint);

  // console.log("midlatlong>>>>>>>" + midlat, midlng)

  // var myLatLng = {lat: midlat, lng: midlng};
  // console.log("mylatlng>>>>>>>>>" + myLatLng )

  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 8,
  //   center: myLatLng
  // });

  // var marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   title: 'Hello World!'
  // });
    // $.ajax({
    //   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midlat},${midlng}&radius=3000&type=restaurant&key=AIzaSyAF8IVxkffX0Yt2A-7Ez_MwG25aGR49GiM`,
    //   // url: `https://maps.googleapis.com/maps/api/place/nearbysearch/output?key=AIzaSyAF8IVxkffX0Yt2A-7Ez_MwG25aGR49GiM&location=${midlat},${midlng};l&radius=3000`,
    //   method: "GET",
    //   jsonpCallback: 'jsonCallback',
    //   contentType: "application/json",
    //   dataType: "jsonp"
    // })
    // .done(function(data){

    //   console.log(data);

    //   // let par = document.createElement('p')
    //   // let p = document.createElement('p');
    //   // let img = document.createElement('img');

    // })


      // infoArea.appendChild(par);
      // infoArea.appendChild(p); 
      // infoArea.appendChild(img);
  })  
}



// function getMiddle(){

// var co1 = [lat1, lng1]
// var co2 = [lat2, lng2]

// var projection = d3.geo.equirectangular()

// var cot1 = projection(co1);
// var cot2 = projection(co2);

// var p0 = { x: cot1[0], y: cot1[1] };
// var p1 = { x: cot2[0], y: cot2[1] };

// function dfn(p0, p1) {
//     return Math.pow(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2), 0.5);
// }

// // from http://math.stackexchange.com/a/87374
// var d = dfn(p0, p1);
// var m = {
//     x: (p0.x + p1.x) / 2,
//     y: (p0.y + p1.y) / 2,
// }

// var u = (p1.x - p0.x) / d
// var v = (p1.y - p0.y) / d;

// // increase 1, if you want a larger curvature
// var r = d * 1;
// var h = Math.pow(Math.pow(r, 2) - Math.pow(d, 2) / 4, 0.5);

// // 2 possible centers
// var c1 = {
//     x: m.x - h * v,
//     y: m.y + h * u
// }
// var c2 = {
//     x: m.x + h * v,
//     y: m.y - h * u
// }

// function mfn(p0, p1, c) {
//     // the -c1 is for moving the center to 0 and back again
//     var mt1 = {
//         x: r * (p0.x + p1.x - c.x * 2) / Math.pow(Math.pow(p0.x + p1.x - c.x * 2, 2) + Math.pow(p0.y + p1.y - c.y * 2, 2), 0.5)
//     };
//     mt1.y = (p0.y + p1.y - c.y * 2) / (p0.x + p1.x - c.x * 2) * mt1.x;

//     var ma = {
//         x: mt1.x + c.x,
//         y: mt1.y + c.y,
//     }

//     var mb = {
//         x: -mt1.x + c.x,
//         y: -mt1.y + c.y,
//     }

//     return (dfn(ma, p0) < dfn(mb, p0)) ? ma : mb;
// }

// var m1 = mfn(p0, p1, c1);
// var m2 = mfn(p0, p1, c2);

// var mo1 = projection.invert([m1.x, m1.y]);
// var mo2 = projection.invert([m2.x, m2.y]);

// console.log("THIS IS MO1: " + mo1);
// console.log("THIS IS MO2: " + mo2);

// }



//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAF8IVxkffX0Yt2A-7Ez_MwG25aGR49GiM

