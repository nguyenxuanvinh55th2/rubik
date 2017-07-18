Sliders = new Mongo.Collection("sliders");
Sliders.allow({
    insert: function(userId, doc){
        return true;
    },
    remove:function(userId, document) {
        return true;
    },
    update:function(userId, doc, fieldNames, modifier) {
        return true;
    }
});
