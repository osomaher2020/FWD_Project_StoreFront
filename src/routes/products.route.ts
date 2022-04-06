import express from "express";
import { ProductsController } from "../handlers/products.controller";
import { verifyAuthToken } from "../middleware/verifyAuth";

const productsController = new ProductsController();

const productsRoutes = (app: express.Application) => {
    app.get("/products", productsController.index);
    app.get("/products/:id", productsController.show);
    app.post("/products", verifyAuthToken, productsController.create);
    app.get("/products/category/:category_name", productsController.category_products);
    app.get("/topFive/products", productsController.topFiveProducts);
}

export default productsRoutes;