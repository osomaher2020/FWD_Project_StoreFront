import {Order, OrderObj, OrderProductObj} from "../../models/order.model";


describe("Order Model", () => {

    const order = new Order();

    // create
    it("create new Order", async () => {
        const result: (OrderObj | string) = await order.create({
            user_id: 1,
            status: "active"
        });

        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: "active"
        });
    });

    // add a product to the current order
    it("add product to an Order", async () => {
        const result: (OrderProductObj | string) = await order.addProductToOrder({
            order_id: 1,
            product_id: 1,
            quantity: 20
        });

        expect(result).toEqual({
            id: 1,
            order_id: '1',
            product_id: '1',
            quantity: 20
        });
    });

    // change order status = "complete" & try to add a product
    it("add product to completed order returns Error", async () => {

        await order.updateOrderStatus(1, "complete");

        const result: (OrderProductObj | string) = await order.addProductToOrder({
            order_id: 1,
            product_id: 1,
            quantity: 55
        });

        expect(result).toEqual("Error: order is complete - can't add new product");
    });
});