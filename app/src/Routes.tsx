import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@pages/HomePage.tsx";
import Default from "@layouts/Default.tsx";
import Create from "@pages/tasks/create.tsx";
import TaskLayout from "@layouts/TaskLayout.tsx";

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default />} >
                    <Route index element={<HomePage />} />
                    <Route path="tasks" element={<TaskLayout />}>
                        <Route path="create" element={<Create />} />
                    </Route>

                    <Route path="*" element={<h1>Pagina não encontrada</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}