import {useNavigate, useParams} from "react-router";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Form from "@components/Form.tsx";
import Input from "@components/Input.tsx";
import Button from "@components/Button.tsx";
import Swal from "sweetalert2";
import { TaskType } from "@classes/Task.ts";
import Task from "@classes/Task.ts";
import Tag from "@classes/Tag.ts";
import Select from "@components/Select.tsx";
import {OptionCheckbox} from "@components/Option.tsx";

export default function() {
    const params = useParams();
    const navigate = useNavigate();
    if(!params.id) {
        navigate('/');
    }

    const [taskForm, setTaskForm] = useState<TaskType>({
        title: '',
        description: '',
        priority: 10,
        tags: []
    });
    const task = new Task({
        id: Number(params.id),
        title: '',
        description: '',
        priority: 10,
        tags: []
    });

    useEffect(() => {
        Task.getById(Number(params.id))
            .then((res) => {
                setTaskForm({
                    title: res.title,
                    description: res.description,
                    priority: res.priority,
                    tags: res.tags
                });
            })
            .catch(() => {
                navigate('/');
            });
    }, []);


    const [allTags, setAllTags] = useState<Tag[]>([]);

    useEffect(() => {
        Tag.all()
            .then((res) => {
                setAllTags(res);
            })
    }, []);

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        const tags = allTags.filter((tag) => selectedValues.includes(Number(tag.id)));
        setTaskForm({
            ...taskForm,
            tags,
        });
    }

    function handleCheckboxChange(tag: Tag) {
        const exists = taskForm.tags?.some((t) => t.id === tag.id);

        if(exists) {
            setTaskForm({
                ...taskForm,
                tags: taskForm.tags!.filter((t) => t.id !== tag.id),
            });
        } else {
            setTaskForm({
                ...taskForm,
                tags: [...taskForm.tags!, tag],
            });
        }
    }

    function handlerInput(e: ChangeEvent<HTMLInputElement>) {
        setTaskForm({
            ...taskForm,
            [e.target.name]: e.target.value,
        })
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        Swal.fire({
            title: 'Editing tag',
            didOpen: () => {
                Swal.showLoading();
            },
            didClose: () => {
                Swal.hideLoading();
            }
        });

        try {
            task.title = taskForm.title;
            task.description = taskForm.description;
            task.status = taskForm.status;
            task.priority = Number(taskForm.priority);
            task.tags = taskForm.tags;

            await task.save();
            setTimeout(() => {
                Swal.close();
                Swal.fire({
                    title: 'Tag edited',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'Go to home page',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                })
                    .then((res) => {
                        if(res.isConfirmed) {
                            navigate('/');
                        }
                    });
            }, 300);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <section className="tw-w-1/2 tw-mx-auto tw-my-5">
                <Form
                    title="Edit tag"
                    onSubmit={submit}
                >
                    <Input
                        label="title"
                        name="title"
                        placeholder="Insert title"
                        value={taskForm.title}
                        onChange={handlerInput}
                    />

                    <Input
                        label="description"
                        type="textarea"
                        textareaAttr={{
                            placeholder: "Insert description",
                            value: taskForm.description,
                            onChange: (e) => setTaskForm({
                                ...taskForm,
                                description: e.target.value
                            }),
                        }}
                    />

                    <Input
                        label="priority"
                        name="priority"
                        type="number"
                        placeholder="Insert priority"
                        value={taskForm.priority}
                        onChange={handlerInput}
                        min={1}
                        max={10}
                    />

                    <Select
                        label="tags"
                        variant="checkbox"
                        onChange={handleSelectChange}
                        className="tw-grid tw-grid-cols-2 tw-gap-4"
                    >
                        {allTags.map((tag, index) => (
                            <OptionCheckbox
                                key={index}
                                checked={taskForm.tags?.some((t) => t.id === tag.id)}
                                onChange={() => handleCheckboxChange(tag)}
                                text={`${tag.name} (color: ${tag.color})`}
                            />
                        ))}
                    </Select>
                    <Button type="submit">Edit</Button>
                </Form>
            </section>
        </>
    )
}