import type { Request, Response, NextFunction } from "express";
import database from "@database";

export default abstract class Middleware {
    constructor() {}

    abstract handle(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export class FindMiddleware extends Middleware{
    constructor(
        private readonly modelName: string,
    ) {
        super()
    }

    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        if(!id) {
            res.status(404);
            return;
        }

        const obj = await database.model(String(this.modelName)).findByPk(Number(id));
        if (!obj) {
            res.status(404)
                .json({
                    error: `Not found`,
                });
            return;
        }
        req.body.modelObj = obj;
        next();
    }
}