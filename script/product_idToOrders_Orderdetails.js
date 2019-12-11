var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function (err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const products = await dbo.collection("products").find({}).toArray()
  const orders = await dbo.collection("orders").find({}).toArray()
  for (order of orders) {
    console.log(order._id.toString())
    for ( orderdetail of order.orderdetails ) {

      // relation mongodb
      const product = await products.find(product => orderdetail.productCode == product.productCode)
      console.log(product)

      // update mongo
      await dbo.collection("orders").updateOne({
        "_id": order._id,
        "orderdetails.productCode": product.productCode
      },{
        $set: {
          "orderdetails.$.product_id": product._id
        }
      },function(err, res) {
        if (err) throw err;
        console.log("1 document updated")
      })
    }
  }
  db.close()
})