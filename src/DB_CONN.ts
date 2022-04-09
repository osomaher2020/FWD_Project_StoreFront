import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    TEST_DB_NAME,
    DB_USER,
    DB_PASSWORD
} = process.env;

let CONN: Pool = new Pool();

if(ENV === "dev"){
    CONN = new Pool({
        host: DB_HOST,
        port: parseInt(DB_PORT as string),
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
}
else if(ENV === "test"){
    CONN = new Pool({
        host: DB_HOST,
        port: parseInt(DB_PORT as string),
        database: TEST_DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
}

export default CONN;