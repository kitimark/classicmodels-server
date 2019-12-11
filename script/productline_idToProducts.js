var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://@localhost:27017/classicmodels";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  var dbo = db.db("classicmodels");
  const products = await dbo.collection("products").find({}).toArray()
  const productlines = await dbo.collection("productlines").find({}).toArray()
  products.forEach(async (product) => {
    const user = productlines.find(productline => product.productLine == productline.productLine)
    console.log(user)
    
    // update mongo
    dbo.collection("products").updateOne(product, {
      $set: {
        productline_id : user._id
      }
    },
    function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
  });
  db.close()
});