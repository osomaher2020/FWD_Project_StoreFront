import express from "express";
import CONN from '../DB_CONN';

const verifyOrderIsActive = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM orders WHERE id=($1)";
        const result = await conn.query(sql, [req.params.id]);
        conn.release();

        const order = result.rows[0];

        if(order){
            if(order.status == "complete"){
                throw new Error(`order is ${order.status} - can't add new product`);
            }
        }
        else{
            throw new Error(`can't find order with id: ${req.params.id}`);
        }

        next();
    }
    catch (error) {
        res.status(400).send(`${error}`);
    }
}

export default verifyOrderIsActive;