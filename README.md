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
  ## .env
    ```
    ENV="dev"

    HOST="http://localhost"
    PORT="3000"

    DB_HOST="localhost"
    DB_PORT="5432"
    DB_NAME="product_store"
    TEST_DB_NAME="product_store_test"
    DB_USER="osama_maher"
    DB_PASSWORD="123"

    BCRYPT_SALT="osomaher"
    SALT_ROUND="10"

    JWT_SECRET="osomaher1@gmail.com"
    ```
