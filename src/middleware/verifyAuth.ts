import express from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

export const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorization_header = req.headers.authorization as string;
        const token = authorization_header?.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET as string);

        next();
    }
    catch (error) {
        res.status(401).send(`can not authorize token ${error}`);
    }
}

export const verifyUserAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorization_header = req.headers.authorization as string;
        const token = authorization_header?.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // verifying that a user can only show his own orders
        if((decoded as JwtPayload)["user"]["id"] != req.params.user_id) {
            throw new Error('User id does not match!')
        }

        next();
    }
    catch (error) {
        res.status(401).send(`can not authorize token ${error}`);
    }
}