import { BrowserRouter, Routes, Route } from "react-router";
import App from "@pages/App.tsx";
import Default from "@layouts/Default.tsx";

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default />} >
                    <Route index element={<App />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}