
if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load({ v: '3', key: Meteor.settings.public.googleMapAPIKey, libraries: 'geometry,places' });

    });

    Template.homeIndex.helpers({
        exampleMapOptions: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                // Map initialization options
                return {
                    center: new google.maps.LatLng(Session.get('latitude'), Session.get('longitude')),
                    zoom: 8
                };
            }
        }
    });

    Template.homeIndex.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('exampleMap', function(map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    });

    Meteor.startup(function(){
        navigator.geolocation.getCurrentPosition(success);
    });

    success = function(position){
        Session.set('latitude',position.coords.latitude);
        Session.set('longitude',position.coords.longitude);

    }

    if(Meteor.isClient){
        Meteor.startup(function() {
            GoogleMaps.load({ v: '3', key: Meteor.settings.public.googleMapAPIKey, libraries: 'geometry,places' });
        });
    }
}