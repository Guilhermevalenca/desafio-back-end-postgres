export type ButtonProps = JSX.IntrinsicElements['button'] & {
    children: React.ReactNode;
    variant?: 'default' | 'danger' | 'secondary';
}

export default function(props: ButtonProps) {
    let color: string = '';
    if(!props.variant || props.variant === 'default') {
        color = 'tw-bg-blue-500';
    } else if(props.variant === 'danger') {
        color = 'tw-bg-red-500';
    } else if(props.variant === 'secondary') {
        color = 'tw-bg-green-500';
    }
    return (
        <button
            {...props}
            className={`tw-w-full tw-py-2 ${color} tw-text-white tw-font-semibold tw-rounded-md tw-hover:bg-blue-600 tw-transition-colors ` + props.className}
        >
            {props.children}
        </button>
    )
}