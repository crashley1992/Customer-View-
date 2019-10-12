# Customer-View-
Using MySQL Database and Node to track customer info

This is an Amazon-like storefront using MySQL and Node.js to display product info through the console. The app will take in orders from customers and delpete stock from the store's inventory. 

Node packages used:
- inquirer
- mysql
- dotenv

How it works:
1. Run the command node bamazonCustomer.js in the command line.

2. When the command is run, the products table made in mySQL will display items from 10 rows of values
input in the mySQL database prior. Read through the output to determine what product you want to input.

3. Inquirer will raise the following prompts:
 - Enter the id of the product you want to buy
 - Enter the quanitity you want to purchase
 
 The id to enter for a specific product is displayed in the item_id in the console output. The amount of the product is displayed under stock_quantity output. 
 
 If a user enters a quantity higher than what is in stock_quantity, the console will say "Not enough in stock".
 
 4. Once a valid amount is entered into the console prompt, a total amount will be output and the amount left in stock will be displayed.
 
 5. A new prompt will ask if you would like to make another purchase. If you select yes, then you will be able to choose a new product to purchase. If you select no, the connection will end and there will no longer be an option to purchase a product. 
 
