Meteor.startup(function () {
  process.env.MAIL_URL="smtp://noreply.lokatech@gmail.com:defa4ltlokatech@smtp.gmail.com:587/";
  //stockType == 0 Gioi thieu, stockType == 1 tin tuc, stockType == 2 huong dan
  StockTypes.upsert({_id: '0'}, {$set: {isNavigation: true, name: "Giới thiệu", active: true}});
  StockTypes.upsert({_id: '1'}, {$set: {isNavigation: true, name: "Tin tức", active: true}});
  StockTypes.upsert({_id: '2'}, {$set: {isNavigation: true, name: "Hướng dẫn", active: true}});
  StockTypes.upsert({_id: '99'}, {$set: {isProduct: true, name: "Rubik", active: true}});
  StockTypes.upsert({_id: '100'}, {$set: {isProduct: true, name: "Spinner", active: true}});
  StockTypes.upsert({_id: '101'}, {$set: {isProduct: true, name: "Phụ kiện", active: true}});
  Sliders.upsert({_id: '0'}, {$set:{
    name: "Slider trang home",
    sliders: [ 
      {
        image: '', link: ''
      }
    ]
  }})
})
