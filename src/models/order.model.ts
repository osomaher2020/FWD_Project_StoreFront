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
    // async create(order: OrderObj): Promise<OrderObj | string> {

    //     const conn = await CONN.connect();

    //     try {
    //         await conn.query("BEGIN");
    //         const order_sql = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING id";
    //         const order_result = await conn.query(order_sql, [order.user_id, order.status]);
    //         const newOrder = order_result.rows[0];
    //         const orderProd_sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";
    //         await conn.query(orderProd_sql, [newOrder.id, order.product_id, order.quantity]);
    //         const orderObj_sql = ("SELECT "+
    //                                     "orders.id, orders.user_id, orders.status, "+
    //                                     "order_products.product_id, order_products.quantity "+
    //                                 "FROM orders INNER JOIN order_products "+
    //                                     "ON orders.id = order_products.order_id "+
    //                                 "WHERE orders.id = ($1)"
    //                             );
    //         const orderObj = await conn.query(orderObj_sql, [newOrder.id]);
    //         await conn.query("COMMIT");
    //         conn.release();

    //         return (orderObj.rows[0] as unknown) as OrderObj;
    //     } catch (error) {
    //         conn.query("ROLLBACK");
    //         return "Error: "+error;
    //     }
    // }

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
    // endPoint > app.post('/orders/:id/products', addProduct)
    async addProductToOrder(orderProduct: OrderProductObj): Promise<OrderProductObj | string> {
        try {
            const conn = await CONN.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const result = await conn.query(sql, [orderProduct.order_id]);
            conn.release();

            const order = result.rows[0];

            if(order.status == "complete"){
                throw new Error(`order is ${order.status} - can't add new product`);
            }
        }
        catch (error) {
            return `${error}`;
        }

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

    // // Current Order by user
    // end Point >> /users/:userID/orders/:orderID/products
    // async currUserOrder(userId: number): Promise<OrderObj> {

    // }

    // // Completed Orders by user
    // async userCompletedOrders(userId: number): Promise<OrderObj[]> {

    // }
}