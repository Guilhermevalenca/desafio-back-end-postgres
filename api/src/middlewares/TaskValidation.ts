import { Request, Response, NextFunction } from "express";
import Middleware from "@middlewares/index";
import { z } from 'zod';

export default class TaskValidation extends Middleware {

    handle(req: Request, res: Response, next: NextFunction): Promise<void> | void {
        const taskSchema = z.object({
            title: z.string(),
            status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
            color: z.string(),
            priority: z.number().min(1).max(10),
            description: z.string(),
        });
        const result = taskSchema.safeParse(req.body);
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