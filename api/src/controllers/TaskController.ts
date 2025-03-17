import Controller from "@controllers/index";
import type {Request, Response} from "express";
import Task from "@models/Task";
import Tag from "@models/Tag";
import TaskTags from "@models/TaskTags";
import database from '@database';

export default class TaskController extends Controller {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const response = await Task.findAll({
                include: {
                    model: Tag,
                    through: {
                        attributes: []
                    }
                },
            });
            res.status(200)
                .json(response);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    };

    async store(req: Request, res: Response): Promise<void> {
        const transaction = await database.transaction();
        try {
            const response = await Task.create(req.body);
            if(req.body.tags && req.body.tags.length > 0 && 'id' in response) {
                await TaskTags.bulkCreate(
                    req.body.tags.map((tag: any) => ({
                            task_id: response.id,
                            tag_id: tag.id
                        })
                    ));
            }
            await transaction.commit();
            res.status(201)
                .json(response);
        } catch (e) {
            await transaction.rollback();
            res.status(500)
                .json(e);
        }
    };

    async show(req: Request, res: Response): Promise<void> {
        res.status(200)
            .json({
                ...req.body.modelObj.dataValues,
                tags: await Tag.findAll({
                    include: {
                        model: Task,
                        through: {
                            attributes: []
                        },
                        where: {
                            id: req.body.modelObj.id
                        },
                        attributes: [],
                    }
                })
            });
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

    async updateTags(req: Request, res: Response): Promise<void> {
        const transaction = await database.transaction();
        try {
            await TaskTags.destroy({
                where: {
                    task_id: req.body.modelObj.id
                }
            });
            await TaskTags.bulkCreate(
                req.body.tags.map((tag: any) => ({
                        task_id: req.body.modelObj.id,
                        tag_id: tag.id
                    })
                ));
            await transaction.commit();
            res.status(204)
                .end();
        } catch (e) {
            await transaction.rollback();
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