var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const customers = await dbo.collection("customers").find({}).toArray()
  const employees = await dbo.collection("employees").find({}).toArray()
  customers.forEach(async (customer) => {
    const user = employees.find(employee => customer.salesRepEmployeeNumber == employee.employeeNumber )
    console.log(user)
    
    // update mongo
    dbo.collection("customers").updateOne(customer, {
      $set: {
        salesRepEmployee_id : user._id
      }
    },
    function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
  });
  db.close()
});