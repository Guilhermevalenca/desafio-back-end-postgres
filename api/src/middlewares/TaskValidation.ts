import { Request, Response, NextFunction } from "express";
import Middleware from "@middlewares/index";
import { z } from 'zod';
import Task from "@models/Task";
import Tag from "@models/Tag";

export default class TaskValidation extends Middleware {

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const taskSchema = z.object({
            title: z.string(),
            status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
            color: z.string(),
            priority: z.number().min(1).max(10),
            description: z.string().optional(),
            tags: z.array(z.object({
                id: z.number()
            })).refine(async () => {
                const ids = await Tag.findAll({
                    where: {
                        id: req.body.tags.map((tag: any) => tag.id)
                    },
                    attributes: ['id']
                });
                return ids.length === req.body.tags.length;
            }).optional(),
        });

        const result = await taskSchema.safeParseAsync(req.body);
        if (!result.success) {
            res.status(400)
                .json({
                    error: result.error,
                });
            return;
        }
        next();
    }

    async subHandle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const taskSchema = z.object({
            tags: z.array(z.object({
                id: z.number()
            })).refine(async () => {
                const ids = await Tag.findAll({
                    where: {
                        id: req.body.tags.map((tag: any) => tag.id)
                    },
                    attributes: ['id']
                });
                return ids.length === req.body.tags.length;
            })
        });

        const result = await taskSchema.safeParseAsync(req.body);
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