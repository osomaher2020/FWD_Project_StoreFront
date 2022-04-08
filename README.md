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
  5. Install "db-migrate & db-migrate-pg" globally using command:
      - `npm i -g db-migrate`
      - `npm i -g db-migrate-pg`
