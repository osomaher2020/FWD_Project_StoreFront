import CONN from "../DB_CONN";

export class Dashboard {

    // ------------------------------ Products --------------------------------

    // top 5 most popular products (have the largest sell count)
    async topFiveProducts(): Promise<{id:number, name: string, price: number, category: string}[]> {
        const conn = await CONN.connect();
        const sql = "SELECT "+
                        "products.id AS id, products.name AS name, products.price AS price, products.category AS category, "+
                        "SUM(order_products.quantity) AS quantity "+
                    "FROM products INNER JOIN order_products "+
                        "ON products.id = order_products.product_id "+
                    " GROUP BY id, name, price, category "+
                    "ORDER BY quantity DESC "+
                    "LIMIT 5";
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }


    // ------------------------------ Orders --------------------------------

    // // Current Order by user
    // end Point >> /users/:userID/orders/:orderID/products
    async currUserOrderProducts(userId: number, orderId: number): Promise<{id:number, name: string, quantity: number} | string> {
        try {
            const conn = await CONN.connect();
            const sql = "SELECT "+
                            "products.id AS id, products.name AS name, order_products.quantity AS quantity "+
                        "FROM products "+
                        "INNER JOIN order_products ON products.id = order_products.product_id "+
                        "INNER JOIN orders ON orders.id = order_products.order_id "+
                            "WHERE orders.user_id=($1) AND orders.id=($2)";
            const result = await conn.query(sql, [userId, orderId]);
            conn.release();

            return result.rows[0];
        }
        catch (error) {
            return "Error: "+error;
        }
    }

    // Completed Orders by user
    async userCompletedOrders(userId: number): Promise<{id:number, status: string, name: string, quantity: number}[] | string> {
        try {
            const conn = await CONN.connect();
            const sql = "SELECT "+
                            "orders.id AS id, orders.status AS status, products.name AS name, order_products.quantity AS quantity "+
                        "FROM orders "+
                        "INNER JOIN order_products ON orders.id = order_products.order_id "+
                        "INNER JOIN products ON products.id = order_products.product_id "+
                            "WHERE orders.user_id=($1) AND status='complete'";
            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows;
        }
        catch (error) {
            return "Error: "+error;
        }
    }
}