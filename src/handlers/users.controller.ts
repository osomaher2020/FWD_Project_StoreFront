import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserObj } from "../models/user.model";

dotenv.config();

export class UsersController {

    // list users (requires token)
    async index(_req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = new User();

            const result: UserObj[] = await user.index();

            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // show specific user (requires token)
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = new User();

            const user_id = parseInt(req.params.id);
            const result: UserObj = await user.show(user_id);

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

    // create user
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = new User();

            const newUser: UserObj = await user.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            });

            if(newUser){
                const jwt_token = jwt.sign({user: newUser}, process.env.JWT_SECRET as string);

                res.status(200).json(jwt_token);
            }
            else{
                res.status(400).json("can not create new user");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    // signIn user
    async authenticate(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = new User();

            const first_name = req.body.first_name;
            const password = req.body.password;

            const userAuth: (UserObj | null) = await user.authenticate(first_name, password);

            if(userAuth){
                const jwt_token = jwt.sign({user: userAuth}, process.env.JWT_SECRET as string);

                res.status(200).json(jwt_token);
            }
            else{
                res.status(400).json("can not create new user");
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
}