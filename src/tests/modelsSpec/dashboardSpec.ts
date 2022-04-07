import { Order, OrderObj } from "../../models/order.model";
import { Product, ProductObj } from "../../models/product.model";
import { User, UserObj } from "../../models/user.model";
import { Dashboard } from "../../services/dashboard";

describe("Dashboard functions", () => {

    const dashboard = new Dashboard();

    const user = new User();
    const product = new Product();
    const order = new Order();

    const userObj: UserObj = {
        first_name: "osama",
        last_name: "maher",
        password: "1234"
    };

    let orderObj: OrderObj;

    beforeAll(async function() {

        const newUser = await user.create(userObj);
        userObj.id = newUser.id;

        orderObj = {
            user_id: newUser.id as number,
            status: "active"
        };
        const newOrder = await order.create(orderObj);
        orderObj.id = newOrder.id;

        for(let i=1; i<=10; i++){

            const newProd = await product.create({
                name: "magic wand"+i,
                price: 22.5+i,
                category: "magical"
            });

            await order.addProductToOrder({
                order_id: newOrder.id as number,
                product_id: newProd.id as number,
                quantity: 20+i
            });
        }
    });

    it("top Five Products count is 5", async() => {
        const result = await dashboard.topFiveProducts();

        expect(result.length).toEqual(5);
    });

    it("Current Order products by a user", async() => {
        const result = await dashboard.currUserOrderProducts(userObj.id as number, orderObj.id as number);

        expect(result).toContain({
            name: "magic wand1",
            price: 23.5,
            quantity: 21
        });
    });

    // tearDown
    afterAll(async () => {
        await product.deleteAll();
        await user.deleteAll();
        await order.deleteAll();
    });
});