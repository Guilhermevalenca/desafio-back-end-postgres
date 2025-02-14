import Controller from "@controllers/index";
import type {Request, Response} from "express";
import Task from "@models/Task";

export default class TaskController extends Controller {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const response = await Task.findAll();
            res.status(200)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };

    async store(req: Request, res: Response): Promise<void> {
        try {
            const response = await Task.create(req.body);
            res.status(201)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };

    async show(req: Request, res: Response): Promise<void> {
        res.status(200)
            .json(req.body.modelObj);
    };

    async update(req: Request, res: Response): Promise<void> {
        try {
            const response = await req.body.modelObj.update(req.body);
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