import axios from '@axios';
import { type AxiosResponse } from "axios";

export type TagType = {
    id?: number;
    name: string;
    color: string;
}

export default class Tag implements TagType {
    id?: number;
    name: string;
    color: string;

    constructor(data: TagType) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
    }

    static async all(): Promise<Tag[]> {
        return axios.get('/tags')
            .then((res) => {
                if(Array.isArray(res.data) && res.data.length > 0) {
                    return res.data.map((tag: TagType) => new Tag(tag));
                }
                return [];
            });
    }

    async save(): Promise<AxiosResponse<TagType>> {
        if(this.id) {
            return axios.put(`/tags/${this.id}`, this as TagType);
        } else {
            return axios.post('/tags', this as TagType);
        }
    }

    async delete(): Promise<AxiosResponse> {
        return axios.delete(`/tags/${this.id}`);
    }
}