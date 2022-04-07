import express from "express";
import { Product, ProductObj } from "../models/product.model";
import { Dashboard } from "../services/dashboard";

export class ProductsController {
    // list all products
    async index(_req: express.Request, res: express.Response): Promise<void> {
        try {
            const product = new Product();
            const result: ProductObj[] = await product.index();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // show specific product
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const product = new Product();

            const product_id = parseInt(req.params.id);
            const result: ProductObj = await product.show(product_id);

            if(result){
                res.status(200).json(result);
            }
            else{
                res.status(401).json("not found");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // create new product (requires token)
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const product = new Product();

            const newProduct: ProductObj = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category
            }
            const result: ProductObj = await product.create(newProduct);

            if(result){
                res.status(200).json(result);
            }
            else{
                res.status(404).json("not found");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // list products in a specific category
    async category_products(req: express.Request, res: express.Response): Promise<void> {
        try {
            const product = new Product();

            const category = req.params.category_name;
            const result: ProductObj[] = await product.category_products(category);

            if(result){
                res.status(200).json(result);
            }
            else{
                res.status(404).json("category not found");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // most popular 5 products
    async topFiveProducts(_req: express.Request, res: express.Response): Promise<void> {
        try {
            const dashboard = new Dashboard();
            const topFive = await dashboard.topFiveProducts();

            if(topFive.length > 0){
                res.status(200).json(topFive);
            }
            else{
                res.status(404).json("no sales performed yet !");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
}