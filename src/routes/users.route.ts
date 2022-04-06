import express from "express";
import { UsersController } from "../handlers/users.controller";
import { verifyAuthToken } from "../middleware/verifyAuth";

const usersController = new UsersController();

const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken, usersController.index); // index
    app.get("/users/:id", verifyAuthToken, usersController.show); // show
    app.post("/users", usersController.create); // create
    app.post("/users/authenticate", usersController.authenticate); // sign in
}

export default usersRoutes;