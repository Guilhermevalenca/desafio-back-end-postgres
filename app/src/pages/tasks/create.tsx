import Form from "@components/Form.tsx";
import Input from "@components/Input.tsx";
import Task from "../../classes/Task.ts";
import Select from "@components/Select.tsx";
import {useEffect, useState} from "react";
import Tag, {TagType} from "../../classes/Tag.ts";
import {OptionCheckbox} from "@components/Option.tsx";
import Button from "@components/Button.tsx";

export default function() {
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
                // const newArray = [];
                // for(let i = 0; i < 10; i++) {
                //     newArray.push(...res);
                // }
                // setAllTags(newArray);
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

    return (
        <>
            <section className="tw-w-1/2 tw-mx-auto tw-my-5">
                <Form
                    title="Create task"
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