import Form from "@components/Form.tsx";
import Input from "@components/Input.tsx";
import Task from "../../classes/Task.ts";
import Select from "@components/Select.tsx";
import { type FormEvent, useEffect, useState } from "react";
import Tag, { type TagType } from "../../classes/Tag.ts";
import { OptionCheckbox } from "@components/Option.tsx";
import Button from "@components/Button.tsx";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

export default function() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(10);
    const [tags, setTags] = useState<(Tag | TagType)[]>([]);

    const task = new Task({
        title,
        description,
        priority,
        tags,
    });
    const [allTags, setAllTags] = useState<Tag[]>([]);

    useEffect(() => {
        Tag.all()
            .then((res) => {
                setAllTags(res);
            })
    }, []);

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        setTags(allTags.filter((tag) => selectedValues.includes(Number(tag.id))));
    }

    function handleCheckboxChange(tag: Tag) {
        const exists = task.tags?.some((t) => t.id === tag.id);

        if(exists) {
            setTags(task.tags!.filter((t) => t.id !== tag.id));
        } else {
            setTags([...task.tags!, tag]);
        }
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        Swal.fire({
            title: 'Creating task',
            didOpen: () => {
                Swal.showLoading();
            },
            didClose: () => {
                Swal.hideLoading();
            }
        });

        try {
            await task.save();
            setTimeout(() => {
                Swal.close();
                navigate('/');
            }, 300);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <section className="tw-w-1/2 tw-mx-auto tw-my-5">
                <Form
                    title="Create task"
                    onSubmit={submit}
                >
                    <Input
                        label="title"
                        name="title"
                        placeholder="Insert title"
                        value={task.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        label="description"
                        type="textarea"
                        textareaAttr={{
                            placeholder: "Insert description",
                            value: task.description,
                            onChange: (e) => setDescription(e.target.value),
                        }}
                    />

                    <Input
                        label="priority"
                        name="priority"
                        type="number"
                        placeholder="Insert priority"
                        value={task.priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
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
                                checked={task.tags?.some((t) => t.id === tag.id)}
                                onChange={() => handleCheckboxChange(tag)}
                                text={`${tag.name} (color: ${tag.color})`}
                            />
                        ))}
                    </Select>

                    <Button
                        type="submit"
                    >
                        Enviar
                    </Button>
                </Form>
            </section>
        </>
    )
}