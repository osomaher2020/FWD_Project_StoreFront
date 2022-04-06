// ** verify order is active || !complete
import express from "express";
import { Order, OrderObj, OrderProductObj } from "../models/order.model";
import { Dashboard } from "../services/dashboard";

export class OrdersController {

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const order = new Order();

            const newOrder: OrderObj = {
                user_id: req.body.user_id,
                status: req.body.status
            }

            const result = await order.create(newOrder);

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // add product to an order
    async addProductToOrder(req: express.Request, res: express.Response): Promise<void> {
        try {
            const order = new Order();

            const newOrderProd: OrderProductObj = {
                order_id: parseInt(req.params.id),
                product_id: req.body.product_id,
                quantity: req.body.quantity
            }

            const result = await order.addProductToOrder(newOrderProd);

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // Current Order by user
    async currUserOrderProducts(req: express.Request, res: express.Response): Promise<void> {
        try {
            const dashboard = new Dashboard();

            const user_id = parseInt(req.params.user_id);
            const order_id = parseInt(req.params.order_id);

            const result = await dashboard.currUserOrderProducts(user_id, order_id);

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // completed Orders by user
    async userCompletedOrders(req: express.Request, res: express.Response): Promise<void> {
        try {
            const dashboard = new Dashboard();

            const user_id = parseInt(req.params.user_id);

            const result = await dashboard.userCompletedOrders(user_id);

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
}