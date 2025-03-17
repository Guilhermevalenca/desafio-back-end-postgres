import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "@pages/HomePage.tsx";
import Default from "@layouts/Default.tsx";
import CreateTask from "@pages/tasks/create.tsx";
import TaskLayout from "@layouts/TaskLayout.tsx";
import EditTask from "@pages/tasks/Edit.tsx";
import IndexTags from '@pages/tags/index.tsx';
import CreateTag from '@pages/tags/Create.tsx';
import EditTag from '@pages/tags/Edit.tsx';

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default />} >
                    <Route index element={<HomePage />} />

                    <Route path="tasks" element={<TaskLayout />}>
                        <Route index element={<Navigate to="/" />} />
                        <Route path="create" element={<CreateTask />} />
                        <Route path="edit/:id" element={<EditTask />} />
                    </Route>

                    <Route path="tags">
                        <Route index element={<IndexTags />} />
                        <Route path="create" element={<CreateTag />} />
                        <Route path="edit/:id" element={<EditTag />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}