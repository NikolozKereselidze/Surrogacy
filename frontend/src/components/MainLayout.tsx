import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import { Outlet } from "react-router-dom";
import BlogCard from "./BlogCard";

const MainLayout = () => (
  <>
    <Navigation />
    <Outlet />
    <ContactUs />
    <BlogCard />
    <Footer />
  </>
);

export default MainLayout;
