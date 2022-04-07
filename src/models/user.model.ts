import CONN from "../DB_CONN";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const {
    BCRYPT_SALT,
    SALT_ROUND
} = process.env;

export type UserObj = {
    id?: number,
    first_name: string,
    last_name: string,
    password?: string
}

export class User {
    // list
    async index(): Promise<UserObj[]> {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM users";
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }

    // show
    async show(id: number): Promise<UserObj> {
        const conn = await CONN.connect();
        const sql = "SELECT id, first_name, last_name FROM users WHERE id=($1)";
        const result = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    }

    // create (signUp)
    async create(user: UserObj): Promise<UserObj> {
        const conn = await CONN.connect();
        const sql = "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING id, first_name, last_name";

        // hashing user password
        const hashedPass = bcrypt.hashSync(user.password+(BCRYPT_SALT as string), parseInt(SALT_ROUND as string));

        const result = await conn.query(sql, [user.first_name, user.last_name, hashedPass]);
        conn.release();

        return result.rows[0];
    }

    // authenticate (signIn)
    async authenticate(first_name: string, password:string): Promise<UserObj | null> {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM users WHERE first_name=($1)";
        const result = await conn.query(sql, [first_name]);
        conn.release();

        if(result.rows.length){
            const db_user = result.rows[0];
            if(bcrypt.compareSync(password+BCRYPT_SALT, db_user.password)){
                return db_user;
            }
        }

        return null;
    }


    // for test tearDown
    async delete(id: number): Promise<boolean> {
        const conn = await CONN.connect();
        const sql = "DELETE FROM users WHERE id=($1)";
        await conn.query(sql, [id]);
        conn.release();


        return true;
    }
    async deleteAll(): Promise<boolean> {
        const conn = await CONN.connect();
        const sql = "DELETE FROM users";
        await conn.query(sql);
        conn.release();


        return true;
    }
}