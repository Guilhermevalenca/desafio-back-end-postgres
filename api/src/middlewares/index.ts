import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';

export default abstract class Middleware {
    abstract handle(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export abstract class Validate extends Middleware {
    protected zod = z;
}