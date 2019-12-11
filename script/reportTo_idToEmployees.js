var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const reportsTo = await dbo.collection("employees").find({}).toArray()
  const employees = await dbo.collection("employees").find({}).toArray()
  employees.forEach(async (employee) => {
    const user = reportsTo.find(reportTo => employee.reportsTo == reportTo.employeeNumber)
    console.log(user)
    
    // update mongo
    dbo.collection("employees").updateOne(employee, {
      $set: {
        reportTo_id : user._id
      }
    },
    function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
  });
  db.close()
});