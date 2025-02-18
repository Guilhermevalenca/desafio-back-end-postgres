import axios from "@axios";
import { type AxiosResponse } from "axios";
import Tag, { type TagType } from "./Tag.ts";

export type TaskType = {
    id?: number;
    title: string;
    description: string;
    status?: TaskStatus;
    priority: number;
    tags?: (Tag | TagType)[];
}

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export default class Task implements TaskType {
    id?: number;
    title: string;
    description: string;
    status?: TaskStatus;
    priority: number = 10;
    tags?: (Tag | TagType)[] = [];

    constructor(data: TaskType) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.priority = data.priority;
        this.tags = data.tags;
    }

    static async all(): Promise<Task[]> {
        return axios.get('/tasks')
            .then((res) => {
                if(Array.isArray(res.data) && res.data.length > 0) {
                    return res.data.map((task: TaskType) => new Task(task));
                }
                return [];
            });
    }

    async save(): Promise<AxiosResponse<TaskType>> {
        if(this.id) {
            return axios.put(`/tasks/${this.id}`, this as TaskType);
        } else {
            return axios.post('/tasks', this as TaskType);
        }
    }

    async delete(): Promise<AxiosResponse> {
        return axios.delete(`/tasks/${this.id}`);
    }
}