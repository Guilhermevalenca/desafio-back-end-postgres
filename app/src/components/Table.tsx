export type TableProps = {
    children: React.ReactNode
}

export default function(props: TableProps) {
    return (
        <table
            border={1}
            className="tw-min-w-full tw-table-auto tw-bg-white tw-border-collapse tw-shadow-lg tw-rounded-lg tw-overflow-hidden"
        >
            {props.children}
        </table>
    );
}