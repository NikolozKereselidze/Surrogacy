"use client";

import Navigation from "./Navigation/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactUs from "@/components/Contact/ContactUs";
import BlogCard from "@/components/Blog/BlogCard";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <main>{children}</main>
      <ContactUs />
      <BlogCard />
      <Footer />
    </div>
  );
};

export default MainLayout;
