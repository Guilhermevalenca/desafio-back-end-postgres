export type RowProps = {
    children: React.ReactNode
}

export default function(props: RowProps) {
    return (
        <tr>
            {props.children}
        </tr>
    );
}