import Middleware from "@middlewares/index";
import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';

export default class TagValidation extends Middleware {
    handle(req: Request, res: Response, next: NextFunction): Promise<void> | void {
        const tagSchema = z.object({
            name: z.string(),
            color: z.string(),
        });
        const result = tagSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400)
                .json({
                    error: result.error,
                });
            return;
        }
        next();
    }
}