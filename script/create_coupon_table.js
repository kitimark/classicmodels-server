var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  dbo.createCollection("coupons", function (err, res) {
    if (err) throw err;
    console.log("create success!!!");
    db.close();
  });

  var coupons =[
    { couponCode: 'HNY20', sale: '30%', expiredDate: new Date('2020-01-01T00:00:00.000Z'), couponTotallity: 365, couponRemainder: 365 },
    { couponCode: 'XMAS25', sale: '50%', expiredDate: new Date('2020-12-30T00:00:00.000Z'), couponTotallity: 750, couponRemainder: 750 },
    { couponCode: 'BLKFR', sale: '75%', expiredDate: new Date('2020-05-12T00:00:00.000Z'), couponTotallity: 200, couponRemainder: 200 },
    { couponCode: 'CNX62', sale: '20%', expiredDate: new Date('2020-12-01T00:00:00.000Z'), couponTotallity: 500, couponRemainder: 500 },
    { couponCode: 'SMM99', sale: '30%', expiredDate: new Date('2020-04-13T00:00:00.000Z'), couponTotallity: 180, couponRemainder: 180 },
    { couponCode: 'HLW31', sale: '25%', expiredDate: new Date('2020-11-01T00:00:00.000Z'), couponTotallity: 2200, couponRemainder: 2200 },
    { couponCode: 'TRL12', sale: '15%', expiredDate: new Date('2020-08-15T00:00:00.000Z'), couponTotallity: 400, couponRemainder: 400 },
    { couponCode: 'PRT02', sale: '35%', expiredDate: new Date('2020-09-25T00:00:00.000Z'), couponTotallity: 250, couponRemainder: 250 },
    { couponCode: 'AQU85', sale: '40%', expiredDate: new Date('2020-06-22T00:00:00.000Z'), couponTotallity: 360, couponRemainder: 360 },
    { couponCode: 'ELE66', sale: '60%', expiredDate: new Date('2020-07-07T00:00:00.000Z'), couponTotallity: 1200, couponRemainder: 1200 }
  ];
    
  dbo.collection("coupons").insertMany(coupons, function (err, res) {
    if (err) throw err;
    console.log("insert success!!!")
    db.close();
  });
});