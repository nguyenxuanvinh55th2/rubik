Meteor.startup(function () {
  process.env.MAIL_URL="smtp://noreply.lokatech@gmail.com:defa4ltlokatech@smtp.gmail.com:587/";
  //stockType == 0 Gioi thieu, stockType == 1 tin tuc, stockType == 2 huong dan
  StockTypes.upsert({_id: '0'}, {$set: {isNavigation: true, name: "Giới thiệu"}});
  StockTypes.upsert({_id: '1'}, {$set: {isNavigation: true, name: "Tin tức"}});
  StockTypes.upsert({_id: '2'}, {$set: {isNavigation: true, name: "Hướng dẫn"}});
  Sliders.upsert({_id: '0'}, {$set:{
    name: "Slider trang home",
    sliders: [
      {
        image: '', link: ''
      }
    ]
  }})
})
