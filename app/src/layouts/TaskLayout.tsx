import { Outlet } from "react-router";

export default function() {

    return (
        <>
            <div className="tw-text-center tw-text-2xl">Actions for tasks</div>
            <Outlet />
        </>
    )
}