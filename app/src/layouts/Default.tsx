import { Outlet } from "react-router";
import Header from "@layouts/Header.tsx";
import Footer from "@layouts/Footer.tsx";

export default function() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}