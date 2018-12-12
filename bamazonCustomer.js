var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LorissaLynn123118!",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    loadUP();
    
});
var newLine = ("--------------------------------------------------------------------------------------------------------------------");

var loadUP = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("^^^^^^^^^^^^^^^^^ WELCOME TO BAMAZON!!! ^^^^^^^^^^^^^^^^^");
        for (var i = 0; i < res.length; i++) {
            console.log("ITEM ID: " + res[i].item_id + "|| PRODUCT: " + res[i].product_name + "|| DEPARTMENT: " + res[i].department_name + "|| PRICE:$  " + res[i].price + "|| LEFT IN STOCK: " + res[i].stock_quantity);
            console.log(newLine);
           
        }
    }) 
    shopperEXP();
    
};

var shopperEXP = function(){
    inquirer
    .prompt([{
       
       name:"item_id",
       type:"input",
       message: "WHAT IS THE ID NUMBER OF THE PRODUCT THAT YOU WOULD LIKE TO PURCHASE TODAY?",
       validate: function(value){
           if(isNaN(value)=== false){
               return true;
           } else{
               return false;
           }
       }
        
    }, {
        name: "Quantity",
        type: "input",
        message: "HOW MUCH WOULD YOU LIKE TO PURCHASE?",
        validate: function(value){
            if (isNaN(value)=== false){
                return true;
            } else {
                return false;
            }
        }
    }]). then(function(response){
        var query = "SELECT * FROM products WHERE item_id= " + response.item_id;
        // console.log(query);
        connection.query(query, function (err, res){
            // if (err) throw err;
            if (response.Quantity <= res){
                for (var i = 0; i < res.length; i++){
                    console.log("\n We CURRENTLY HAVE  " + res[i].stock_quantity + " " + res[i].product_name + "!\n ");
                    // 
                    console.log("\n WE APPRECIATE YOUR CONTINUED BUSINESS WITH BAMAZON! YOUR ORDER OF  " + res[i].stock_quantity + " " + res[i].product_name + " IS BEING REVIEWED AND WILL BE SHIPPED TO YOUR DOOR STEP VERY SOON! HAVE A GREAT DAY! \n");
                    // want to find a way to add the total amount of the products to display to the customer
                    console.log("\n YOUR CARD WAS CHARGED A TOTAL AMOUNT OF: $  " + res[i].price + "\n");
                    // Check the TABLE IN THE DB TO SEE IF ENOUGH PRODUCTS ARE IN THERE
                }
            } else {
                console.log("SORRY WE DO NOT HAVE THAT PRODUCT IN STOCK! PLEASE TRY AGAIN LATER!");
            }
            loadUP();
        })
    })
};

