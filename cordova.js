//Meteor.startup(function(){
//    navigator.geolocation.getCurrentPosition(success);
//});
//
//success = function(position){
//    Session.set('latitude',position.coords.latitude);
//    Session.set('longitude',position.coords.longitude);
//
//}
//
//if(Meteor.isClient){
//    Meteor.startup(function() {
//        GoogleMaps.load({ v: '3', key: Meteor.settings.public.googleMapAPIKey, libraries: 'geometry,places' });
//    });
//}