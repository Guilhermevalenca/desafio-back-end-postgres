export type InputProps = JSX.IntrinsicElements['input'] & {
    label?: string;
    type?: JSX.IntrinsicElements['input']['type'] | 'textarea';
    textareaAttr?: JSX.IntrinsicElements['textarea'];
};

export default function(props: InputProps) {

    return (
        <div className="tw-mb-4 tw-pr-4">
            {props.label && (
                <label
                    className={"tw-block tw-text-lg tw-font-medium tw-text-gray-700"}
                >
                    {props.label}
                </label>
            )}
            {props.type !== 'textarea' ? (
                <input
                    {...props}
                    className={"tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500 tw-focus:tw-outline-none " + props.className}
                />
            ) : (
                <textarea
                    {...props.textareaAttr}
                    className={"tw-w-full tw-p-3 tw-border tw-border-gray-300 tw-rounded-md tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500 tw-focus:tw-outline-none " + props.className}
                ></textarea>
            )}
        </div>
    )
}