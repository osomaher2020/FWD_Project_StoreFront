import {Order, OrderObj, OrderProductObj} from "../../models/order.model";
import {User} from "../../models/user.model";
import {Product} from "../../models/product.model";


describe("Order Model", () => {

    const order = new Order();
    const user = new User();
    const product = new Product();

    let newUserId: number;
    let newProductId: number;
    let newOrderId: number;

    // setup -> user & product
    beforeAll(async function(){

        const newUser = await user.create({
            first_name: "osama",
            last_name: "maher",
            password: "123456"
        });

        newUserId = newUser.id as number;

        const newProd = await product.create({
            name: "magic wand",
            price: 22.5,
            category: "magical"
        });

        newProductId = newProd.id as number;
    });

    // create
    it("create new Order", async () => {
        const newOrder: OrderObj = await order.create({
            user_id: newUserId,
            status: "active"
        });

        newOrderId = newOrder.id as number;

        expect(newOrder).toEqual({
            id: newOrderId,
            user_id: newUserId,
            status: "active"
        });
    });

    // add a product to the current order
    it("add product to an Order", async () => {
        const newOrderProd: OrderProductObj = await order.addProductToOrder({
            order_id: newOrderId,
            product_id: newProductId,
            quantity: 20
        });

        expect(newOrderProd).toEqual({
            id: newOrderProd.id,
            order_id: newOrderId,
            product_id: newProductId,
            quantity: 20
        });
    });

    // tearDown
    afterAll(async () => {
        await product.deleteAll();
        await user.deleteAll();
        await order.deleteAll();
    });
});