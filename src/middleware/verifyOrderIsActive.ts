import express from "express";
import CONN from '../DB_CONN';

const verifyOrderIsActive = async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    try {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM orders WHERE id=($1)";
        const result = await conn.query(sql, [req.params.id]);
        conn.release();

        const order = result.rows[0];

        if(order.status === "complete"){
            throw new Error(`order is ${order.status} - can't add new product`);
        }

        next();
    }
    catch (error) {
        return `${error}`;
    }
}

export default verifyOrderIsActive;