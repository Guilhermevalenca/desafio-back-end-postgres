import Form from "@components/Form.tsx";
import { FormEvent, useState } from "react";
import Tag from "../../classes/Tag.ts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Button from "@components/Button.tsx";
import Input from "@components/Input.tsx";

export default function() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const tag = new Tag({
        name,
        color,
    });
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        Swal.fire({
            title: 'Creating tag',
            didOpen: () => {
                Swal.showLoading();
            },
            didClose: () => {
                Swal.hideLoading();
            }
        });

        try {
            await tag.save();
            setTimeout(() => {
                Swal.close();
                Swal.fire({
                    title: 'Tag created',
                    icon: 'success',
                    confirmButtonText: 'Go to home page',
                    cancelButtonText: 'Create another tag',
                    showCancelButton: true,
                    showConfirmButton: true,
                }).then((res) => {
                    if(res.isConfirmed) {
                        navigate('/');
                    } else if(res.isDismissed) {
                        navigate('/tags/create');
                    }
                });
            }, 300);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <section className="tw-w-1/2 tw-mx-auto tw-my-5">
            <Form
                title="Create tag"
                onSubmit={submit}
            >
                <Input
                    label="name"
                    name="name"
                    placeholder="Insert name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="color"
                    name="color"
                    placeholder="Insert color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <Button type="submit">Create</Button>
            </Form>
        </section>
    )
}