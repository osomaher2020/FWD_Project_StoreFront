import express from "express";

const appRoutes = (app: express.Application) => {
    app.get("/", (_req: express.Request, res: express.Response) => {
        res.status(200).send("Success");
    });
}

export default appRoutes;