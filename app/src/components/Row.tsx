export type PropsDefault = {
    children: React.ReactNode;
}

export type RowProps = PropsDefault & JSX.IntrinsicElements['tr'] & {
    type?: 'head' | 'body';
}

export default function(props: RowProps) {
    let className: string = "tw-border-t tw-hover:tw-bg-gray-100";

    if('type' in props) {
        if(props.type === 'head') {
            className = "tw-bg-gray-800 tw-text-white";
        } else if(props.type === 'body') {
            className = "tw-border-t tw-hover:tw-bg-gray-100"
        }
    }

    return (
        <tr
            {...props}
            className={className + " " + props.className}
        >
            {props.children}
        </tr>
    );
}

export const Th = (props: PropsDefault & JSX.IntrinsicElements['th']) => (
    <th
        {...props}
        className={"tw-px-6 tw-py-3 tw-text-left " + props.className}
    >
        {props.children}
    </th>
);

export const Td = (props: PropsDefault & JSX.IntrinsicElements['td']) => (
    <td
        {...props}
        className={"tw-px-6 tw-py-3 " + props.className}
    >
        {props.children}
    </td>
);
