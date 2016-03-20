History = new Mongo.Collection('history');

History.start = function(start){
   var id = History.insert({
        start : {
            startAt : start.date,
            lat: start.lat,
            lng : start.lng
        },
        createdAt:new Date(),
        userId: Meteor.userId(),
        username: Meteor.user().username
    });
    //console.log(id);
    Session.set('_id',id);
}

History.stop = function(stop){
    var place = History.findOne(Session.get('_id'));
    console.log(place);
    if(place.userId !== Meteor.userId()){
        throw new Meteor.Error('not-autorized')
    }

    History.update(place._id,{$set:{
        stop : {
            stopAt : stop.date,
            lat: stop.lat,
            lng : stop.lng
        }
    }})
}

History.getDirection = function(){
    return History.findOne(Session.get('_id'));
}

History.allDirections = function(){
    return History.find(Meteor.userId).fetch();
}

History.addRecod = function(place){
    History.insert({
        start : {
            startAt : place.start.date,
            lat: place.start.lat,
            lng : place.start.lng
        },
        stop : {
            stopAt : place.stop.date,
            lat: place.stop.lat,
            lng : place.stop.lng
        },
        createdAt:new Date(),
        userId: Meteor.userId(),
        username: Meteor.user().username
    })
}




