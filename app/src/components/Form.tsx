export type FormProps = JSX.IntrinsicElements['form'] & {
    children: React.ReactNode;
    title?: string;
}

export default function(props: FormProps) {
    return (
        <form
            {...props}
            className={"tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-8 tw-mx-auto " + props.className}
        >
            {props.title && (
                <h2 className="tw-text-2xl tw-font-semibold tw-text-center tw-mb-3">
                    {props.title}
                </h2>
            )}
            {props.children}
        </form>
    );
}