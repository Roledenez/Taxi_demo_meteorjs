Places = new Mongo.Collection('places');


Meteor.methods({
    addPlaces : function(lat,long){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-autorized');
        }
        Todos.insert({
            lat: lat,
            long : long,
            createdAt:new Date(),
            userId: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    deletePlace : function(pleaecId){
        var place = Todos.findOne(pleaecId);
        if(place.userId !== Meteor.userId()){
            throw new Meteor.Error('not-autorized')
        }

        Places.remove(pleaecId);
    },
    updatePlace : function(placeId,lat,long){
        var place = Places.findOne(placeId);
        if(place.userId !== Meteor.userId()){
            throw new Meteor.Error('not-autorized')
        }
        Places.update(placeId,{$set:{lat: lat, long:long }});
    }
})