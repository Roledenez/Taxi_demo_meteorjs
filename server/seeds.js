
var placeSeeds = [
    {
        lat : 7.008216,
        long :80.066299
    },
    {
        lat : 6.923700,
        long :79.991798
    },
    {
        lat : 6.878028,
        long : 79.971199
    },
    {
        lat : 6.853486,
        long :80.002098
    }
];

if(Places.find().count() === 0){
    _.each(placeSeeds, function (place) {
        Places.insert(place);
        console.log('place inserted');
    })
}