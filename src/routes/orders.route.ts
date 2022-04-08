import express from "express";
import { OrdersController } from "../handlers/orders.controller";
import { verifyAuthToken, verifyUserAuth } from "../middleware/verifyAuth";
import verifyOrderIsActive from "../middleware/verifyOrderIsActive";

const ordersController = new OrdersController();

const ordersRoutes = (app: express.Application) => {
    app.get("/orders", ordersController.index); // index
    app.post("/orders", verifyAuthToken, ordersController.create); // create new order
    app.put("/orders/:id", verifyAuthToken, ordersController.updateOrderStatus); // update Order Status
    app.post('/orders/:id/products', [verifyAuthToken, verifyOrderIsActive], ordersController.addProductToOrder); // ADD product to an order
    app.get('/users/:user_id/orders/:order_id/products', verifyUserAuth, ordersController.currUserOrderProducts); // LIST Current Order products made by a user
    app.get('/complete-orders/:user_id', verifyUserAuth, ordersController.userCompletedOrders); // completed orders[] of a user
}

export default ordersRoutes;