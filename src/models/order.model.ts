import CONN from "../DB_CONN";

export type OrderObj = {
    id?: number;
    user_id: number | string;
    status: string;
};

export type OrderProductObj = {
    id?: number;
    order_id: number | string;
    product_id: number | string;
    quantity: number;
};

export class Order {

    // create new order (cart)
    async create(order: OrderObj): Promise<OrderObj | string> {
        try {
            const conn = await CONN.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
            const result = await conn.query(sql, [order.user_id, order.status]);
            conn.release();

            return result.rows[0];
        }
        catch (error) {
            return "Error: "+error;
        }
    }

    // update order's status
    async updateOrderStatus(order_id: number, status: string): Promise<OrderObj | string> {
        try {
            const conn = await CONN.connect();
            const sql = "UPDATE orders SET status=($1) WHERE id=($2) RETURNING *";
            const result = await conn.query(sql, [status, order_id]);
            conn.release();

            return result.rows[0];
        }
        catch (error) {
            return "Error: "+error;
        }
    }

    // add new product to an order
    async addProductToOrder(orderProduct: OrderProductObj): Promise<OrderProductObj | string> {
        try {
            const conn = await CONN.connect();
            const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [orderProduct.order_id, orderProduct.product_id, orderProduct.quantity]);
            conn.release();

            return result.rows[0];
        }
        catch (error) {
            return "Error: "+error;
        }
    }
}