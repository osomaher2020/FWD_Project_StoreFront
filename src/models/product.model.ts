import CONN from "../DB_CONN";

export type ProductObj = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};

export class Product {
    // index
    async index(): Promise<ProductObj[]> {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM products";
        const result = await conn.query(sql);
        conn.release();

        return result.rows;
    }

    // show
    async show(id: number): Promise<ProductObj> {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM products WHERE id=($1)";
        const result = await conn.query(sql, [id]);
        conn.release();

        return result.rows[0];
    }

    // create
    async create(product: ProductObj): Promise<ProductObj> {
        const conn = await CONN.connect();
        const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
        const result = await conn.query(sql, [product.name, product.price, product.category]);
        conn.release();

        return result.rows[0];
    }

    // category's products
    async category_products(category: string): Promise<ProductObj[]> {
        const conn = await CONN.connect();
        const sql = "SELECT * FROM products WHERE category=($1)";
        const result = await conn.query(sql, [category]);
        conn.release();

        return result.rows;
    }
}