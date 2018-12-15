var mysql = require ("mysql");
var inquirer = require ("inquirer");
var args = process.argv;
var action = "";
var item = "";
var price = 0;
var category = "";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "gillesleroy",
    password: "Lqsym69!",
    database: "bamazon"
  });

var products = [];

function getProducts(){
  var allProds = [];
  var query = connection.query(
    "SELECT item_id, product_name from products",
    [],
    function(err, res) {
      // console.log(res.affectedRows + " product selected!\n");
      // console.log(res);
      // console.log(res[0].price);
      for (var i = 0;i<res.length;i++){
        products.push(res[i].product_name);
        console.log(res[i].product_name);
        // console.log(products[i].item_id);
        // for (var i = 0;i<products.length; i++) loop 
        //     {
        //       console.log(products[i].item_id);
        //     }
      }
      connection.end();
      console.log(products);
    }
  );
  return products;
}

function showProducts(){
  console.log(products);
  inquirer
    .prompt({
      name: "myanswer",
      message: "answer"
    })
    .then(function(answer) {
      console.log(answer);
    })
}

function promptForProduct() {
  console.log(products);
  inquirer
    .prompt({
      name: "prodChoice",
      type: "rawlist",
      message: "Please choose which article you want to buy",
      choices: products
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.prodChoice.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
  };

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // checkProduct(item,price);
    // connection.end();
    start();
  }); 

// query()
// .then(function ()
//     {
//     console.log(products);
//     }
//   )
// ;

// function which prompts the user for what action they should take
function start() {
  getProducts()
//.then(promptForProduct());
 .then(showProducts());
}

// start(query);

// inquirer
// .prompt({
//   name: "prodChoice",
//   type: "rawlist",
//   message: "Please choose which article you want to buy",
//   choices: products
// })
// .then(function(answer) {
//   // based on their answer, either call the bid or the post functions
//   if (answer.prodChoice.toUpperCase() === "POST") {
//     postAuction();
//   }
//   else {
//     bidAuction();
//   }
// });
// start();

//   inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "Would you like to [POST] an auction or [BID] on an auction?",
//       name: "action"
//     }
//     ]
//    )
//   .then(function(inquirerResponse) {
//     // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//     //   console.log("\n" + inquirerResponse.action);
//       action = inquirerResponse.action.toUpperCase();
//       if (action === "POST"){
//         inquirer
//         .prompt([
//           // Here we create a basic text prompt.
//           {
//             type: "input",
//             message: "What is the item you would like to submit?",
//             name: "item"
//           }
//           ,
//           {
//             type: "input",
//             message: "What category would you like to place you auction in?",
//             name: "category"
//           },  
//           {
//             type: "input",
//             message: "What would you like your starting bid to be?",
//             name: "price"
//           }
//           ]     
//          )
//         .then(function(inquirerResponse) {
//           // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//             // console.log("\n" + inquirerResponse.action);
//             console.log("\n" + "Your auction was created successfully");
//             action = inquirerResponse.action;
//             item = inquirerResponse.item;
//             category = inquirerResponse.category;
//             price = inquirerResponse.price;
 
//             // connection.connect(function(err) {
//             //     if (err) throw err;
//             //     console.log("connected as id " + connection.threadId + "\n");
//                 createProduct(item,category,price);
//                 // connection.end();
//             //   });            
//           }
//           );
//     }
//     else {
//         var choices = [];
//         var query = connection.query("SELECT item from products",function (err, res){
//           for(var i=0;i<res.length;i++){
//            choices.push(res[i].item);
//           }
//         }
//         )
//         inquirer
//         .prompt([
//           {
//             type: "rawlist",
//             message: "What auction would you like to place a bid in?",
//             choices: choices,
//             name: "item"
//           },
//           {
//             type: "input",
//             message: "How much would you like to bid?",
//             name: "price"
//           }
//          ]
//          )
//         .then(function(inquirerResponse) {
//           // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//             // console.log("\n" + inquirerResponse.action);
//             console.log("\n" + "Bid placed successfully");
//             item = inquirerResponse.item;
//             price = inquirerResponse.price;

//             // connection.connect(function(err) {
//             //     if (err) throw err;
//             //     console.log("connected as id " + connection.threadId + "\n");
//                 checkProduct(item,price);
//                 // connection.end();
//             //   });      

//           }
//           );
//     }
// }
// );

// function createProduct(item,category,price) {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//       "INSERT INTO products SET ?",
//       {
//         item: item,
//         category: category,
//         price: price
//       },
//       function(err, res) {
//         console.log(res.affectedRows + " product inserted!\n");
//         connection.end();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }

//   function checkProduct(item,price) {
//     console.log("Checking product...\n");

//     // var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//     //     for (var i = 0; i < res.length; i++) {
//     //       console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//     //     }
//     //   });


//     var query = connection.query(
//       "SELECT price from products WHERE item=?",
//       [item],
//       function(err, res) {
//         // console.log(res.affectedRows + " product selected!\n");
//         console.log(res);
//         console.log(res[0].price);
//         connection.end();
//       }
//     );
//     // logs the actual query being run
//     console.log(query.sql);
//   }

