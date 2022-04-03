import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/index.route";

const app = express();

dotenv.config();

// all application's Routes
appRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.HOST}:${process.env.PORT}`);
});

export default app;