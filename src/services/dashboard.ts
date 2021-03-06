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
                    "GROUP BY products.id, name, price, category "+
                    "ORDER BY quantity DESC "+
                    "LIMIT 5";
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }


    // ------------------------------ Orders --------------------------------

    // Current Order products by a user
    async currUserOrderProducts(userId: number, orderId: number): Promise<{name: string, price:number, quantity: number}[]> {
        const conn = await CONN.connect();
        const sql = "SELECT "+
                        "products.name AS name, products.price AS price, order_products.quantity AS quantity "+
                    "FROM products "+
                    "INNER JOIN order_products ON products.id = order_products.product_id "+
                    "INNER JOIN orders ON orders.id = order_products.order_id "+
                        "WHERE orders.user_id=($1) AND orders.id=($2)";
        const result = await conn.query(sql, [userId, orderId]);
        conn.release();

        return result.rows;
    }

    // Completed Orders by a user
    async userCompletedOrders(userId: number): Promise<{id:number, status: string, name: string, quantity: number}[] | string> {
        const conn = await CONN.connect();
        const sql = "SELECT "+
                        "orders.id AS id, orders.status AS status, products.name AS name, order_products.quantity AS quantity "+
                    "FROM orders "+
                    "INNER JOIN order_products ON orders.id = order_products.order_id "+
                    "INNER JOIN products ON products.id = order_products.product_id "+
                        "WHERE orders.user_id=($1) AND orders.status='complete'";
        const result = await conn.query(sql, [userId]);
        conn.release();

        return result.rows;
    }
}