import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import { Outlet } from "react-router-dom";
import BlogCard from "./BlogCard";
import ScrollToTop from "./ScrollToTop";

const MainLayout = () => (
  <>
    <Navigation />
    <ScrollToTop />
    <Outlet />
    <ContactUs />
    <BlogCard />
    <Footer />
  </>
);

export default MainLayout;
