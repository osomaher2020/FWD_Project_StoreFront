# FWD_Project_StoreFront
**version(1.0.0)**
  ## Setup and connect to the database
  1. Download & install PostgreSQL from [download](https://www.postgresql.org/download/)
  2. Create 2 new databases:
      - `CREATE DATABASE product_store;`
      - `CREATE DATABASE product_store-test;`
  3. Create new user & grant privileges on both databases:
      - `CREATE USER osama_maher WITH ENCRYPTED PASSWORD '123';`
      - `GRANT ALL PRIVILEGES ON DATABASE product_store TO osama_maher;`
      - `GRANT ALL PRIVILEGES ON DATABASE product_store_test TO osama_maher;`
  4. Install "db-migrate & db-migrate-pg" globally using command:
      - `npm i -g db-migrate`
      - `npm i -g db-migrate-pg`
---
  ## Package installation
  * open the project folder & run command:
      - `npm install`
---
  ## Running the project
  1. in the command-line run database migrations:
      - `db-migrate-up`
  2. run the Express server (runs on port 3000)
      - `npm run watch`
      * the server will run on http://localhost:3000
  ---
  ### API endPoints:
  #### 2. Main Entry Point
  * **(GET)** `http://localhost:3000/`
  #### 1. Users
  * creating new user: **(POST)** `http://localhost:3000/users`
  * Authenticate (SignIn): **(POST)** `http://localhost:3000/users/authenticate`
  * List (index) all users: **(GET)** `http://localhost:3000/users`
    - *requires Authorization Token*
  * Show specific user: **(GET)** `http://localhost:3000/users/:id`
    - *requires Authorization Token*
  #### 2. Products
  * creating new product: **(POST)** `http://localhost:3000/products`
    - *requires Authorization Token*
  * List (index) all products: **(GET)** `http://localhost:3000/products`
  * Show specific product: **(GET)** `http://localhost:3000/products/:id`
  * List products which have a specified Category: **(GET)** `http://localhost:3000/products/category/:category_name`
  * Top 5 products: **(GET)** `http://localhost:3000/topFive/products`
  #### 3. Orders
  * creating new order: **(POST)** `http://localhost:3000/orders`
    - *requires Authorization Token*
  * List (index) all orders: **(GET)** `http://localhost:3000/orders`
  * Update order: **(PUT)** `http://localhost:3000/orders/:id`
    - *requires Authorization Token*
  * Add a product to an order: **(POST)** `http://localhost:3000/orders/:id/products`
    - *requires Authorization Token*
    - *runs Middleware which confirms that selected order is not "complete" (i.e: order.status=active)*
  * List all User's orders: **(GET)** `http://localhost:3000/users/:user_id/orders`
    - *requires Authorization Token*
  * Completed orders of a user: **(GET)** `http://localhost:3000/complete-orders/:user_id`
    - *requires Authorization Token*
