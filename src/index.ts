import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// routes
import appRoutes from "./routes/index.route";
import usersRoutes from "./routes/users.route";
import productsRoutes from "./routes/products.route";
import ordersRoutes from "./routes/orders.route";

const app = express();

dotenv.config();

// middleware
app.use(bodyParser.json());

// all application's Routes
appRoutes(app);
usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.HOST}:${process.env.PORT}`);
});

export default app;