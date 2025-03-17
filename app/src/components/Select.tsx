export type SelectProps = JSX.IntrinsicElements['select'] & {
    label?: string;
    children: React.ReactNode;
    labelAttr?: JSX.IntrinsicElements['label'];
    variant?: 'default' | 'checkbox';
}

export default function(props: SelectProps) {

    if(!props.variant || props.variant === 'default') {
        return (
            <div className="tw-mb-4">
                <label
                    {...props.labelAttr}
                    className={"tw-block tw-text-lg tw-font-medium tw-text-gray-700 " + props.labelAttr?.className}
                >
                    {props.label}
                </label>
                <select
                    {...props}
                    className={"tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-bg-white tw-shadow-sm tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none tw-h-32 tw-overflow-y-auto tw-scrollbar-thin tw-scrollbar-thumb-gray-400 tw-scrollbar-track-gray-100 " + props.className}
                >
                    {props.children}
                </select>
            </div>
        )
    } else if(props.variant === 'checkbox') {
        return (
            <div className="tw-mb-4">
                <label
                    {...props.labelAttr}
                    className={"tw-block tw-text-lg tw-font-medium tw-text-gray-700 " + props.labelAttr?.className}
                >
                    {props.label}
                </label>
                <div
                    className={"tw-border tw-border-gray-300 tw-rounded-md tw-p-3 tw-overflow-y-auto tw-h-32 " + props.className}
                >
                    {props.children}
                </div>
            </div>
        );
    }
}