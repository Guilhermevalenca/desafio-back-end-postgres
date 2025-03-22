import {useNavigate, useParams} from "react-router";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Tag, {TagType} from "../../classes/Tag.ts";
import Form from "@components/Form.tsx";
import Input from "@components/Input.tsx";
import Button from "@components/Button.tsx";
import Swal from "sweetalert2";

export default function() {
    const params = useParams();
    const navigate = useNavigate();
    if(!params.id) {
        navigate('/');
    }

    const [tagForm, setTagForm] = useState<TagType>({
        color: '',
        name: '',
    });
    const tag = new Tag({
        id: Number(params.id),
        name: '',
        color: ''
    });

    useEffect(() => {
        Tag.getById(Number(params.id))
            .then((res) => {
                setTagForm({
                    name: res.name,
                    color: res.color
                });
            })
            .catch(() => {
                navigate('/');
            });
    }, []);

    function handlerInput(e: ChangeEvent<HTMLInputElement>) {
        console.log({
            name: e.target.name,
            value: e.target.value
        })
        setTagForm({
            ...tagForm,
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
            tag.name = tagForm.name;
            tag.color = tagForm.color;
            await tag.save();
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
                        label="name"
                        name="name"
                        placeholder="Insert name"
                        value={tagForm.name}
                        onChange={handlerInput}
                    />
                    <Input
                        label="color"
                        name="color"
                        placeholder="Insert color"
                        value={tagForm.color}
                        onChange={handlerInput}
                    />
                    <Button type="submit">Edit</Button>
                </Form>
            </section>
        </>
    )
}