import supertest from "supertest";
import app from "../../index";
import { Order, OrderObj, OrderProductObj } from "../../models/order.model";
import { Product, ProductObj } from "../../models/product.model";
import { User, UserObj } from "../../models/user.model";

describe("Orders API endPoints", () => {

    const order = new Order();

    const product = new Product();

    const productObj: ProductObj = {
        name: "apple",
        price: 25,
        category: "fruits"
    };

    const user = new User();

    const userObj: UserObj = {
        first_name: "osama",
        last_name: "maher",
        password: "123"
    };

    let orderObj: OrderObj;

    let userToken: any;

    beforeAll(async function (){
        const newProduct: ProductObj = await product.create(productObj);
        productObj.id = newProduct.id;

        const newUser: UserObj = await user.create(userObj);
        userObj.id = newUser.id;

        orderObj = {
            user_id: userObj.id as number,
            status: "active"
        };
        const newOrder = await order.create(orderObj);
        orderObj.id = newOrder.id;
    });

    // authorize a user
    it("Authorize User", async () => {
        const auth_response = await supertest(app)
            .post("/users/authenticate")
            .set("content-type", "application/json")
            .send({
                first_name: userObj.first_name,
                password: userObj.password
            })
            .expect(200);

        // set authorization token
        const {token} = auth_response.body;
        userToken = token;
    });

    // create
    it("Create new order", async () => {

        const orderObj2: OrderObj = {
            user_id: userObj.id as number,
            status: "active"
        };

        const result = await supertest(app)
            .post("/orders")
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken)
            .send(orderObj2);

        expect(result.status).toBe(200);

        const {id, user_id, status} = result.body;
        expect(user_id).toBe(orderObj2.user_id);
        expect(status).toBe(orderObj2.status);
    });

    // index
    it("/orders gets list of OrderObj[]", async () => {
        const result = await supertest(app)
            .get("/orders")
            .set("content-type", "application/json");

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(2);
        expect(result.body).toContain({
            id: orderObj.id,
            user_id: userObj.id as number,
            status: "active"
        });
    });

    // ADD product to an order (table: order_products)
    it("a product added to a specific order", async () => {
        const result = await supertest(app)
            .post(`/orders/${orderObj.id}/products`)
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken)
            .send({
                product_id: productObj.id,
                quantity: 22
            });

        expect(result.status).toBe(200);

        const {order_id, product_id, quantity} = result.body;

        expect(order_id).toBe(orderObj.id);
        expect(product_id).toBe(productObj.id);
        expect(quantity).toBe(22);
    });

    // Current Order by user
    it("Current Order products by user", async () => {
        const result = await supertest(app)
            .get(`/users/${userObj.id}/orders/${orderObj.id}/products`)
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken);

        expect(result.status).toBe(200);

        const {name, price, quantity} = result.body[0];
        expect(name).toBe(productObj.name);
        expect(price).toBe(productObj.price);
        expect(quantity).toBe(22);
    });

    // update order:2 status = complete
    it("updates order status", async () => {
        const result = await supertest(app)
                        .put(`/orders/${orderObj.id}`)
                        .set("content-type", "application/json")
                        .set("Authorization", "Bearer "+userToken)
                        .send({
                            status: "complete"
                        });

        expect(result.status).toBe(200);
    });

    // Completed Orders by user
    it("Completed Orders by user", async () => {
        const result = await supertest(app)
            .get(`/complete-orders/${userObj.id}`)
            .set("content-type", "application/json")
            .set("Authorization", "Bearer "+userToken);

        expect(result.status).toBe(200);

        const {id, status, name, quantity} = result.body[0];
        expect(id).toBe(orderObj.id);
        expect(status).toBe("complete");
        expect(name).toBe(productObj.name);
        expect(quantity).toBe(22);
    });


    afterAll( async () => {
        await user.deleteAll();
        await product.deleteAll();
        await order.deleteAll();
    });
});