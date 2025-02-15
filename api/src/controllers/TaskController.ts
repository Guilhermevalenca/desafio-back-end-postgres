import Controller from "@controllers/index";
import type {Request, Response} from "express";
import Task from "@models/Task";
import Tag from "@models/Tag";

export default class TaskController extends Controller {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const response = await Task.findAll({
                include: Tag
            });
            res.status(200)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };

    async store(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const response = await Task.create(req.body);
            //@ts-ignore
            await response.setTags(req.body.tags);

            res.status(201)
                .json(response);
        } catch (e) {
            console.log(e);
            res.status(500)
                .json(e);
        }
    };

    async show(req: Request, res: Response): Promise<void> {
        res.status(200)
            .json({
                ...req.body.modelObj.dataValues,
                tags: await req.body.modelObj.getTags()
            });
    };

    async update(req: Request, res: Response): Promise<void> {
        try {
            const response = await req.body.modelObj.update(req.body, {
                include: [Tag]
            });
            res.status(200)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };

    async destroy(req: Request, res: Response): Promise<void> {
        try {
            const response = await req.body.modelObj.destroy();
            res.status(200)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };
}