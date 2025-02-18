import Table from '@components/Table.tsx';
import Row, { Td, Th } from "@components/Row.tsx";
import { useState, useEffect } from "react";
import Task, { type TaskType } from "../classes/Task.ts";
import Tooltip from "@components/tooltip.tsx";
import { useNavigate } from "react-router";
import Button from "@components/Button.tsx";

export default function() {
    const [tasks, setTasks] = useState<(Task | TaskType)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        Task.all()
            .then((res) => {
                setTasks(res);
            })
    }, []);

    return (
        <>
            <div className="tw-text-center tw-text-2xl">Todo List</div>
            <section className="tw-w-1/2 tw-mx-auto tw-my-5">
                <Button
                    onClick={() => navigate('/tasks/create')}
                >Create task</Button>

                <Table>
                    <thead>
                    <Row type="head">
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Status</Th>
                        <Th>Priority</Th>
                        <Th>Tags</Th>
                        <Th>Actions</Th>
                    </Row>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <Row key={task.id}>
                            <Td>{task.title}</Td>
                            <Td>{task.description}</Td>
                            <Td>{task.status}</Td>
                            <Td>{task.priority}</Td>
                            <Td>
                                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                                    {task.tags?.map((tag) => (
                                        <Tooltip
                                            key={tag.id}
                                            text={tag.name}
                                        >
                                            <span
                                                className={"tw-px-2 tw-py-1  tw-rounded-full tw-bg-" + `[${tag.color}]`}
                                            >{tag.name[0]}</span>
                                        </Tooltip>
                                    ))}
                                </div>
                            </Td>
                            <Td>
                                <span className="tw-grid tw-gap-2">
                                    <Button>Edit</Button>
                                    <Button variant="danger">Delete</Button>
                                </span>
                            </Td>
                        </Row>
                    ))}
                    </tbody>
                </Table>
            </section>
        </>
    )
}