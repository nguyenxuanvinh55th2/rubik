Meteor.publish('stockModels', function () {
    if (this.userId) {
        return StockModels.find({});
    } else {
        this.ready();
    }
});
Meteor.publish('stockTypes', function () {
    if (this.userId) {
        return StockModels.find({});
    } else {
        this.ready();
    }
});
Meteor.publish('posts', function () {
    if (this.userId) {
        return StockModels.find({});
    } else {
        this.ready();
    }
});
Meteor.publish('sliders', function () {
    if (this.userId) {
        return Sliders.find({});
    } else {
        this.ready();
    }
});
Meteor.publish('colors', function () {
    if (this.userId) {
        return Colors.find({});
    } else {
        this.ready();
    }
});
