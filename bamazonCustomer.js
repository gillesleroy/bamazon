var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "gillesleroy",
    password: "Lqsym69!",
    database: "bamazon"
  });

function getProducts(){
  var query = connection.query(
    "SELECT item_id, product_name, price, stock_quantity from products",
    [],
    function(err, res) {
      for (var i = 0;i<res.length;i++){
        // console.log(res[i].product_name);
        if (i === 0){
          console.log("\nItem: " + res[i].product_name + " || Price: " + res[i].price + " || quantity: " + res[i].stock_quantity + " ID: "+ res[i].item_id);
        }
        else{
          console.log("Item: " + res[i].product_name + " || Price: " + res[i].price + " || quantity: " + res[i].stock_quantity + " ID: "+ res[i].item_id);
        }
      }
    }
  );
  return;
}

connection.connect(function(err) {
    if (err) throw err;
    getProducts();
    start();
  }); 

  function start() {
    // getProducts();
    inquirer
      .prompt( [  {
                    type: "input",
                    message: "What is the ID of the item you would like to buy?",
                    name: "itemId"
                  }
                  ,
                  {
                    type: "input",
                    message: "How many units of the item do you want?",
                    name: "quantity"
                  }])
      .then(function(answer) {
         searchProduct(answer.itemId,answer.quantity);
      });
  }

function searchProduct(itemId,quantity){
  var itemIdNum = parseInt(itemId);
  var quantityNum = parseInt(quantity);
  var quantityInStock = 0;
  var price = 0;
  // console.log(itemId);
  var query = connection.query(
    "SELECT item_id, product_name, stock_quantity, price from products where item_id = ?",
    [itemIdNum],
    function(err, res) {
      console.log(query.sql);
      // console.log(res);
      console.log("Item: " + res[0].product_name + " || Price: " + res[0].price + " || quantity: " + res[0].stock_quantity + " ID: "+ res[0].item_id);
      if (res[0].stock_quantity < quantityNum){
        console.log("Insufficient quantity "+quantity+" of product "+res[0].product_name);
      }
      else{
        console.log("Getting "+quantity+" units of "+res[0].product_name);
        quantityInStock = res[0].stock_quantity;
        price = res[0].price;
        checkout(itemIdNum,quantityNum,quantityInStock,price);
      }
      connection.end();
    }
  );
  return quantity;
}

function checkout(itemId,quantity,quantityInStock,price){
  var quantityRemaining = quantityInStock - quantity;
  var totalCost = quantity * price;
  // console.log(quantityRemaining);
  var query = connection.query(
    "UPDATE products SET stock_quantity = ? where item_id = ?",
    [quantityRemaining,itemId],
    function(err, res) {
      console.log(query.sql);
      // console.log(res);
      console.log("Your total cost is: $"+totalCost);
      // connection.end();
    }
  );
  return quantityRemaining;
}
 