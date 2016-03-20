
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

    //Template.homeIndex.onCreated(function() {
    //    // We can use the `ready` callback to interact with the map API once the map is ready.
    //    GoogleMaps.ready('exampleMap', function(map) {
    //        // Add a marker to the map once it's ready
    //        // sample marker
    //        //var marker = new google.maps.Marker({
    //        //    position: {lat: 6.923700, lng: 79.991798 },
    //        //    map: map.instance
    //        //});
    //    });
    //});



    Meteor.startup(function(){
        navigator.geolocation.getCurrentPosition(success);
    });

    success = function(position){

        Meteor.setInterval(function() {
            Session.set('latitude',position.coords.latitude);
            Session.set('longitude',position.coords.longitude);
            console.log("session set ");
        }, 1000);
        //Meteor.call('addPlace',position.coords.latitude,position.coords.longitude);
    }


    Template.homeIndex.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.

        console.log('before');
        if (GoogleMaps.loaded()) {
            GoogleMaps.ready('exampleMap', function (map) {
                // Add a marker to the map once it's ready

                //var directionsDisplay = new google.maps.DirectionsRenderer();
                //var directionsService = new google.maps.DirectionsService();

                //var chicago = new google.maps.LatLng(41.850033, -87.6500523);
                //var mapOptions = {
                //    zoom:7,
                //    center: chicago
                //}
                //
                //_map = new google.maps.Map(map, mapOptions);
                //directionsDisplay.setMap(_map);

                console.log('after');

                //var marker = new google.maps.Marker({
                //    position: map.options.center,
                //    map: map.instance,
                //    label : 'hello world',
                //    icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                //});

                    //var start = { lat : 6.878028,  lng : 79.971199 };
                    //var end = { lat : 6.853486,  lng : 80.002098 };
                    //var request = {
                    //    origin:start,
                    //    destination:end,
                    //    travelMode: google.maps.TravelMode.DRIVING
                    //};
                    //
                    //directionsService.route(request, function(result, status) {
                    //    if (status == google.maps.DirectionsStatus.OK) {
                    //        directionsDisplay.setDirections(result);
                    //    }
                    //});

            });
        }
    });

    //
    //Template.homeIndex.helpers({
    //    places : function(){
    //        return Places.find({},{sort:{createdAt:-1}});
    //    }
    //});
    //
    Template.homeIndex.events({
        'click #track' : function(event){
           console.log('track');
            var start = {};
            start.date = new Date();
            start.lat = Session.get('latitude');
            start.lng = Session.get('longitude');
            History.start(start);
            console.log('start session');
            console.log(start);
            Session.set('start',start);

            // update the directions on map

            if (GoogleMaps.loaded()) {
                GoogleMaps.ready('exampleMap', function (map) {
                    // Add a marker to the map once it's ready
                    console.log('inside ready');

                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay   = new google.maps.DirectionsRenderer();

                    var start = new google.maps.LatLng(6.9270786, 79.861243);
                    var mapOptions = {
                        zoom:7,
                        center: start
                    }

                    directionsDisplay.setMap(map.instance);

                    //Session.set('val',0.0001);
                    var intervalId = Meteor.setInterval(function() {
                        //Session.set('val',0.0001+Session.get('val'));
                        var direction = History.getDirection();
                        var request = {
                            origin:{lat: direction.start.lat, lng: direction.start.lng},
                            destination:{lat: Session.get('latitude'), lng: Session.get('longitude')},
                            travelMode: google.maps.TravelMode.DRIVING
                        };
                        directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                            }
                        });
                        console.log("routing set ");
                    }, 1000);

                    Session.set('intervalId',intervalId);

                });
            }



        },

        'click #stop' : function(event){
            console.log('stop');
            var stop = {};
            stop.date = new Date();
            stop.lat = Session.get('latitude');
            stop.lng = Session.get('longitude');
            History.stop(stop);
            Meteor.clearInterval(Session.get('intervalId'));

        },

        'click #test' : function(event){
            console.log('test');
            //console.log(History.find().fetch());
            //console.log(Session.get('start'));

        },
        //
        'click #all' : function(event){
            //console.log(event.target.text.value);
            //var myLatLng = {lat: -25.363, lng: 131.044};
            console.log('before ready');

            /////////////////////////////////////////////////
            ///////////////////////////////////////////////
            ///////////////////////////////////////////////

            //if (GoogleMaps.loaded()) {
            //    GoogleMaps.ready('exampleMap', function (map) {
            //        // Add a marker to the map once it's ready
            //        console.log('inside ready');
            //
            //        _.each(Places.find().fetch(), function (place) {
            //            var myLatLng = {lat: place.lat, lng: place.long};
            //
            //            var marker = new google.maps.Marker({
            //                position: myLatLng,
            //                map: map.instance
            //            });
            //        });
            //
            //    });
            //}

            /////////////////////////////////////////////////
            ///////////////////////////////////////////////
            ///////////////////////////////////////////////


            console.log('after ready');

            console.log(History.allDirections());

        },
        'click #t' : function(event){
            console.log('t');
            Meteor.clearInterval(Session.get('intervalId'));
            console.log(Session.get('intervalId'));

        }

        //'click .delete-todo' : function(){
        //    if(confirm('Are you sure ?'))
        //        Meteor.call('deleteTodo',this._id);
        //}
    });


}