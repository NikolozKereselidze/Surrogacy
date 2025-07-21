import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const DonorLayout = () => {
    return (
        <>
        <Navigation />
        <Outlet />
        <Footer />
        </>
    )

}

export default DonorLayout;