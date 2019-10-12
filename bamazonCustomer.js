//allows node to connect to sql
const mysql = require('mysql');

//secures database passwords
const dotenv = require('dotenv').config()

//npm package that asks users questions
const inquirer =  require('inquirer');

//establishes secure connection using dotenv to db
let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

//runs connection and starts inquirer
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    console.log("Welcome to bamazon");
    //function that displays table info
    displayProducts();
    //function asks user what product they want to purchase
    askUser();
});


//queries what's in product table
function displayProducts() {
    connection.query('SELECT * FROM bamazon.products', (err, res) => {
        if (err) throw err;
        console.log(res);
        //connection.end();
    });
}

//asks users what products they want based off ID displayed in console when app is ran
function askUser() {
    inquirer.prompt([
        {
            name: 'itemId',
            type: 'input',
            message: 'Enter the id of the product you want to buy\n'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Enter the quanitity you want to purchase\n'
        }
    ])
    .then((answer) => {
        let itemId = answer.itemId;
        let quanitity = answer.quantity;

        connection.query('SELECT * FROM bamazon.products WHERE item_id=' + itemId, (err, res) => {
            if (err) throw err;
                //storing quanitiy response in avilableStock
                let availableStock = res[0].stock_quantity;
                //test to make sure a value was being returned
                console.log(availableStock + ' total product available');
                //checks is avilable stock is less that what userInput is
                if(availableStock < quanitity) {
                    console.log("Not enough in stock");
                } else {
                    //displays total of item purchased
                    console.log('Your total is $' + (res[0].price * quanitity));
                    let newAmountOfProduct =  availableStock - quanitity;
                    //tests if new amount is returning correctly
                    console.log(newAmountOfProduct + ' product left');
                    //query to update table after items have been selected
                    connection.query('UPDATE bamazon.products SET stock_quantity =' + newAmountOfProduct + ' WHERE item_id=' + itemId, (err, res) => {
                        if (err) throw err;
                        //should display new available stoc
                        continueShopping();
                    });
                }
            })
    });
}

function continueShopping() {
    inquirer.prompt([
        {
          name: 'nextTransaction',
          type: 'list',
          message: 'Would you like to make another purchase?\n',
          choices: ['yes', 'no']
        }
      ]).then((answer) => {
        let userInput = answer.nextTransaction;

        if (userInput === 'yes') {
            displayProducts();
            askUser();
        } else {
            connection.end();
            console.log(`Good bye`);
        }
      });
    }