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
            console.log("ITEM ID: " + res[i].item_id + "|| PRODUCT: " + res[i].product_name + "|| DEPARTMENT: " + res[i].department_name + "|| PRICE: $  " + res[i].price + "|| LEFT IN STOCK: " + res[i].stock_quantity);
            console.log(newLine);
        }
    })
};

