var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const customers = await dbo.collection("customers").find({}).toArray()
  const orders = await dbo.collection("orders").find({}).toArray()
  orders.forEach(async (order) => {
    const user = customers.find(customer => order.customerNumber == customer.customerNumber)
    console.log(user)
    
    // update mongo
    dbo.collection("orders").updateOne(order, {
      $set: {
        customer_id : user._id
      }
    },
    function(err, res) {
      if (err) throw err;
      console.log("1 document updated")
    });
  });
  db.close()
});