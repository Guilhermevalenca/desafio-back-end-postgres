export type TableProps = {
    children: React.ReactNode
}

export default function(props: TableProps) {
    return (
        <table>
            {props.children}
        </table>
    );
}