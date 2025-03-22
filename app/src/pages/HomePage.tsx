import Table from '@components/Table.tsx';
import Row, { Td, Th } from "@components/Row.tsx";
import { useState, useEffect } from "react";
import Task from "../classes/Task.ts";
import Tooltip from "@components/tooltip.tsx";
import { useNavigate } from "react-router";
import Button from "@components/Button.tsx";
import Swal from "sweetalert2";

export default function() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Loading tasks',
            didOpen: () => {
                Swal.showLoading();
            },
            didClose: () => {
                Swal.hideLoading();
            }
        });
        Task.all()
            .then((res) => {
                setTasks(res);
                setTimeout(() => {
                    Swal.close();
                }, 300);
            })
    }, []);

    async function deleteTask(task: Task) {
        Swal.fire({
            title: 'Deleting task',
            didOpen: () => {
                Swal.showLoading();
            },
            didClose: () => {
                Swal.hideLoading();
            }
        })

        try {
            await task.delete();
            setTasks(tasks.filter((t) => t.id !== task.id));
            setTimeout(() => {
                Swal.close();
            }, 300);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="tw-text-center tw-text-2xl">Todo List</div>
            <section className="tw-w-1/2 tw-mx-auto tw-my-5">
                <div className="tw-flex tw-gap-4">
                    <Button
                        onClick={() => navigate('/tasks/create')}
                    >Create task</Button>

                    <Button
                        onClick={() => navigate('/tags/create')}
                        variant="secondary"
                    >Create tag</Button>
                </div>

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
                                                className={"tw-px-2 tw-py-1  tw-rounded-full tw-border-4 tw-text-white"}
                                                style={{
                                                    backgroundColor: tag.color
                                                }}
                                                onClick={() => navigate('/tags/edit/' + tag.id)}
                                            >{tag.name[0]}</span>
                                        </Tooltip>
                                    ))}
                                </div>
                            </Td>
                            <Td>
                                <span className="tw-grid tw-gap-2">
                                    <Button onClick={() => navigate('/tasks/edit/' + task.id)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteTask(task)}>Delete</Button>
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