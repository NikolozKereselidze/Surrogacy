import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <>
    <Navigation />
    <Outlet />
    <ContactUs />
    <Footer />
  </>
);

export default MainLayout;
