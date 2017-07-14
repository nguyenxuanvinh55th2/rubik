Meteor.publish('stockModels', function () {
    if (this.userId) {
        return StockModels.find({});
    } else {
        this.ready();
    }
});
