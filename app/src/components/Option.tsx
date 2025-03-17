export type OptionDefaultProps = JSX.IntrinsicElements['option'] & {
    children: React.ReactNode;
}

export type OptionCheckboxProps = JSX.IntrinsicElements['input'] & {
    text: string;
    labelAttr?: JSX.IntrinsicElements['label'];
}

export default function OptionDefault(props: OptionDefaultProps) {
    return (
        <option
            {...props}
            className={"tw-py-2 tw-px-3 tw-text-gray-700 tw-bg-white tw-hover:tw-bg-gray-200 " + props.className}
        >
            {props.children}
        </option>
    );
}

export function OptionCheckbox(props: OptionCheckboxProps) {
    const labelAttr = props.labelAttr || {};
    delete props.labelAttr;

    return (
        <label
            {...labelAttr}
            className={"tw-flex tw-items-center tw-gap-2 tw-mb-2 " + props.className}
        >
            <input
                {...props}
                type="checkbox"
                className={"tw-w-4 tw-h-4 tw-text-blue-500 tw-border-gray-300 tw-rounded tw-focus:tw-ring-blue-500 " + props.className}
            />
            <span className="tw-text-gray-700">{props.text}</span>
        </label>
    );
}