import {useState} from "react";

export type DefaultProps = {
    children: React.ReactNode;
    text: string;
}

export default function(props: DefaultProps) {
    const [show, setShow] = useState(false);

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {props.children}
            {show && (
                <div className="tw-absolute tw-bg-gray-700 tw-text-white tw-p-2 tw-rounded">
                    {props.text}
                </div>
            )}
        </div>
    );
}