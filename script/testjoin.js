var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://classicmodels_admin:classicmodels01@ds251948.mlab.com:51948/heroku_z5v3cmd9";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("heroku_z5v3cmd9");
  dbo.collection('customers').aggregate([
    { $lookup:
       {
         from: 'employees',
         localField: 'salesRepEmployee_id',
         foreignField: '_id',
         as: 'as'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});