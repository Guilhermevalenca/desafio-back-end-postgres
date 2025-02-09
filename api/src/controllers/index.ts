import type { Request, Response} from "express";

export default abstract class Controller {
    abstract index(req: Request, res: Response): Promise<void>;

    abstract store(req: Request, res: Response): Promise<void>;

    abstract show(req: Request, res: Response): Promise<void>;

    abstract update(req: Request, res: Response): Promise<void>;

    abstract destroy(req: Request, res: Response): Promise<void>;
}