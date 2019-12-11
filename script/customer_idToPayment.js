var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const customers = await dbo.collection("customers").find({}).toArray()
  const payments = await dbo.collection("payments").find({}).toArray()
  payments.forEach(async (payment) => {
    const user = customers.find(customer => payment.customerNumber == customer.customerNumber)
    console.log(user)
    
    // update mongo
    dbo.collection("payments").updateOne(payment, {
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