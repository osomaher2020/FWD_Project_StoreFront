import supertest from "supertest";
import app from "../../index";
import { Product, ProductObj } from "../../models/product.model";
import { User, UserObj } from "../../models/user.model";

describe("Products API endPoints", () => {

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

    let userToken: any;

    beforeAll(async function (){
        const newProduct: ProductObj = await product.create(productObj);
        productObj.id = newProduct.id;

        await user.create(userObj);
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

    // index
    it("/products gets list of ProductObj[]", async () => {
        const result = await supertest(app)
            .get("/products")
            .set("content-type", "application/json");

        expect(result.status).toBe(200);

        const {name, price, category} = result.body[0];
        expect(name).toBe(productObj.name);
        expect(price).toBe(productObj.price);
        expect(category).toBe(productObj.category);
    });

    // show
    it("Show specific product:id", async () => {
        const result = await supertest(app)
            .get(`/products/${productObj.id}`)
            .set("content-type", "application/json");

        expect(result.status).toBe(200);

        const {name, price, category} = result.body;
        expect(name).toBe(productObj.name);
        expect(price).toBe(productObj.price);
        expect(category).toBe(productObj.category);
    });

    // create
    it("Create new product", async () => {

        const prodObj2: ProductObj = {
            name: "banana",
            price: 12,
            category: "fruits"
        };

        const result = await supertest(app)
            .post("/products")
            .set("content-type", "application/json")
            .set('Authorization', 'Bearer '+userToken)
            .send(prodObj2);

        expect(result.status).toBe(200);

        const {name, price, category} = result.body;
        expect(name).toBe(prodObj2.name);
        expect(price).toBe(prodObj2.price);
        expect(category).toBe(prodObj2.category);
    });

    // list products in a category
    it("products in a category", async () => {
        const result = await supertest(app)
            .get(`/products/category/${productObj.category}`)
            .set("content-type", "application/json");

        expect(result.status).toBe(200);
        expect(result.body.length).toEqual(2);
    });

    afterAll( async () => {
        await product.deleteAll();
    });
});