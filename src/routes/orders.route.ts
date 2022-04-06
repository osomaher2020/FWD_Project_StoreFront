import express from "express";
import { OrdersController } from "../handlers/orders.controller";
import { verifyAuthToken, verifyUserAuth } from "../middleware/verifyAuth";

const ordersController = new OrdersController();

const ordersRoutes = (app: express.Application) => {
    app.post("/orders", verifyAuthToken, ordersController.create);
    app.post('/orders/:id/products', verifyAuthToken, ordersController.addProductToOrder); // CREATE product to an order
    app.get('/users/:user_id/orders/:order_id/products', verifyUserAuth, ordersController.currUserOrderProducts); // LIST Current Order products made by a user
    app.get('/complete-orders/:user_id', verifyUserAuth, ordersController.userCompletedOrders); // completed orders[] of a user
}

export default ordersRoutes;